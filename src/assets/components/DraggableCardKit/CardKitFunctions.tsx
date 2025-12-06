import type { UniqueIdentifier } from "@dnd-kit/core";
import { useState, type CSSProperties, type JSX } from "react";


export interface CardData{
  id:UniqueIdentifier;
  zone:UniqueIdentifier;
  origin?:{x:number,y:number};
  // styling. Card back for when its closed, content when its flipped over
  cardBack?:any;            
  content?: JSX.Element | string;
}

export interface ZoneData {
  id:UniqueIdentifier,
  cards:UniqueIdentifier[],
  position:coord,                            // position of the zone in the dnd context
  dimensions: CSSProperties,  // dimensions in width and height
  currentOrigins?:coord[], // not really used...
  changeOrigins?: Function,
}
export interface InitCards {
  [id:UniqueIdentifier] : {id:UniqueIdentifier | string, content?:JSX.Element | string}
}

export interface InitZones {
  [id:UniqueIdentifier] : {id:UniqueIdentifier | string, position:coord, dimensions:CSSProperties}
}


export interface CardMap {
  [id:UniqueIdentifier] : CardData;
}
export interface ZoneMap {
  [id:UniqueIdentifier] : ZoneData;
}
export interface coord {
  x:number,
  y:number
}

export function makeCoords(x:number, y:number): coord {return {x:x, y:y}}

export function useCardHandler(initialCardsConfig: InitCards , initialZonesConfig: InitZones, startingZone: UniqueIdentifier):[
  CardMap,
  ZoneMap,
  (cardID: UniqueIdentifier, newZoneID: UniqueIdentifier) => void,
  (cardID: UniqueIdentifier, point:coord, zoneID:UniqueIdentifier) => void
]{

  const [cardsData, setCardsData] = useState<CardMap>({})
  const [zoneData, setZoneData] = useState<ZoneMap>({});

  const moveCard = (cardID:UniqueIdentifier, newZoneID:UniqueIdentifier) => {
    // remove card from current zone. Add card to new zone
    setZoneData(
      (prevState) => {
        const currZoneID = cardsData[cardID].zone as UniqueIdentifier // defaults to startingZone if not provided in init
        const newState:ZoneMap = {...prevState} // make a copy
        const newCurZoneDat = {...newState[currZoneID]}  // copy
        newCurZoneDat.cards = [...newCurZoneDat.cards.filter(id => id !== cardID)];
        newState[currZoneID] = newCurZoneDat;

        const newNextZoneDat = {...newState[newZoneID]}  // copy next zone
        newNextZoneDat.cards = [...newNextZoneDat.cards, cardID] // add card to next zone
        newState[newZoneID] = newNextZoneDat // update next zone in new state
        return newState
      }
    )
    // Update the card state
    setCardsData(prevCards => {
      const newCards = {...prevCards};
      const updatedCard = {
        ...newCards[cardID],
        zone: newZoneID,
      };
      newCards[cardID] = updatedCard;
      return newCards;
    });
  };

  // given a list of n cardIDs, n Origins, matches cards and origins 1 to 1 and updates card origins
    const changeOrigins = (zoneID:UniqueIdentifier, cardIDs: UniqueIdentifier[], newOrigins: coord[]) => {
      setZoneData((prevZoneData)=>{
        const newZoneData ={...prevZoneData}
        newZoneData[zoneID].currentOrigins = [...newOrigins]  // copy in the new origins in a new array
        return newZoneData
      })
      const zippedPairs = cardIDs.map((id, idx) => [id, newOrigins[idx]] as const);
      setCardsData((prevCards) => {
          const newCards = { ...prevCards };
          zippedPairs.forEach(([cardID, newOrigin]) => {
              const currentCard = newCards[cardID];
              if (currentCard) {
              newCards[cardID] = {
                  ...currentCard,
                  origin: newOrigin,
              };
              }
          });
          return newCards;
          });
          console.log("origins updated!");
    };
    /** 
     * Given card ID, the current mouse coordinate point..., and the associated Zone,
     * 1. Calculate the nearest origin point & card to the mouse pointer (based) out of all the cards in the zone
     * 2. check if the requesting card origin is the same as the calculated origin
     * 3. swap them
     */
    const nearestCard = (point:coord, cards:UniqueIdentifier[] ): UniqueIdentifier | undefined => {
      let minDist: number = Infinity
      let nearest:UniqueIdentifier | undefined = undefined
      cards.forEach((cardID)=>{
        // distance from point to origin
        const cardOrigin = cardsData[cardID].origin
        if (!cardOrigin) {
          
        } else{
          const distance = Math.sqrt(((cardOrigin.x - point.x)**2 +(cardOrigin.y - point.y) **2))
          if (minDist == Infinity || distance < minDist ){
            minDist = distance
            nearest = cardID
          }
        }
      })
      console.log(nearest, ' is nearest @ ', minDist, 'from ', point.x, ", " , point.y);
      return nearest
    }

    const trySwapOrigins = (cardID: UniqueIdentifier, point:coord, zoneID:UniqueIdentifier) => {
      const zone = zoneData[zoneID]
      const nearest = nearestCard(point,zone.cards)
      if (nearest == undefined) {
        console.log("CLOSEST ERROR!!!");
        return;
      }
      // do nothing if the closest origin is it's current origin
      if (cardID == nearest) {return}
      const c1Origin = cardsData[cardID].origin
      const c2Origin = cardsData[nearest].origin
      setCardsData((prevCardsData) => {
        const newCardsData = {...prevCardsData}
        newCardsData[cardID].origin = {...c2Origin}
        newCardsData[nearest].origin = {...c1Origin}
        return newCardsData
      })
    }

    const initialZones: ZoneMap = Object.values(initialZonesConfig).reduce((acc, zoneConfig):ZoneMap => {
    acc[zoneConfig.id] = {
        id:zoneConfig.id,
        cards:[],
        position:zoneConfig.position,
        dimensions:zoneConfig.dimensions,
        // changeOrigins: changeOrigins,
    }
    return acc
  },{})

  const initialCards: CardMap = Object.values(initialCardsConfig).reduce((acc,cardConfig):CardMap => {
    acc[cardConfig.id] = {
        id:cardConfig.id,
        zone:startingZone,
        // origin:,
        // styling. Card back for when its closed, content when its flipped over
        // cardBack?:any;            
        content:cardConfig.content
    }
    return acc
  }, {})

    for (const zoneID in initialZones){ initialZones[zoneID].changeOrigins = changeOrigins;}
    return [cardsData, zoneData, moveCard, trySwapOrigins]
}

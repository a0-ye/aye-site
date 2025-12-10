import type { UniqueIdentifier } from "@dnd-kit/core";
import { useEffect, useState, type ReactNode } from "react";


export interface CardData{
  id:UniqueIdentifier;
  zone:UniqueIdentifier;
  origin:{x:number,y:number};
  content?:ReactNode;
}

export interface ZoneData {
  id:UniqueIdentifier,
  cards:UniqueIdentifier[],
  position:coord,                            // position of the zone in the dnd context
  dimensions:{width:number, height:number},  // dimensions in width and height 
  changeOrigins: Function,
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

export function useCardHandler(initialCardData: CardMap, initialZones: ZoneMap, startingZone: UniqueIdentifier):[
  CardMap,
  ZoneMap,
  (cardID: UniqueIdentifier, newZoneID: UniqueIdentifier) => void,
  (cardID: UniqueIdentifier, point:coord, zoneID:UniqueIdentifier) =>  void
]{
  
  const [cardsData, setCardsData] = useState(initialCardData)
  const [zoneData, setZoneData] = useState(initialZones);



  const moveCard = (cardID:UniqueIdentifier, newZoneID:UniqueIdentifier) => {
    // remove card from current zone. Add card to new zone
    setZoneData(
      prevZoneData => {
        const currZoneID = cardsData[cardID].zone
        const newZoneData = {...prevZoneData} // make a copy
        const newCurZoneDat = {...newZoneData[currZoneID]}  // copy
        newCurZoneDat.cards = [...newCurZoneDat.cards.filter(id => id !== cardID)];
        newZoneData[currZoneID] = newCurZoneDat;

        const newNextZoneDat = {...newZoneData[newZoneID]}  // copy next zone
        newNextZoneDat.cards = [...newNextZoneDat.cards, cardID] // add card to next zone
        newZoneData[newZoneID] = newNextZoneDat // update next zone in new state
        return newZoneData
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

// given a list of n cardIDs n Origins, matches cards and origins 1 to 1 and updates card origins
  const changeOrigins = (cardIDs: UniqueIdentifier[], newOrigins: coord[]) => {
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
    // console.log(`swap[${cardID}]: nearest origin belongs to ${nearest}, compared from point (${point.x},${point.y})`);
    const c1Origin = cardsData[cardID].origin
    const c2Origin = cardsData[nearest].origin
    setCardsData((prevCardsData) => {
      const newCardsData = {...prevCardsData}
      newCardsData[cardID].origin = {...c2Origin}
      newCardsData[nearest].origin = {...c1Origin}
      return newCardsData
    })
  }


  useEffect(()=>{
    // One Time Setup:
    // load the changeOrigins function
    // move cards to startingZone
    for (const zoneID in zoneData){ zoneData[zoneID].changeOrigins = changeOrigins;}
    for (const cardID in {...cardsData}){
      moveCard(cardID, startingZone)
    }

  }, [])

  return [cardsData, zoneData, moveCard, trySwapOrigins]
}

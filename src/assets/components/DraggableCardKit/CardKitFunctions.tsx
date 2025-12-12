import type { UniqueIdentifier } from "@dnd-kit/core";
import { useEffect, useState, type ReactNode } from "react";


export interface CardData{
  id:UniqueIdentifier;
  zone:UniqueIdentifier;
  origin:{x:number,y:number};
  content?:ReactNode;
}

export interface InitCardData{
  id:UniqueIdentifier;
  zone?:UniqueIdentifier;
  origin?:{x:number,y:number};
  content?:ReactNode;
}

export interface ZoneData {
  id:UniqueIdentifier,
  cards:UniqueIdentifier[],
  position:coord,                            // position of the zone in the dnd context
  dimensions:{width:number, height:number},  // dimensions in width and height 
  changeOrigins: Function,
}

export interface InitZoneData {
  id:UniqueIdentifier,
  cards?:UniqueIdentifier[],
  position:coord,                            // position of the zone in the dnd context
  dimensions:{width:number, height:number},  // dimensions in width and height 
  changeOrigins?: Function,
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

export const BLANK_CARD_DATA: CardData = {
  id: "" as UniqueIdentifier,
  zone: "BLANK" as UniqueIdentifier,
  origin: {x:0,y:0}
}

const BLANK_ZONE_DATA: ZoneData = {
  id: "" as UniqueIdentifier,
  cards: [],
  position: {x:0,y:0},
  dimensions:{width:0,height:0},
  changeOrigins:()=>{console.error("changeOrigins not set!!");
  }
}

export function makeCoords(x:number, y:number): coord {return {x:x, y:y}}

export function useCardHandler(initialCardData: InitCardData[], initialZones: InitZoneData[], startingZone: UniqueIdentifier):[
  CardMap,
  ZoneMap,
  (cardID: UniqueIdentifier, newZoneID: UniqueIdentifier) => void,
  (cardID: UniqueIdentifier, point:coord, zoneID:UniqueIdentifier) =>  void
]{
  const loadedCardData: CardMap = initialCardData.reduce((acc: CardMap, currCard)=>{
    const outputCardData = {...BLANK_CARD_DATA, ...currCard}
    if (!currCard.zone){
      outputCardData.zone = startingZone;
    }
    if (!currCard.origin){
      outputCardData.origin = makeCoords(0,0);
    }
    acc[currCard.id] = outputCardData
    return acc
  }, {} )

  const loadedZoneData: ZoneMap = initialZones.reduce((acc: ZoneMap, currZone)=>{
    const outputZoneData = {...BLANK_ZONE_DATA, ...currZone}
    acc[outputZoneData.id] = outputZoneData
    return acc
  }, {})
  const [cardsData, setCardsData] = useState<CardMap>(loadedCardData)
  const [zoneData, setZoneData] = useState<ZoneMap>(loadedZoneData);



  const moveCard = (cardID:UniqueIdentifier, newZoneID:UniqueIdentifier) => {
    // remove card from current zone. Add card to new zone
    setZoneData(
      prevZoneData => {
        if (prevZoneData[newZoneID].cards.includes(cardID)) {
            console.log(cardID, " already exists in ", newZoneID, "; cancel moveCard");
            return prevZoneData; // return the old state
        }

        const currZoneID = cardsData[cardID].zone
        return {
          ...prevZoneData,  // make a copy
          [currZoneID]: { // override the currentZone
            ...prevZoneData[currZoneID],
            cards: prevZoneData[currZoneID].cards.filter(id=> id !== cardID)
          },

          [newZoneID]:{ // override the newZone
            ...prevZoneData[newZoneID],
            cards: [...prevZoneData[newZoneID].cards, cardID]
          }
        }
      }
    );

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
    for (const zoneID in zoneData){ zoneData[zoneID].changeOrigins = changeOrigins;}
    for (const cardID in {...cardsData}){
      moveCard(cardID, cardsData[cardID].zone)
    }

  }, [])

  return [cardsData, zoneData, moveCard, trySwapOrigins]
}

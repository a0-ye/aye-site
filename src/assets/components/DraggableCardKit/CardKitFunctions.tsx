import type { UniqueIdentifier } from "@dnd-kit/core";
import { useState } from "react";


export interface CardData{
  id:UniqueIdentifier;
  zone:UniqueIdentifier;
  origin:{x:number,y:number};
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
  (cardIDs: UniqueIdentifier[], newOrigins:coord[]) => void
]{
  
  const [cardsState, setCardsState] = useState(initialCardData)
  const [zoneData, setZoneData] = useState(initialZones);

  //all cards go in startingZone. Perhaps this should NOT be a thing... maybe if the zone isn't set we auto set to starting zone
  for (const cardID in initialCardData){
    initialZones[startingZone].cards.push(cardID)
    initialCardData[cardID].zone = startingZone
  }


  const moveCard = (cardID:UniqueIdentifier, newZoneID:UniqueIdentifier) => {
    // remove card from current zone. Add card to new zone
    setZoneData(
      prevState => {
        const currZoneID = cardsState[cardID].zone
        const newState = {...prevState} // make a copy
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
    setCardsState(prevCards => {
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
    setCardsState((prevCards) => {
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

    for (const zoneID in initialZones){ initialZones[zoneID].changeOrigins = changeOrigins;}
    return [cardsState, zoneData, moveCard, changeOrigins]
}

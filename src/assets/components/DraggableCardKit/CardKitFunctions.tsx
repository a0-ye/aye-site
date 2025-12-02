import type { UniqueIdentifier } from "@dnd-kit/core";
import { useState } from "react";


export interface CardData{
  id:UniqueIdentifier;
  zone:UniqueIdentifier;
  origin:{x:number,y:number}
}

interface CardMap {
  [id:UniqueIdentifier] : CardData;
}

export interface ZoneData {
  id:UniqueIdentifier,
  cards:UniqueIdentifier[],
  position:coord, // position of the zone within the zone
  changeOrigins: Function,
}

export interface coord {
  x:number,
  y:number
}

export function makeCoords(x:number, y:number): coord {return {x:x, y:y}}

export function useCardHandler(initialCardData: CardMap):[
  CardMap,
  (cardID: UniqueIdentifier, newZoneID: UniqueIdentifier) => void,
  (cardIDs: UniqueIdentifier[], newOrigins:coord[]) => void
]{
  const [cards, setCards] = useState(initialCardData)
  const moveCard = (cardID:UniqueIdentifier, newZoneID:UniqueIdentifier) => {
    setCards(prevCards => {
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
    setCards((prevCards) => {
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
    console.log("origins updated!!)");
    return [cards, moveCard, changeOrigins]
}

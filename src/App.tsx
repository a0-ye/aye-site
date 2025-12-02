import { useState, useId, type ReactNode, type CSSProperties} from 'react'
import './App.css'

import AboutMeContent from './assets/CardContent/AboutMe'
import { AboutMeThumbnail } from './assets/CardContent/AboutMe'

import MotionCard from './assets/components/dndMotionCards/MotionCard'
import CardZone from './assets/components/dndMotionCards/CardZone'

import { DndContext, type DragEndEvent, type UniqueIdentifier } from '@dnd-kit/core'

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

function useCardHandler(initialCardData: CardMap):[
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



function App() {
  const c1ID = useId();
  const c2ID = useId();
  const initialCards: Record<UniqueIdentifier, CardData> = {
    [c1ID]:{id:c1ID, zone:0,origin:makeCoords(0,0)},
    [c2ID]:{id:c2ID,zone:0,origin:makeCoords(0,0)},
  }
  // TODO: maybe we don't dynamically generate zones... theres only going to be like 3
  const handZoneID = useId() // store this one specially, since all cards start in the hand
  const zone2ID = useId(); // TODO: remove. is for testing
  const initialZones:Record<UniqueIdentifier, ZoneData> = {
    [handZoneID]:{id:handZoneID, cards:[],position:makeCoords(0,0), changeOrigins:() => {}},
    [zone2ID]:{id:zone2ID, cards:[],position:makeCoords(600,0), changeOrigins:() => {}},
  }

  //all cards go in handZone
  for (const cardID in initialCards){
    initialZones[handZoneID].cards.push(cardID)
    initialCards[cardID].zone = handZoneID
  }

  const [cardsData, moveCard, changeOrigins] = useCardHandler(initialCards);
  for (const zoneID in initialZones){ initialZones[zoneID].changeOrigins = changeOrigins;}
  const [zoneData, setZoneData] = useState(initialZones);

  const [activeCard, setActiveCard] = useState(-1);

  const handleDragEnd = (event:DragEndEvent) => {
    // over contains the ID of the droppable zone
    // console.log("handlingDragEnd...", event);
    if(!event.over) return
    const {active, over} = event;
    const cardID = active.id
    const nextZoneID = over.id
    if (cardsData[cardID].zone === nextZoneID) return;
    
    setZoneData(
      // remove card from current zone. Add card to new zone
      prevState => {
        // console.trace();
        const currZoneID = cardsData[cardID].zone
        const newState = {...prevState} // make a copy
        const newCurZoneDat = {...newState[currZoneID]}  // copy
        newCurZoneDat.cards = [...newCurZoneDat.cards.filter(id => id !== cardID)];
        newState[currZoneID] = newCurZoneDat;

        const newNextZoneDat = {...newState[nextZoneID]}  // copy next zone
        newNextZoneDat.cards = [...newNextZoneDat.cards, cardID] // add card to next zone
        newState[nextZoneID] = newNextZoneDat // update next zone in new state
        // console.log("Updating Zone States: prev, new", prevState, newState);
        return newState
      }
    )
    moveCard(cardID, nextZoneID)
    console.log("updating card zone for", cardsData[cardID]);
    
    return 
  }

  const cardEntries = Object.entries(cardsData)
  function generateCards(): ReactNode {
    return cardEntries.map(([id, cardData]) => {
      return (
        <MotionCard key={id} cardData={cardData}>
        </MotionCard>)
    })
  }

  return (
    <>
      <div className='nav'></div>
      <div className='framerRow' style={
        { position:'relative', 
          // left:0, top:0, 
          width:900, height:600, display:'flex', backgroundColor:"#f82f2fff"}}>
          <DndContext onDragEnd={handleDragEnd}>
          {generateCards()}
          <CardZone zoneData={zoneData[handZoneID]}>
          </CardZone>

          <CardZone zoneData={zoneData[zone2ID]}>
          </CardZone>

        </DndContext>
      </div>
    </>
  )
}

export default App

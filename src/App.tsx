import { useState, useId, type ReactNode} from 'react'
import './App.css'

import PageCard from './assets/components/PageCard/PageCard'
import SpringPageCard from './assets/components/SpringPageCard/SpringPageCard'
import AboutMeContent from './assets/CardContent/AboutMe'
import { AboutMeThumbnail } from './assets/CardContent/AboutMe'

import Draggable from './assets/components/dnd-kit-wrappers/draggable'
import Droppable from './assets/components/dnd-kit-wrappers/droppable'

import MotionCard from './assets/components/framerCard/MotionCard'
import CardZone from './assets/components/framerCard/CardZone'

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
  return [cards, moveCard, changeOrigins]

}



function App() {
  const c1ID = useId();
  const c2ID = useId();
  const initialCards: Record<UniqueIdentifier, CardData> = {
    [c1ID]:{id:c1ID, zone:0,origin:makeCoords(0,0)},
    [c2ID]:{id:c2ID,zone:0,origin:makeCoords(0,0)},
  }
  const handZoneID = useId() // store this one specially, since all cards start in the hand
  const zone2ID = useId(); // TODO: remove. is for testing
  const initialZones:Record<UniqueIdentifier, ZoneData> = {
    [handZoneID]:{id:handZoneID, cards:[], changeOrigins:() => {}},
    [zone2ID]:{id:zone2ID, cards:[], changeOrigins:() => {}},
  }

  //all cards go in handZone
  for (const cardID in initialCards){
    initialZones[handZoneID].cards.push(cardID)
    initialCards[cardID].zone = handZoneID
  }

  const [cardsData, moveCard, changeOrigins] = useCardHandler(initialCards);
  for (const zoneID in initialZones){ // give the changeOrigins function to each zone
    initialZones[zoneID].changeOrigins = changeOrigins;
  }
  const [zoneData, setZoneData] = useState(initialZones);
  
  
  const [activeCard, setActiveCard] = useState(-1);

  const handleDragEnd = (event:DragEndEvent) => {
    // over contains the ID of the droppable zone
    console.log("handlingDragEnd...", event);
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

    console.log("updating card zone:", cardsData[cardID]);
    
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
          
      <div className='framerRow' style={{display:'flex'}}>
        <DndContext onDragEnd={handleDragEnd}>
          <Droppable drop_id={handZoneID}>
            <CardZone zoneData={zoneData[handZoneID]}>
              {generateCards()}

            </CardZone>
          </Droppable>

          <Droppable drop_id={zone2ID}>
            <CardZone zoneData={zoneData[zone2ID]}>
            </CardZone>
          </Droppable>
        </DndContext>
      </div>

      <div className='SpringRow'> 
        <SpringPageCard 
          id={0} 
          activeCard={activeCard}
          content={AboutMeContent}
          thumbnail={0}
          onClick={() => setActiveCard(0)}
          />
        <SpringPageCard 
          id={1} 
          activeCard={activeCard}
          content={<img src='src/assets/img/cow.png'/>}
          thumbnail={1}
          onClick={() => setActiveCard(1)}
          />
      </div>
    </>
  )
}

export default App

import { useState, useId} from 'react'
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

interface CardData{
  zone:UniqueIdentifier;
  origin:{x:number,y:number}
}

interface CardMap {
  [id:UniqueIdentifier] : CardData;
}

function makeCoords(x:number, y:number) { return {x:x, y:y}}

function useCardHandler(initialCardData: CardMap):[
  CardMap,
  (cardID: UniqueIdentifier, newZoneID: UniqueIdentifier) => void,
  (cardIDs: UniqueIdentifier[], newOrigins: { x: number; y: number }[]) => void
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
const changeOrigin = (cardIDs: UniqueIdentifier[], newOrigins: { x: number; y: number }[]) => {
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
  return [cards, moveCard, changeOrigin]

}



function App() {

  const initialCards: Record<UniqueIdentifier, CardData> = {
    [useId()]:{zone:0,origin:{x:0,y:0}},
    [useId()]:{zone:0,origin:{x:0,y:0}},
  }

  // const [cards, moveCard] = useCardHandler(initialCards);
  const [originList, setOriginList] = useState([{x:0,y:0},{x:0,y:0}])
  const [cardsData, moveCard, changeOrigin] = useCardHandler(initialCards)
  const [activeCard, setActiveCard] = useState(-1)

  const handleDragEnd = (event:DragEndEvent) => {
    // over contains the ID of the droppable zone
    if(!event.over) return
    const cardID = event.active.id
    const newZoneID = event.over.id
    moveCard(cardID, newZoneID)
    changeOrigin([cardID], [makeCoords(600,0)])
    console.log("updating card zone:", cardsData[cardID]);
    
    return 
  }

  const cardEntries = Object.entries(cardsData)

  return (
    <>
      <div className='nav'></div>
          
      <div className='framerRow' style={{display:'flex'}}>
        <button onClick={     () => {setOriginList([{x:500,y:70}, {x:0,y:0}])}     }></button>
        <DndContext onDragEnd={handleDragEnd}>
          <Droppable drop_id={0}>
            <CardZone>

              {cardEntries.map(([id, cardData]) => (
                <MotionCard key={id} cardData={[id, cardData]}>
                  <Draggable drag_id={id} />
                </MotionCard>))}

            </CardZone>
          </Droppable>

          <Droppable drop_id={1}>
            <CardZone>
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

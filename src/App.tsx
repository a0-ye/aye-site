import { useState } from 'react'
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
  id:UniqueIdentifier;
  zone:UniqueIdentifier;
  origin:{x:number,y:number}
}

function useCardHandler(initialCardData: CardData[]):[CardData[], (cardID: UniqueIdentifier, newZoneID: UniqueIdentifier) => void]{
  const [cards, setCards] = useState(initialCardData)
  const moveCard = (cardID:UniqueIdentifier, newZoneID:UniqueIdentifier) => {
    setCards(prevCards => prevCards.map(card => card.id === cardID ? { ...card, zone: newZoneID } : card));
  };
  return [cards, moveCard]

}



function App() {
  const initialCards:CardData[] = []
  // const [cards, moveCard] = useCardHandler(initialCards);
  const [cardOrigin, setCardOrigin] = useState({x:0,y:0})
  const [originList, setOriginList] = useState([{x:0,y:0},{x:0,y:0}]) // TODO: figure out a way to add and remove cards ??

  const [cardsData, moveCard] = useCardHandler([
    {id:25,zone:0,origin:{x:0,y:0}},
    {id:67,zone:0,origin:{x:0,y:0}},
  ])

  const [count, setCount] = useState(0)
  const [activeCard, setActiveCard] = useState(-1)

  const handleDragEnd = (event:DragEndEvent) => {
    // over contains the ID of the droppable zone
    if(!event.over) return
    // console.log(event.over);
    const cardID = event.active.id
    const newZoneID = event.over.id
    console.log("updating card zone:",event,cardID, newZoneID);
    moveCard(cardID, newZoneID)
    
    return 
  }


  return (
    <>
      <div className='nav'>
        {/* {closeCard} */}
        {/* <button>projects</button>
        <button>aboutme</button>
        <button>contact</button> */}
      </div>
          
      <div className='framerRow' style={{display:'flex'}}>
        <button onClick={     () => {setOriginList([{x:500,y:70}, {x:0,y:0}])}     }></button>
        <DndContext onDragEnd={handleDragEnd}>
          <Droppable drop_id={0}>
            <CardZone>
                  <MotionCard origin={cardsData[0].origin}>
                    <Draggable drag_id={cardsData[0].id}></Draggable>
                  </MotionCard>
              {/* <Draggable drag_id={0}>
                {mc1}
              </Draggable> */}
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

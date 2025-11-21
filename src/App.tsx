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

import { DndContext, type DragEndEvent } from '@dnd-kit/core'

function handleDragEnd(event:DragEndEvent){
  // over contains the ID of the droppable zone
  if(!event.over) return
  // console.log(event.over);
  
  return 
}

function App() {
  const [count, setCount] = useState(0)
  const [activeCard, setActiveCard] = useState(-1)
  const mc1 = <MotionCard style={{backgroundColor:'#3877ff'}}></MotionCard>


  return (
    <>
      <div className='nav'>
        {/* {closeCard} */}
        {/* <button>projects</button>
        <button>aboutme</button>
        <button>contact</button> */}
      </div>
          
      <div className='framerRow' style={{display:'flex'}}>
        <DndContext onDragEnd={handleDragEnd}>
          <Droppable drop_id={0}>
            <CardZone>
              <MotionCard>
                <Draggable drag_id={0}></Draggable>
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

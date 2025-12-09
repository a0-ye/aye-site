import { useState, useId, type ReactNode, type CSSProperties, useEffect, useRef, act} from 'react'
import './App.css'

import AboutMeContent from './assets/CardContent/AboutMe'
import { AboutMeThumbnail } from './assets/CardContent/AboutMe'

import MotionCard from './assets/components/DraggableCardKit/MotionCard'
import CardZone from './assets/components/DraggableCardKit/CardZone'

import { DndContext, type DragEndEvent, type UniqueIdentifier } from '@dnd-kit/core'
import { makeCoords, useCardHandler, type CardData, type CardMap, type ZoneData, type ZoneMap } from './assets/components/DraggableCardKit/CardKitFunctions'
import { motion, rgba, useMotionValue, useSpring } from 'motion/react'

import LeftPanel from './assets/components/left-panel/LeftPanel'
import { animate } from 'motion'


function App() {

  // ======= INIT ==========================================
  const [activeCard, setActiveCard] = useState<UniqueIdentifier | null>(null) // needs to be here to give props to cards

  const c1ID = useId();
  const c2ID = useId();
  const c3ID = useId();
  const handZoneID = useId() // store this one specially, since all cards start in the hand
  const jokerZoneID = useId(); // Where jokers live.. No functionality, just naming like balaro :drooling:
  const consumableZoneID = useId(); // Where consumables live.. No functionality, just naming like balaro :drooling:
  const UseZoneID = useId();


  const initialCards: CardMap = {
    [c1ID]: {id:c1ID,  zone:handZoneID ,origin:makeCoords(0,0), conetent:AboutMeContent},
    [c2ID]: {id:c2ID,  zone:handZoneID ,origin:makeCoords(0,0), },
    [c3ID]: {id:c3ID,  zone:handZoneID ,origin:makeCoords(0,0), },
  }

  const colorMap: Record<UniqueIdentifier,string> = {
    [c1ID]: '#a0ffef',
    [c2ID]: '#a00043',
    [c3ID]: '#ffd13a',
  }
  const DEFAULT_COLOR = '#33473a';

  useEffect(()=>{
    if (activeCard){
      animate("div",{'--boss-blind-color':colorMap[activeCard]});
      
    } else {
      animate("div",{'--boss-blind-color':DEFAULT_COLOR});
    }
  },[activeCard])


  const initialZones:ZoneMap = {
    [handZoneID]: { id:handZoneID, cards:[], position:makeCoords(50,450),   
                    dimensions:{width:750,height:150},  changeOrigins:() => {}},

    [jokerZoneID]:    { id:jokerZoneID,    cards:[], position:makeCoords(50,15), 
                    dimensions:{width:500,height:150}, changeOrigins:() => {}},

    [consumableZoneID]:{ id:consumableZoneID,cards:[], position:makeCoords(600,15), 
                    dimensions:{width:250,height:150}, changeOrigins:() => {}},

    [UseZoneID]:{ id:UseZoneID,cards:[], position:makeCoords(900/2 - 75,600/2 -75), 
                    dimensions:{width:150,height:150}, changeOrigins:() => {}},
  }

  // create State & Managers + load zones
  const [cardsData, zoneData, moveCard, trySwapOrigins] = useCardHandler(initialCards, initialZones, handZoneID);
  
  // ======== END INIT ==========================================================


  // Effect to return a card to the original zone
  const draggedCardPrevZoneID = useRef<UniqueIdentifier | null>(null)
  useEffect(()=>{
    if (activeCard == null && draggedCardPrevZoneID.current){
      // call the card zone update function using draggedCardPrevZoneID to reverse it
      moveCard(zoneData[UseZoneID].cards[0], draggedCardPrevZoneID.current)
    }

  },[activeCard])

  const handleDragEnd = (event:DragEndEvent) => {
    // over contains the ID of the droppable zone
    if(!event.over) return
    const {active, over} = event;
    const cardID = active.id
    const nextZoneID = over.id
    if (cardsData[cardID].zone === nextZoneID) return;
    if (nextZoneID === UseZoneID){
      setActiveCard(cardID)
      console.log(cardID, " in UseZone! activeCard: ", activeCard);
    }
    draggedCardPrevZoneID.current = cardsData[cardID].zone
    
    moveCard(cardID, nextZoneID)
    // console.log("updating card zone for", cardsData[cardID]);
  }

  function generateCards(): ReactNode {
    return Object.entries(cardsData).map(([id, cardData]) => {
      return (<MotionCard 
        key={id} 
        activeCard={activeCard} 
        setActiveCard={setActiveCard} 
        cardData={cardData}
        trySwapOrigins={trySwapOrigins}
        >
          {cardData.conetent}
        </MotionCard>) })
  }

  return (
    <>
      <div id='leftcol' >
        <LeftPanel activeCard={activeCard}></LeftPanel>
      </div>
      <div id='centercol'>
        <div className='CardBounds' style={{}}>
            <DndContext onDragEnd={handleDragEnd}>
            {generateCards()}
            <CardZone zoneData={zoneData[handZoneID]}  >
            </CardZone>

            <CardZone zoneData={zoneData[jokerZoneID]}  >
              maybe put links to my projects here?
            </CardZone>
            
            <CardZone zoneData={zoneData[consumableZoneID]}  >
              maybe linkns to projects here, so you "use / consume" them haha hehe
            </CardZone>

            <CardZone zoneData={zoneData[UseZoneID]}  >
              
            </CardZone>

          </DndContext>
        </div>
      </div>
    </>
  )
}

export default App

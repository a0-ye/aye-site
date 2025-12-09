import { useState, useId, type ReactNode, useEffect, useRef} from 'react'
import './App.css'

import AboutMeContent from './assets/CardContent/AboutMe'

import MotionCard from './assets/components/DraggableCardKit/MotionCard'
import CardZone from './assets/components/DraggableCardKit/CardZone'

import { DndContext, type DragEndEvent, type DragOverEvent, type DragStartEvent, type UniqueIdentifier } from '@dnd-kit/core'
import { makeCoords, useCardHandler, type CardData, type CardMap, type ZoneMap } from './assets/components/DraggableCardKit/CardKitFunctions'


import LeftPanel from './assets/components/left-panel/LeftPanel'
import { animate } from 'motion'


function App() {

  // ======= INIT ==========================================
  const [activeCard, setActiveCard] = useState<CardData | null>(null) // needs to be here to give props to cards

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
      animate("div",{'--boss-blind-color':colorMap[activeCard.id]});
      
    } else {
      animate("div",{'--boss-blind-color':DEFAULT_COLOR});
    }
  },[activeCard])

  const cardBounds = {
    width:900,
    height:650,
  }

  const initialZones:ZoneMap = {
    [handZoneID]: { id:handZoneID, cards:[], position:makeCoords((cardBounds.width-750) / 2,450),   
                    dimensions:{width:750,height:150},  changeOrigins:() => {}},

    [jokerZoneID]:    { id:jokerZoneID,    cards:[], position:makeCoords(50,15), 
                    dimensions:{width:500,height:150}, changeOrigins:() => {}},

    [consumableZoneID]:{ id:consumableZoneID,cards:[], position:makeCoords(600,15), 
                    dimensions:{width:250,height:150}, changeOrigins:() => {}},

    [UseZoneID]:{ id:UseZoneID,cards:[], position:makeCoords(cardBounds.width/2 - 75,cardBounds.height/2 -75), 
                    dimensions:{width:150,height:150}, changeOrigins:() => {}},
  }

  // create Card State & Managers + load zones
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

  const [disableZoneFlag, setDisableZoneFlag] = useState(true)
  const [draggedCardStartZone, setDraggedCardStartZone] = useState<UniqueIdentifier|null>(null)
  const handleDragStart = (event:DragStartEvent) => {
    setDisableZoneFlag(false);
    setDraggedCardStartZone(event.active.data.current?.origin_zone)

    console.log('drag start:');
  }

  const handleOnDragOver = (event:DragOverEvent)=>{
    console.log(
      // over is the zone, active is the card
      // draggedCardStartZone,
      event.over?.id,
      event.active.id,
    );

    

  }

  const handleDragEnd = (event:DragEndEvent) => {
    // over contains the ID of the droppable zone
    setDisableZoneFlag(true);
    // console.log(disableUseZone.current);
    
    if(!event.over) return
    const {active, over} = event;
    const cardID = active.id
    const nextZoneID = over.id
    if (cardsData[cardID].zone === nextZoneID) return;
    if (nextZoneID === UseZoneID){
      setActiveCard(cardsData[cardID])
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
        activeCard={activeCard? activeCard.id : null} 
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
        <LeftPanel activeCard={activeCard? activeCard.id : null}></LeftPanel>
      </div>
      <div id='centercol'>
        <div className='CardBounds' style={{}}>
            <DndContext onDragEnd={handleDragEnd} 
                        onDragStart={handleDragStart}
                        onDragOver={handleOnDragOver}
                        >
            {generateCards()}
            <CardZone zoneData={zoneData[handZoneID]}  draggedCardStartZone={draggedCardStartZone}>
            </CardZone>

            <CardZone zoneData={zoneData[jokerZoneID]}  draggedCardStartZone={draggedCardStartZone}>
              maybe put links to my projects here?
            </CardZone>
            
            <CardZone zoneData={zoneData[consumableZoneID]}  draggedCardStartZone={draggedCardStartZone}>
              maybe linkns to projects here, so you "use / consume" them haha hehe
            </CardZone>

            <CardZone zoneData={zoneData[UseZoneID]}draggedCardStartZone={draggedCardStartZone} disableFlag={disableZoneFlag}  >
              
            </CardZone>

          </DndContext>
        </div>
      </div>
    </>
  )
}

export default App

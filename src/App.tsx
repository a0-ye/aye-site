import { useState, useId, type ReactNode, type CSSProperties, useEffect, useRef, act} from 'react'
import './App.css'

import AboutMeContent from './assets/CardContent/AboutMe'
import { AboutMeThumbnail } from './assets/CardContent/AboutMe'

import MotionCard from './assets/components/DraggableCardKit/MotionCard'
import CardZone from './assets/components/DraggableCardKit/CardZone'

import { DndContext, type DragEndEvent, type UniqueIdentifier } from '@dnd-kit/core'
import { makeCoords, useCardHandler, type CardMap, type InitCards, type InitZones, type ZoneMap } from './assets/components/DraggableCardKit/CardKitFunctions'


function App() {

  // ======= INIT ==========================================
  const [activeCard, setActiveCard] = useState<UniqueIdentifier | null>(null) // needs to be here to give props to cards

  const c1ID = useId();
  const c2ID = useId();
  const c3ID = useId();
  const initialCards:InitCards = {
    [c1ID]: {id:c1ID, content:AboutMeContent},
    [c2ID]: {id:c2ID,   },
    [c3ID]: {id:c3ID,   },
  }

  const handZoneID = useId() // store this one specially, since all cards start in the hand
  const jokerZoneID = useId(); // Where jokers live.. No functionality, just naming like balaro :drooling:
  const consumableZoneID = useId(); // Where consumables live.. No functionality, just naming like balaro :drooling:
  const UseZoneID = useId();

  const initialZones:InitZones = {
    [handZoneID]: { id:handZoneID, 
                    position:makeCoords(150,700),dimensions:{width:750,height:150} },

    [jokerZoneID]:    { id:jokerZoneID, 
                    position:makeCoords(200,75), dimensions:{width:500,height:150} },

    [consumableZoneID]:{ id:consumableZoneID, 
                    position:makeCoords(900,75), dimensions:{width:250,height:150} },

    [UseZoneID]:{ id:UseZoneID, 
                    position:makeCoords(600 - 150,450 - 150),dimensions:{width:150,height:150}},
  }

  // create States & Manager
  const [cardsData, zoneData, moveCard, trySwapOrigins] = useCardHandler(initialCards, initialZones, handZoneID);
  /**
   * FLOW: card dragged to UseZone --> OnDragEndHandler sees its UseZone.
   * SPECIAL CASE! used!: setActiveCard to the one dropped in UseZone. 
   *                      Create an event(originZoneID, cardID), watches for activeCard == None, 
   *                        when it changes to none, move card back to originZone.   *                    
   *                    
   * CARD FUNCTIONALITY: Every card has a reference to activeCard and SetActiveCard.
   *        if self.ID == activeCard, then WE are active!
   *        we do our active thing. We flip, grow in size to show our content.
   *        CLOSE BUTTON: 
   *                Fade content, Shrink in size, Flip around.
   *                Closes self via SetActiveCard(None).
   *
   *  const [activeCard , setActiveCard] = useState(UniqueID | None), where we use card IDs.
   *  
   * 
   * onDragStart: make the Use zone change colors or show up or something
   * 
   */

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
    draggedCardPrevZoneID.current = cardsData[cardID].zone as UniqueIdentifier // default value is set if none given
    
    moveCard(cardID, nextZoneID)
    // console.log("updating card zone for", cardsData[cardID]);
  }

  function generateCards(): ReactNode {
    return Object.entries(cardsData).map(([id, cardData]) => {
      return (<MotionCard key={id} 
                          activeCard={activeCard} 
                          setActiveCard={setActiveCard} 
                          cardData={cardData}
                          trySwapOrigins={trySwapOrigins}
                          >
                            {/** Card Children go here */}
                            </MotionCard>) })
  }

  return (
    <>
      <div className='CardBounds' style={{ 
            
          }}>
          <DndContext onDragEnd={handleDragEnd}>
          {generateCards()}
          <CardZone zoneData={zoneData[handZoneID]}  >
          </CardZone>

          <CardZone zoneData={zoneData[jokerZoneID]}  >
          </CardZone>
          
          <CardZone zoneData={zoneData[consumableZoneID]}  >
          </CardZone>

          <CardZone zoneData={zoneData[UseZoneID]}  >
            active card: {activeCard}
          </CardZone>

        </DndContext>
      </div>
    </>
  )
}

export default App

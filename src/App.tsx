import { useState, useId, type ReactNode, type CSSProperties, useEffect, useRef, act} from 'react'
import './App.css'

import AboutMeContent from './assets/CardContent/AboutMe'
import { AboutMeThumbnail } from './assets/CardContent/AboutMe'

import MotionCard from './assets/components/DraggableCardKit/MotionCard'
import CardZone from './assets/components/DraggableCardKit/CardZone'

import { DndContext, type DragEndEvent, type UniqueIdentifier } from '@dnd-kit/core'
import { makeCoords, useCardHandler, type CardData, type CardMap, type ZoneData, type ZoneMap } from './assets/components/DraggableCardKit/CardKitFunctions'


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
    [c1ID]: {id:c1ID,  zone:handZoneID ,origin:makeCoords(0,0), },
    [c2ID]: {id:c2ID,  zone:handZoneID ,origin:makeCoords(0,0), },
    [c3ID]: {id:c3ID,  zone:handZoneID ,origin:makeCoords(0,0), },
  }



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
        >{AboutMeContent}</MotionCard>) })
  }

  return (
    <>
      <div className='flex-bounds'>
        <div className='left-panel'>

          <div className='dark-box'>
            <div id='blind-header'>Adrian Ye</div>
            <div id='blind-body'>

              token, headlineinfo. owns a nerd certificate; sexy
            </div>
          </div>
          <div id='score-box' className='dark-box'>
            <div id='score-text' className='panel-text' >Score:</div>
            <div className='grey-value'> 67</div>
          </div>
          <div id='hand-box' className='dark-box'>
            <div className='panel-text'>Active Card:</div>
            <div className='grey-value'>{activeCard ? activeCard : " Drag some cards!" }</div>
          </div>
          
          <div id='buttons-n-numbers-grid' >
            <div id='panel-button-container'>
              <button className='panel-button'> runinfo </button>
              <button className='panel-button'> options </button>
            </div>
            <div id='numbers-container'>
              <div id='hand-discard-container' className='duo-val-container'>
                <div className='dark-box'>
                  <div className='panel-text'>hands:</div>
                  <div className='grey-value'>4</div>
                </div>
                <div className='dark-box'>
                  <div className='panel-text'> discards:</div>
                  <div className='grey-value'>3</div>
                </div>
              </div>
              <div className='dark-box'>
                <div className='grey-value' >$money</div>
              </div>
              <div id='ante-round-container' className='duo-val-container'>
                <div className='dark-box'>
                  <div className='panel-text'> Ante: </div>
                  <div className='grey-value'> 2/8  </div>
                </div>
                <div className='dark-box'>
                  <div className='panel-text'> Round:</div>
                  <div className='grey-value'>1   </div>
                </div>
              </div>
              {/* hands discards money ante round */}
            </div>
          </div>

        </div>
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

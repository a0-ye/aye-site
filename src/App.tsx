import { useState, useId, type ReactNode, type CSSProperties, useEffect, useRef, act} from 'react'
import './App.css'

import AboutMeContent from './assets/CardContent/AboutMe'
import { AboutMeThumbnail } from './assets/CardContent/AboutMe'

import MotionCard from './assets/components/DraggableCardKit/MotionCard'
import CardZone from './assets/components/DraggableCardKit/CardZone'

import { DndContext, type DragEndEvent, type UniqueIdentifier } from '@dnd-kit/core'
import { makeCoords, useCardHandler, type CardData, type ZoneData } from './assets/components/DraggableCardKit/CardKitFunctions'





function App() {

  // ======= INIT ==========================================
  const [activeCard, setActiveCard] = useState<UniqueIdentifier | null>(null) // needs to be here to give props to cards

  const c1ID = useId();
  const c2ID = useId();
  const c3ID = useId();
  const initialCards: Record<UniqueIdentifier, CardData> = {
    [c1ID]: {id:c1ID,  zone:0,origin:makeCoords(0,0), },
    [c2ID]: {id:c2ID,  zone:0,origin:makeCoords(0,0), },
    [c3ID]: {id:c3ID,  zone:0,origin:makeCoords(0,0), },
  }

  const handZoneID = useId() // store this one specially, since all cards start in the hand
  const jokerZoneID = useId(); // Where jokers live.. No functionality, just naming like balaro :drooling:
  const consumableZoneID = useId(); // Where consumables live.. No functionality, just naming like balaro :drooling:
  const UseZoneID = useId();
  const initialZones:Record<UniqueIdentifier, ZoneData> = {
    [handZoneID]: { id:handZoneID, cards:[], position:makeCoords(150,700),   
                    dimensions:{width:750,height:150},  changeOrigins:() => {}},

    [jokerZoneID]:    { id:jokerZoneID,    cards:[], position:makeCoords(200,75), 
                    dimensions:{width:500,height:150}, changeOrigins:() => {}},

    [consumableZoneID]:{ id:consumableZoneID,cards:[], position:makeCoords(900,75), 
                    dimensions:{width:250,height:150}, changeOrigins:() => {}},

    [UseZoneID]:{ id:UseZoneID,cards:[], position:makeCoords(600 - 150,450 - 150), 
                    dimensions:{width:150,height:150}, changeOrigins:() => {}},
  }

  //all cards go in handZone by default
  for (const cardID in initialCards){
    initialZones[handZoneID].cards.push(cardID)
    initialCards[cardID].zone = handZoneID
  }

  // create State & Managers + load zones with changeOrigins
  const [cardsData, moveCard, changeOrigins] = useCardHandler(initialCards);
  for (const zoneID in initialZones){ initialZones[zoneID].changeOrigins = changeOrigins;}
  const [zoneData, setZoneData] = useState(initialZones);
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
    if (activeCard == null){
      // call the card zone update function using draggedCardPrevZoneID to reverse it
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
    
    // remove card from current zone. Add card to new zone
    setZoneData(
      prevState => {
        const currZoneID = cardsData[cardID].zone
        const newState = {...prevState} // make a copy
        const newCurZoneDat = {...newState[currZoneID]}  // copy
        newCurZoneDat.cards = [...newCurZoneDat.cards.filter(id => id !== cardID)];
        newState[currZoneID] = newCurZoneDat;

        const newNextZoneDat = {...newState[nextZoneID]}  // copy next zone
        newNextZoneDat.cards = [...newNextZoneDat.cards, cardID] // add card to next zone
        newState[nextZoneID] = newNextZoneDat // update next zone in new state
        return newState
      }
    )
    moveCard(cardID, nextZoneID)
    // console.log("updating card zone for", cardsData[cardID]);
  }

  function generateCards(): ReactNode {
    return Object.entries(cardsData).map(([id, cardData]) => {
      return (<MotionCard key={id} activeCard={activeCard} setActiveCard={setActiveCard} cardData={cardData}></MotionCard>) })
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
          </CardZone>

        </DndContext>
      </div>
    </>
  )
}

export default App

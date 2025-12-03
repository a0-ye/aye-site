import { useState, useId, type ReactNode, type CSSProperties} from 'react'
import './App.css'

import AboutMeContent from './assets/CardContent/AboutMe'
import { AboutMeThumbnail } from './assets/CardContent/AboutMe'

import MotionCard from './assets/components/DraggableCardKit/MotionCard'
import CardZone from './assets/components/DraggableCardKit/CardZone'

import { DndContext, type DragEndEvent, type UniqueIdentifier } from '@dnd-kit/core'
import { makeCoords, useCardHandler, type CardData, type ZoneData } from './assets/components/DraggableCardKit/CardKitFunctions'





function App() {

  // ======= INIT ==========================================
  const c1ID = useId();
  const c2ID = useId();
  const c3ID = useId();
  const initialCards: Record<UniqueIdentifier, CardData> = {
    [c1ID]:{id:c1ID, zone:0,origin:makeCoords(0,0)},
    [c2ID]:{id:c2ID,zone:0,origin:makeCoords(0,0)},
    [c3ID]:{id:c3ID,zone:0,origin:makeCoords(0,0)},
  }
  // TODO: maybe we don't dynamically generate zones... theres only going to be like 3
  const handZoneID = useId() // store this one specially, since all cards start in the hand
  const jokerZoneID = useId(); // Where jokers live.. No functionality, just naming
  const consumableZoneID = useId(); // Where consumables live.. No functionality, just naming
  const initialZones:Record<UniqueIdentifier, ZoneData> = {
    [handZoneID]: { id:handZoneID, cards:[], position:makeCoords(150,700),   
                    dimensions:{width:750,height:150},  changeOrigins:() => {}},

    [jokerZoneID]:    { id:jokerZoneID,    cards:[], position:makeCoords(200,75), 
                    dimensions:{width:500,height:150}, changeOrigins:() => {}},
    [consumableZoneID]:{ id:consumableZoneID,cards:[], position:makeCoords(900,75), 
                    dimensions:{width:250,height:150}, changeOrigins:() => {}},
  }

  //all cards go in handZone
  for (const cardID in initialCards){
    initialZones[handZoneID].cards.push(cardID)
    initialCards[cardID].zone = handZoneID
  }

  const [cardsData, moveCard, changeOrigins] = useCardHandler(initialCards);
  for (const zoneID in initialZones){ initialZones[zoneID].changeOrigins = changeOrigins;}
  const [zoneData, setZoneData] = useState(initialZones);


  // ======== END INIT ==========================================================


  const handleDragEnd = (event:DragEndEvent) => {
    // over contains the ID of the droppable zone
    // console.log("handlingDragEnd...", event);
    if(!event.over) return
    const {active, over} = event;
    const cardID = active.id
    const nextZoneID = over.id
    if (cardsData[cardID].zone === nextZoneID) return;
    
    // remove card from current zone. Add card to new zone
    setZoneData(
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
        return newState
      }
    )
    moveCard(cardID, nextZoneID)
    console.log("updating card zone for", cardsData[cardID]);
  }

  function generateCards(): ReactNode {
    return Object.entries(cardsData).map(([id, cardData]) => {
      return (<MotionCard key={id} cardData={cardData}></MotionCard>) })
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

        </DndContext>
      </div>
    </>
  )
}

export default App

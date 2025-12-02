import { useState, useId, type ReactNode, type CSSProperties} from 'react'
import './App.css'

import AboutMeContent from './assets/CardContent/AboutMe'
import { AboutMeThumbnail } from './assets/CardContent/AboutMe'

import MotionCard from './assets/components/DraggableCardKit/MotionCard'
import CardZone from './assets/components/DraggableCardKit/CardZone'

import { DndContext, type DragEndEvent, type UniqueIdentifier } from '@dnd-kit/core'
import { makeCoords, useCardHandler, type CardData, type ZoneData } from './assets/components/DraggableCardKit/CardKitFunctions'




function App() {
  const c1ID = useId();
  const c2ID = useId();
  const initialCards: Record<UniqueIdentifier, CardData> = {
    [c1ID]:{id:c1ID, zone:0,origin:makeCoords(0,0)},
    [c2ID]:{id:c2ID,zone:0,origin:makeCoords(0,0)},
  }
  // TODO: maybe we don't dynamically generate zones... theres only going to be like 3
  const handZoneID = useId() // store this one specially, since all cards start in the hand
  const zone2ID = useId(); // TODO: remove. is for testing
  const initialZones:Record<UniqueIdentifier, ZoneData> = {
    [handZoneID]:{id:handZoneID, cards:[],position:makeCoords(0,0), changeOrigins:() => {}},
    [zone2ID]:{id:zone2ID, cards:[],position:makeCoords(600,0), changeOrigins:() => {}},
  }

  //all cards go in handZone
  for (const cardID in initialCards){
    initialZones[handZoneID].cards.push(cardID)
    initialCards[cardID].zone = handZoneID
  }

  const [cardsData, moveCard, changeOrigins] = useCardHandler(initialCards);
  for (const zoneID in initialZones){ initialZones[zoneID].changeOrigins = changeOrigins;}
  const [zoneData, setZoneData] = useState(initialZones);

  const handleDragEnd = (event:DragEndEvent) => {
    // over contains the ID of the droppable zone
    // console.log("handlingDragEnd...", event);
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
    console.log("updating card zone for", cardsData[cardID]);
    
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
      <div className='CardBounds' style={
        { position:'relative', 
          // left:0, top:0, 
          width:900, height:600, display:'flex', backgroundColor:"#f82f2fff"}}>
          <DndContext onDragEnd={handleDragEnd}>
          {generateCards()}
          <CardZone zoneData={zoneData[handZoneID]}>
          </CardZone>

          <CardZone zoneData={zoneData[zone2ID]}>
          </CardZone>

        </DndContext>
      </div>
    </>
  )
}

export default App

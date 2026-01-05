import { useState, useId, type ReactNode, useEffect, useRef, type CSSProperties } from 'react'
import './App.css'

import AboutMe from './assets/CardContent/AboutMe'

import MotionCard from './assets/components/DraggableCardKit/MotionCard'
import CardZone from './assets/components/DraggableCardKit/CardZone'

import { DndContext, type DragEndEvent, type DragOverEvent, type DragStartEvent, type UniqueIdentifier } from '@dnd-kit/core'
import { BLANK_CARD_DATA, makeCoords, useCardHandler, type CardContent, type CardData, type InitCardData, type InitZoneData, } from './assets/components/DraggableCardKit/CardKitFunctions'


import LeftPanel from './assets/components/left-panel/LeftPanel'
import { animate } from 'motion'
import Projects from './assets/CardContent/Projects'
import { AnimatePresence, motion } from 'motion/react'
import { Papers } from './assets/CardContent/Papers'
import PopupPanel from './assets/components/popup-panel/PopupPanel'
import ContentWrap from './assets/CardContent/ContentWrap'


function App() {

  // ======= INIT ==========================================
  const [activeCard, setActiveCard] = useState<CardData>(BLANK_CARD_DATA) // needs to be here to give props to cards
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currSettings, setSettings] = useState({ beSerious: true })

  const c1ID = useId();
  const c2ID = useId();
  const c3ID = useId();
  // const handZoneID = useId() // store this one specially, since all cards start in the hand
  const jokerZoneID = useId(); // Where jokers live.. No functionality, just naming like balaro :drooling:
  // const consumableZoneID = useId(); // Where consumables live.. No functionality, just naming like balaro :drooling:
  const UseZoneID = useId();

  const aboutMeContent: CardContent = {
    cardContent: <AboutMe currSettings={currSettings} />,
    cardBack: "img/Jimbo.png",
    cardHoverInfo: 'About Me!',
  }
  const c2Content: CardContent = {
    cardBack: "img/michel.png",
    cardHoverInfo: 'Things I\'ve done!',
    cardContent: <Projects />,
  }
  const c3Content: CardContent = {
    cardBack: "img/andrew.png",
    cardHoverInfo: 'Papers',
    cardContent: Papers,
  }

  const initialCards: InitCardData[] = [
    {
      id: c1ID, zone: jokerZoneID, origin: makeCoords(0, 0),
      cardContent: aboutMeContent
    },
    { id: c2ID, zone: jokerZoneID, origin: makeCoords(0, 0), cardContent: c2Content },
    { id: c3ID, zone: jokerZoneID, origin: makeCoords(0, 0), cardContent: c3Content },
  ]

  const DEFAULT_COLOR = '#33473a';
  const blindColorMap: Record<UniqueIdentifier, string> = {
    [""]: DEFAULT_COLOR,
    [c1ID]: '#3f457cff',
    [c2ID]: '#a00043',
    [c3ID]: '#ffd13a',
  }

  useEffect(() => {
    animate("#leftcol", { '--boss-blind-color': blindColorMap[activeCard.id] })
    animate("#centercol", { '--boss-blind-color': blindColorMap[activeCard.id] })
  }, [activeCard])

  const cardBounds = {
    width: 900,
    height: 650,
  }

  const initialZones: InitZoneData[] = [
    // { id: handZoneID, position: makeCoords((cardBounds.width - 750) / 2, 450), dimensions: { width: 750, height: 150 }, },
    { id: jokerZoneID, position: makeCoords(50, 25), dimensions: { width: 500, height: 150 }, },
    // { id: consumableZoneID, position: makeCoords(600, 15), dimensions: { width: 250, height: 150 } },
    { id: UseZoneID, position: makeCoords(600, 25), dimensions: { width: 150, height: 150 } },
  ]


  // create Card State & Managers + load zones
  const [cardsData, zoneData, moveCard, trySwapOrigins] = useCardHandler(initialCards, initialZones, jokerZoneID);

  // ======== END INIT ==========================================================


  // Effect to return a card to the original zone
  const draggedCardPrevZoneID = useRef<UniqueIdentifier | null>(null)
  useEffect(() => {
    if ((activeCard == null || activeCard.id == "") && draggedCardPrevZoneID.current) {
      // call the card zone update function using draggedCardPrevZoneID to reverse it
      moveCard(zoneData[UseZoneID].cards[0], draggedCardPrevZoneID.current)
    }

  }, [activeCard])

  const [disableZoneFlag, setDisableZoneFlag] = useState(true)
  const [draggedCardStartZone, setDraggedCardStartZone] = useState<UniqueIdentifier | null>(null)
  const handleDragStart = (event: DragStartEvent) => {
    setDisableZoneFlag(false);
    setDraggedCardStartZone(event.active.data.current?.origin_zone)
  }

  const handleOnDragOver = (event: DragOverEvent) => {
    event.active
  }

  const handleDragEnd = (event: DragEndEvent) => {
    // over contains the ID of the droppable zone
    setDisableZoneFlag(true);

    if (!event.over) return
    const { active, over } = event;
    const cardID = active.id
    const nextZoneID = over.id
    if (cardsData[cardID].zone === nextZoneID) return;
    if (nextZoneID === UseZoneID) {
      zoneData[UseZoneID].cards.forEach((cardID) => {
        moveCard(cardID, draggedCardPrevZoneID.current || jokerZoneID)
      })

      setActiveCard(cardsData[cardID])
    }
    draggedCardPrevZoneID.current = cardsData[cardID].zone

    moveCard(cardID, nextZoneID)
  }

  function generateCard(cardID: UniqueIdentifier, cardStyle?: CSSProperties): ReactNode {
    return (
      <MotionCard
        key={cardID}
        cardData={cardsData[cardID]}
        activeCard={activeCard.id}
        setActiveCard={setActiveCard}
        trySwapOrigins={trySwapOrigins}
        cardContent={cardsData[cardID].cardContent}
        style={{ ...cardStyle }}
      />
    )
  }

  return (
    <>
      <div id='leftcol' >
        <LeftPanel activeCard={activeCard.id} setActiveCard={setActiveCard} cardsData={cardsData}
          setShowSettings={setShowSettings} setShowInfo={setShowInfo}>

        </LeftPanel>
      </div>
      <div id='centercol'>
        <div className='CardBounds' style={{}}>
          <div style={{
            position:'absolute',right:'5%', top:'50%', fontSize:'xx-large'
          }}
          > Drag a card to the Use zone to navigate to different pages!</div>
          <DndContext onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragOver={handleOnDragOver}
          >
            {generateCard(c1ID, { cursor: 'grab' })}
            {generateCard(c2ID, { cursor: 'grab' })}
            {generateCard(c3ID, { cursor: 'grab' })}
            <CardZone zoneData={zoneData[jokerZoneID]} draggedCardStartZone={draggedCardStartZone}>
              Info about myself. about me, projects, etc
            </CardZone>

            <CardZone zoneData={zoneData[UseZoneID]}
              draggedCardStartZone={draggedCardStartZone}
              disableFlag={disableZoneFlag}
              style={{
                backgroundColor: '#00b158ce',
                borderColor: '#ffffffff',
                borderRadius: '5px',
                borderStyle: 'solid',
                color: '#ffffffb0',
                fontSize: '60pt'
              }}
            >

              USE

            </CardZone>
          </DndContext>

        </div>
        <motion.div id='content-display' style={{}}>
          {showInfo && <PopupPanel setFunction={setShowInfo}>
            <div>Hello this is the Info Panel {showInfo}</div>
          </PopupPanel>}
          {showSettings && <PopupPanel setFunction={setShowSettings}>
            <div>Hello this is the Settings Panel </div>
            <button style={{ backgroundColor: currSettings.beSerious ? 'blue' : 'orange' }} onClick={() => { setSettings({ ...currSettings, beSerious: (!currSettings.beSerious) }) }}> toggle serious mode</button>
          </PopupPanel>}
          <AnimatePresence>
            {activeCard != BLANK_CARD_DATA &&
              <ContentWrap key={activeCard.id}>{activeCard.cardContent.cardContent}</ContentWrap>}
          </AnimatePresence>
        </motion.div>
      </div>


      <motion.div id='TransitionBlock'
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
        initial={{
          zIndex: 100,
          position: 'absolute',
          backgroundColor: '#1684c4ff',
          top: '50%', left: '50%',
          rotate: 27,
          translateX: '-50%', translateY: '-50%',
          width: '200vw', height: '200vw',

        }
        }
        animate={{
          width: 0, height: 0
        }}
      >
      </motion.div>
    </>
  )
}

export default App

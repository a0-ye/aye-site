import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import './Projects.css'
import { act, useId, useRef, useState, type ReactNode } from 'react'
// import ProjectCard, { type projectContent } from '../components/ProjectCard/ProjectCard'
import MotionCard from '../components/DraggableCardKit/MotionCard'
import { BLANK_CARD_DATA, type CardData } from '../components/DraggableCardKit/CardKitFunctions'

import { contentList } from './ProjectsDat'
import { main } from 'motion/react-client'


/**
 * 
 * Carousel Idea: cards that we can drag and throw to slide through a carousel on
 * the card itself. Cool AND interesting. Velocity and mass for speedy spring
 * click to grow? yah propbably
 * 
 * https://motion.dev/docs/react-animate-presence#changing-key
 * idea: velocity slideshow.
 * Enable drag controls or something. Track velocity. while velocity != 0, increment a value by velocity % 100.
 * Once Velocity is greater than 100, switch to the next slide. this drag is separate from the carousel,
 * 
 * once velocity is 0, that means we settled on a slide
 */





export default function Projects() {
    const [activeCard, setActiveCard] = useState<CardData>(BLANK_CARD_DATA)
    const mainRef = useRef<HTMLDivElement>(null)
    // const { scrollYProgress } = useScroll({ container: mainRef })
    // const parallaxCardTracker = useTransform(scrollYProgress, [0, 1], [0, contentList.length - 1])
    // const [prog, setProg] = useState(0);
    // const [activeProject, setActiveProject] = useState(-1)

    const card1Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: 'Project the First', cardBack: 'img/michel.png', content: <div>none</div>
        }
    }
    const card2Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: 'Second Project', cardBack: 'img/michel.png', content: <div>none</div>
        }
    }


    return (
        <div ref={mainRef} id='proj-main'>
            <button onClick={() => { }}></button>
            <motion.div id='projects-grid'
                style={{
                    // height: 500,
                    // overflow: 'hidden',
                }}
            >
                <div className='grid-cell'>
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}> hlelo</div>

                </div>
                <div className='grid-cell'>
                    <div>
                        <MotionCard
                            cardData={card1Dat}
                            setActiveCard={setActiveCard}
                            activeCard={activeCard.id}
                            centeringTargetRef={mainRef}
                            style={{
                                // make this the size of the image somehow?
                                width: '100%',
                                height: '100%',
                            }}
                            onClick={() => {
                                setActiveCard((currentActiveCard) => {
                                    const result = (currentActiveCard.id == card1Dat.id)
                                    // console.log('click detected! ', currentActiveCard.id, card1Dat.id, result);
                                    if  (result) { return BLANK_CARD_DATA }
                                    else return card1Dat
                                });

                            }}
                        >

                        </MotionCard>
                    </div>
                </div>
                <div className='grid-cell'>
                    <div>
                        <MotionCard
                            cardData={card2Dat}
                            setActiveCard={setActiveCard}
                            activeCard={activeCard.id}
                            centeringTargetRef={mainRef}
                            style={{
                                // make this the size of the image somehow?
                                width: '100%',
                                height: '100%',
                            }}
                            onClick={() => {
                                setActiveCard((currentActiveCard) => {
                                    const result = (currentActiveCard.id == card2Dat.id)
                                    // console.log('click detected! ', currentActiveCard.id, card1Dat.id, result);
                                    if  (result) { return BLANK_CARD_DATA }
                                    else return card2Dat
                                });

                            }}
                        >

                        </MotionCard>
                    </div>
                </div>
                <div className='grid-cell'>
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}> hlelo</div>
                </div>

                {/* {contentList.map((val, idx) => { return createProjectCard(val, idx); })} */}
            </motion.div>
            <MotionCard
                cardData={{ ...BLANK_CARD_DATA, cardContent: { cardHoverInfo: 'uhh test', cardBack: 'img/michel.png' } }}
                style={{
                    // make this the size of the image somehow?
                    width: 300,
                    height: 300,
                }}>

            </MotionCard>
        </div >
    )
}
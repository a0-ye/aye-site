import type { UniqueIdentifier } from "@dnd-kit/core";
import './LeftPanel.css'
import MotionCard from "../DraggableCardKit/MotionCard";
import { BLANK_CARD_DATA, type CardMap } from "../DraggableCardKit/CardKitFunctions";
// import AboutMe from "../../pages/AboutMe";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface panelProps {
    activeCard: UniqueIdentifier,
    cardsData: CardMap,
    setActiveCard: Function
    setShowSettings: Function,
    setShowInfo: Function,
}

export default function LeftPanel(props: panelProps) {
    const activeCard = props.activeCard
    const pageDescriptions: Record<string, string> = {
        'About Me': 'Learn some stuff about me!',
        'Projects': 'This page contains overviews about my projects both past and present.',
        'Experience': 'A page for my experience. Resume, transcript, technical proficiencies',
        'error': ''
    }
    const [counter, setCounter] = useState(new Set())

    useEffect(() => {
        if (activeCard != '') setCounter((oldSet) => {
            const newSet = new Set(oldSet)
            newSet.add(activeCard)
            return newSet
        })

    }, [activeCard])


    return <div className='left-panel'>
        <div className='panel-box'>
            <div className='blind-header'>Adrian Ye</div>
            <div id='blind-body'>
                <div id="token-container">
                    <MotionCard
                        cardData={{ ...BLANK_CARD_DATA, cardContent: { cardBack: "img/sprout-token.png" } }}
                        token
                        style={{
                            top: "50%", left: '50%',
                            width: 75,
                            height: 75,
                            backgroundColor: 'transparent',
                            borderRadius: 50,
                            borderColor: 'transparent',
                            boxShadow: 'none',
                        }}
                    >
                        {/* <img src="public/img/sprout-token.png"></img> */}
                    </MotionCard>
                </div>
                <div className="panel-text">
                    B.S. Computer Science & Engineering
                </div>
            </div>
        </div>

        <div id='hand-box' className='panel-box'>
            <div className='panel-text' style={{
                color: activeCard != "" ? 'inherit' : "#ffe139ff"
            }}>
                {activeCard != "" ? `Current Page: ${props.cardsData[activeCard].cardContent.cardHoverInfo}` : " How To Navigate:"}
            </div>
            <div className='panel-value' style={{ fontSize: 'x-large' }}>
                {activeCard != "" ? pageDescriptions[props.cardsData[activeCard].cardContent.cardHoverInfo || 'error'] : " Drag a card at the top to the [USE] Zone to open a page!"}
            </div>
        </div>

        <div id='buttons-n-numbers-grid' style={{
            display: 'flex', flexDirection: 'column', gap: '1em',
            padding: 2,
        }}>

            <div id='numbers-container' style={{ gap: 5 }}>
                {/* <div id='hand-discard-container' className='duo-val-container'>
                    <div className='panel-box'>
                        <div className='panel-text'>    hands:  </div>
                        <div className='panel-value'>   4      </div>
                    </div>
                    <div className='panel-box'>
                        <div className='panel-text'>    discards:  </div>
                        <div className='panel-value'>   3          </div>
                    </div>
                </div> */}
                <div className='panel-box' >
                    Pages Visited:
                    <div className='panel-value' >{`${counter.size}/3`}</div>
                </div>
                {/* <div id='ante-round-container' className='duo-val-container'>
                    <div className='panel-box'>
                    </div>
                    <div className='panel-box'>
                        <div className='panel-text'> Round: </div>
                        <div className='panel-value'>1      </div>
                    </div>
                </div> */}
                <div id='panel-button-container' style={{
                    display: 'flex', justifyContent: 'space-evenly', gap: '10px'
                }}>
                    {/* <motion.button style={{
                        width: '50%', rotate: 0
                    }}
                        whileHover={{
                            scale: 1.1,
                            rotate: ['-3deg', '3deg', '0deg']
                        }}
                        className='panel-button' onClick={() => props.setShowInfo(true)}> Contact Me! </motion.button>
                    <motion.button style={{
                        width: '50%', rotate: 0
                    }}
                        whileHover={{
                            scale: 1.1,
                            rotate: ['-3deg', '3deg', '0deg']
                        }} className='panel-button' onClick={() => props.setShowSettings(true)}> options </motion.button> */}
                </div>
            </div>
            
            {props.activeCard && <motion.button
                style={{
                    width: '100%',
                    height: 500,
                    rotate: 0,
                }}
                initial={{ opacity: 0 }}
                animate={{opacity: 1,}}
                exit={{opacity: 0,}}
                whileHover={{
                    scale: 1.1,
                    rotate: ['-3deg', '3deg', '0deg']
                }} onClick={() => { props.setActiveCard?.(BLANK_CARD_DATA); }}> Close Card</motion.button>}
        </div>

    </div >
}

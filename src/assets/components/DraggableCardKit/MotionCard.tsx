import './MotionCard.css'
import { motion, useAnimate, useMotionValue, useSpring, useTransform, useVelocity, type MotionStyle, type PanInfo } from "motion/react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import Draggable from "../dnd-kit-wrappers/draggable"
import { BLANK_CARD_DATA, makeCoords, type CardContent, type CardData } from "./CardKitFunctions"
import type { UniqueIdentifier } from "@dnd-kit/core"



interface CardProps {
    cardData: CardData
    activeCard?: UniqueIdentifier | null;
    setActiveCard?: Function;
    trySwapOrigins?: Function;
    cardContent: CardContent;
    style?: MotionStyle;
    children?: ReactNode;
}

/**
 * Card that you can drag around, and always returns to its 'origin point'
 * Origin can be updated, and is updated via the origin prop.
 * 
 * TODO: there are 200 lines in this one function. do some readability refactoring
 * 
 * KNOWN ISSUES:
 *  sometimes the wiggle breaks and continues to wiggle while open. Not sure why, possibly a motion animation queue issue
 */
export default function MotionCard(props: CardProps) {
    const cardData = props.cardData
    const cardContent = props.cardContent;
    const activeCard = props.activeCard;
    const tokenFlag = (cardData == BLANK_CARD_DATA)
    const [scope, animate] = useAnimate();
    const dragSpringConfig = { damping: 8, stiffness: 120, mass: 0.01, restDelta: 0.001 }

    const isDragging = useRef(false)
    const [isOpen, setIsOpen] = useState(false)

    const targetX = useMotionValue(cardData.origin.x);
    const targetY = useMotionValue(cardData.origin.y);
    const currentX = useSpring(targetX, dragSpringConfig);
    const currentY = useSpring(targetY, dragSpringConfig);

    const velocityX = useVelocity(targetX)
    const smoothVelocityX = useSpring(velocityX, {
        stiffness: 2000,
        damping: 20,
        mass: 0.1,
    })
    const angle = useTransform(smoothVelocityX, (v) => {
        const VELOCITY_DAMP = 8000
        const rotationMaximum = 75; // degrees? is what im assuming this represents
        const rotationMinimum = 6;
        const rotation = (Math.min(rotationMaximum, Math.abs(rotationMaximum * (v / VELOCITY_DAMP)))) * Math.sign(v)
        return Math.abs(rotation) <= rotationMinimum ? rotation : rotation
    })
    const angleSpring = useSpring(angle, {
        stiffness: 200,
        damping: 20,
        mass: 1,
    })


    const returnToOrigin = () => {
        if (isDragging.current == false) {
            targetX.set(cardData.origin.x)
            targetY.set(cardData.origin.y)
            animate(scope.current, makeCoords(cardData.origin.x, cardData.origin.y))
        }
    }

    useEffect(() => {
        returnToOrigin()
    }, [cardData.origin.x, cardData.origin.y]
    )

    const showHoverInfo = (flag: boolean) => {
        if (!cardContent.cardHoverInfo) return;
        animate('.hoverInfo', { opacity: flag ? 1 : 0 }, { duration: 0.1 })
    }

    const onDragStartingPoint = useRef({ ...cardData.origin })
    const onDragStartHandler = () => {
        animate(scope.current, { zIndex: 3 })
        showHoverInfo(false)
        isDragging.current = true;
        onDragStartingPoint.current = { ...cardData.origin }
        // console.log(`starting drag from ${onDragStartingPoint.current}`);

    }

    const onDragHandler = (_: PointerEvent, info: PanInfo) => {
        // info.offset is the total mouse displacement from the start of the drag
        // using this, we can calculate the position we need to drag to via origin + offset!
        const newTargetX = onDragStartingPoint.current.x + info.offset.x
        const newTargetY = onDragStartingPoint.current.y + info.offset.y
        targetX.set(newTargetX)
        targetY.set(newTargetY)
        if (isDragging.current) {    // necessary. onDragHandler runs ONCE before onDragStart runs, so use it as a semaphore
            props.trySwapOrigins?.(cardData.id, makeCoords(newTargetX, newTargetY), cardData.zone)
        }
    }
    const onDragEndHandler = () => {
        isDragging.current = (false);
        if (!isOpen) {  // dont want to return to origin if open. This lets it go to the center
            animate(scope.current, { zIndex: 1 })
            returnToOrigin();
        }
        else{
        }
    }

    const startWiggle = () => {
        if (isOpen || tokenFlag) {
            console.log('no wiggle ', cardData.id, activeCard);
            return
        };  // no wiggle while open
        console.log('wigglign! ', cardData.id, activeCard);
        const wiggleAmount = 2 * Math.sign(Math.random() - 0.5);
        const wiggleDuration = 10;
        animate(scope.current, { rotate: [0, wiggleAmount, -wiggleAmount, 0] },
            {
                duration: wiggleDuration, ease: 'easeInOut', repeat: Infinity,
                repeatType: 'loop', delay: Math.random() * 3
            }
        )
    }

    useEffect(() => { 
        setIsOpen(activeCard == cardData.id); 
    }, [activeCard])
    useEffect(() => {
        const doAnimation = async () => {
            if (!tokenFlag) {
                if (isOpen) {
                    // TODO. need to translate left by the leftPanel width + its margin
                    // const rect = scope.current.getBoundingClientRect();
                    const leftPanelWidth = document.getElementById('leftcol')?.getBoundingClientRect().width || 0;
                    const centeredX = ((window.innerWidth - leftPanelWidth) / 2) ;
                    const centeredY = (window.innerHeight / 2) ;
                    console.log( "window center: ", centeredX, centeredY, leftPanelWidth);

                    const contentDisplayBox = document.getElementById('content-display')?.getBoundingClientRect()
                    
                    animate([//animate OPEN
                        [scope.current, { x: centeredX, y: centeredY, }, { duration: 0.4}],

                        [scope.current, { rotateY: 90 }, { duration: 0.1}],
                        ['.cardBackImg', { display: 'none' }, { duration: 0.1 }],
                        [scope.current, { rotateY: 0 }, { duration: 0.1 }],
                        [scope.current, {...cardVariantStyles.open, /**width:contentDisplayBox?.width || 10, height:contentDisplayBox?.height || 10*/}, { duration: 0.2 }],
                        ['.cardContentWrap', contentVariants.open,],
                        [scope.current, {width:0, height:0},{ duration: 0 }],
                    ])
                } else {
                    animate([
                        ['.cardContentWrap', contentVariants.initial, { duration: 0.1 }],
                        [scope.current, {...cardVariantStyles.open},{ duration: 0 }],
                        [scope.current, { width: 93, height: 125, opacity:1 }, { duration: 0.1 }],
                        [scope.current, { rotateY: 90 }, { duration: 0.1 }],
                        ['.cardBackImg', { display: 'block' }, { duration: 0.1, }],
                        [scope.current, { rotateY: 0 }, { duration: 0.1 }],
                        [scope.current, cardVariantStyles.initial, { duration: 0.1, }],
                        [scope.current, { zIndex: 2 }, { duration: 0.1 }],
                    ])
                    startWiggle()
                }
            }
        }
        doAnimation();
    }, [isOpen]
    )
    /**
     * ==============   Styles   ================
     */


    const cardStyle: MotionStyle = {
        width: 93, height: 125,
        opacity:1,
        zIndex: 1,
        display: 'flex',

        color: 'black',
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        position: 'absolute',

        backgroundColor: '#FFFFFF',
        boxShadow: '1px 4px 3px black',

        overflow:'hidden',
        alignContent: 'left',
        textAlign: 'left',
    }

    const mergedStyle = { ...cardStyle, ...props.style } // override props in cardStyle if exists
    const cardVariantStyles = {
        initial: {
            ...mergedStyle,
        },
        open: { // fades out
            width: 1200, height: 1000,
            zIndex: 11,
            opacity: 0,
            PointerEvent:false,
            backgroundColor: '#FFFFFF',
            borderColor:'transparent',
            // boxShadow: '7px 7px 15px black',
            cursor: 'auto'

        }
    }
    const contentVariants = {
        initial: {
            display: 'none',
            opacity: 0,
        },
        open: {
            display: 'block',
            opacity: 1
        }
    }


    return (
        <motion.div className="MotionCard"
            ref={scope}
            whileHover={isOpen || tokenFlag ? {} : { scale: 1.05, boxShadow: '3px 6px 3px black' }}
            onHoverStart={() => {
                if (!isOpen) {
                    showHoverInfo(true)
                    animate(scope.current, { rotate: [-15, 0], zIndex: 3 }, { duration: 0.1 })
                }
            }}
            onHoverEnd={() => {
                showHoverInfo(false)
                animate(scope.current, { zIndex: isOpen ? 10 : [3, 1] }, { duration: 0.1 })
                startWiggle();
            }}
            whileTap={isOpen ? {} : { scale: 0.99, rotate: 2 }}
            onTap={() => {
                if (!isDragging.current) {
                    console.log("clickah!");
                }

            }}
            drag={!isOpen}
            onDragStart={onDragStartHandler}
            onDrag={onDragHandler}
            onDragEnd={onDragEndHandler}
            style={{
                x: currentX, y: currentY, // controls the position of the card. Uses currentX and currentY to spring towards targetXY
                translateX: '-50%',
                translateY: '-50%',
                rotate: angleSpring,
                originX: '50%%',
                originY: '-20%',
                // rotateX: rotateX ,
                // rotate: angleSpring,
                ...mergedStyle,
                // originX:cardData.origin.x, originY:cardData.origin.y
            }}
        >
            <Draggable style={{ pointerEvents: (isOpen ? 'none' : 'auto') }}
                drag_id={cardData.id}
                cardData={cardData}
            />
            <motion.img src={cardContent?.cardBack} className='cardBackImg' style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
            }} />
            <motion.div className="hoverInfo" style={{
                display: tokenFlag ? 'none' : 'flex',
                right: '100%', top: '50%', translateY: '-50%',
            }}>
                {cardContent?.cardHoverInfo}
            </motion.div>

            <motion.div
                className={"cardContentWrap"}
                initial={contentVariants.initial}
                style={{ pointerEvents: (isOpen ? 'auto' : 'none') }}
            >
                <motion.button style={{
                    zIndex: 10,
                    position: 'absolute', margin: 15,
                    top: '100%', left: '50%',
                    translateX: '-50%'
                }} onClick={() => { props.setActiveCard?.(BLANK_CARD_DATA); }}> Close Card</motion.button>
                {/* { isOpen && cardContent?.cardContent} */}
                {props.children}
            </motion.div>
        </motion.div>

    )
}


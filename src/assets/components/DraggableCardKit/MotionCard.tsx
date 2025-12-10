import { motion, useAnimate, useMotionValue, useSpring, type PanInfo } from "motion/react"
import { useEffect, useRef, type CSSProperties, type ReactNode} from "react"
import Draggable from "../dnd-kit-wrappers/draggable"
import { BLANK_CARD_DATA, makeCoords, type CardData } from "./CardKitFunctions"
import type { UniqueIdentifier } from "@dnd-kit/core"



interface CardProps{
    cardData:CardData
    activeCard?: UniqueIdentifier | null;
    setActiveCard?:Function;
    trySwapOrigins?:Function;
    style?: CSSProperties;
    children?: ReactNode;
}

/**
 * Card that you can drag around, and always returns to its 'origin point'
 * Origin can be updated, and is updated via the origin prop.
 * 
 * 
 * TODOs
 *  - make card flip animation
 *  - make card content fade first, THEN shrink. looks nicer
 * 
 * KNOWN BUG: stuttering when starting a drag for the first time. I believe it has to do with the targetX and targetY still being 0 from
 *              the default cardData origin being 0,0
 *              Once i decouple that logic for initialization, it might be fixed, as well as the onDrag
 */
export default function MotionCard(props: CardProps) {
    const cardData = props.cardData
    const activeCard = props.activeCard;
    const [scope, animate] = useAnimate();
    const springConfig = { damping: 8, stiffness: 120, mass: 0.01, restDelta: 0.001 }

    const isDragging = useRef(false)
    const isOpen = useRef(false)

    const targetX = useMotionValue(cardData.origin.x);
    const targetY = useMotionValue(cardData.origin.y);
    const currentX = useSpring(targetX, springConfig);
    const currentY = useSpring(targetY, springConfig);

    const returnToOrigin = () => { 
        if (isDragging.current == false) {
            targetX.set(cardData.origin.x)
            targetY.set(cardData.origin.y)
            animate(scope.current, makeCoords(cardData.origin.x, cardData.origin.y))
        }
    }

    useEffect(()=>{
            returnToOrigin()
        },[cardData.origin.x, cardData.origin.y]
    )

    const onDragStartingPoint = useRef({...cardData.origin})
    const onDragStartHandler = ()=>{
        isDragging.current = true;
        onDragStartingPoint.current = {...cardData.origin}
        // console.log(`starting drag from ${onDragStartingPoint.current}`);
        
    }

    const onDragHandler = (_:PointerEvent, info:PanInfo)=>{
        // info.offset is the total mouse displacement from the start of the drag
        // using this, we can calculate the position we need to drag to via origin + offset!
        const newTargetX = onDragStartingPoint.current.x + info.offset.x
        const newTargetY = onDragStartingPoint.current.y + info.offset.y
        targetX.set(newTargetX)
        targetY.set(newTargetY)
        if (isDragging.current){    // necessary. onDragHandler runs ONCE before onDragStart runs, so use it as a semaphore
            props.trySwapOrigins?.(cardData.id, makeCoords(newTargetX, newTargetY), cardData.zone)
        }
    }
    const onDragEndHandler = ()=>{
        isDragging.current = false;
        returnToOrigin();
    }

    useEffect(()=>{isOpen.current = activeCard == cardData.id;},[activeCard])
    useEffect(()=>{
            if (isOpen.current){
                animate([
                    [scope.current, cardVariantStyles.open],
                    ['.cardContentWrap', contentVariants.open]
                ])
            } else {
                animate([
                    ['.cardContentWrap', contentVariants.initial, {duration:0.1}],
                    [scope.current, cardVariantStyles.initial,{duration:0.1}],
                ])
            }
        },[isOpen.current]
    )
    /**
     * ==============   Styles   ================
     */


    const cardStyle: CSSProperties = {
        width: 100,
        height: 125,
        zIndex:2,
        display:'flex',

        color:'black',
        borderRadius: 10,
        borderStyle:'solid',
        borderWidth:3,
        borderColor:'black',
        position:'absolute',

        backgroundColor:"#4649ff",
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        backgroundSize:'contain',

        alignContent:'left',
        textAlign:'left',
        // padding:15 // cant do padding, risks misaligning 
    }
    const mergedStyle = Object.assign(cardStyle, props.style) // override props in cardStyle if exists

    const cardVariantStyles = {
        initial:{
            ...mergedStyle
        },
        open:   {
            width:850, height:600,
            zIndex:10,
            opacity:1,
            backgroundColor:"#ffffff",
            backgroundImage:''
        }
    }

    const cardContentStyle: CSSProperties = {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        flexGrow:1,
    }

    const contentVariants = {
        initial:{
            opacity:0,
            duration: 0.5},
        open:{
            zIndex:10,
            opacity:1
        }
    }

    
    return (
    <motion.div className = "MotionCard"
                ref={scope}
                                
                drag = { props.activeCard != cardData.id }
                onDragStart={onDragStartHandler}
                onDrag={onDragHandler}
                onDragEnd={onDragEndHandler}
                style={{
                    x:currentX, y:currentY, // controls the position of the card. Uses currentX and currentY to spring towards targetXY
                    translateX: '-50%', 
                    translateY: '-50%',
                    ...mergedStyle,
                    // originX:cardData.origin.x, originY:cardData.origin.y
                    }}
                >
        <Draggable  style={{pointerEvents: (isOpen.current ? 'none' : 'auto') }} 
                    drag_id={cardData.id}
                    cardData={cardData}
                    />
        <motion.div 
        className={"cardContentWrap"}
        initial={contentVariants.initial} 
        style={{...cardContentStyle , pointerEvents: (isOpen.current ? 'auto' : 'none')}}
        >
            <button style={{zIndex:10}} onClick={()=>{props.setActiveCard?.(BLANK_CARD_DATA);}}> Close Card</button>

            {props.children}
        </motion.div>
    </motion.div>
        
    )
}


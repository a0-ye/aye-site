import { motion, useAnimate, useMotionValue, useSpring, useTransform, useVelocity, type MotionStyle, type PanInfo } from "motion/react"
import { useEffect, useRef, type ReactNode} from "react"
import Draggable from "../dnd-kit-wrappers/draggable"
import { BLANK_CARD_DATA, makeCoords, type CardData } from "./CardKitFunctions"
import type { UniqueIdentifier } from "@dnd-kit/core"



interface CardProps{
    cardData:CardData
    activeCard?: UniqueIdentifier | null;
    setActiveCard?:Function;
    trySwapOrigins?:Function;
    cardBack?:string;
    style?: MotionStyle;
    children?: ReactNode;
}

/**
 * Card that you can drag around, and always returns to its 'origin point'
 * Origin can be updated, and is updated via the origin prop.
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
    const tokenFlag = (cardData.id == cardData.zone)
    const [scope, animate] = useAnimate();
    const dragSpringConfig = { damping: 8, stiffness: 120, mass: 0.01, restDelta: 0.001 }

    const isDragging = useRef(false)
    const isOpen = useRef(false)

    const targetX = useMotionValue(cardData.origin.x);
    const targetY = useMotionValue(cardData.origin.y);
    const currentX = useSpring(targetX, dragSpringConfig);
    const currentY = useSpring(targetY, dragSpringConfig);

    const velocityX = useVelocity(targetX)
    const smoothVelocityX = useSpring(velocityX,{
        stiffness: 2000,
        damping: 20,
        mass: 0.1,
    })
    const angle = useTransform(smoothVelocityX, (v)=>{
        const VELOCITY_DAMP = 8000
        const rotationMaximum = 75; // degrees? is what im assuming this represents
        const rotationMinimum = 6;
        const rotation = (Math.min(rotationMaximum, Math.abs(rotationMaximum * (v / VELOCITY_DAMP)))) * Math.sign(v)
        return Math.abs(rotation) <= rotationMinimum ? rotation : rotation
    })
    const angleSpring = useSpring(angle, {
        stiffness: 200,
        damping:20,
        mass:1,
    })
    // smoothVelocityX.on('change',(latest)=>{
    //     console.log(latest);
    // })
    

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

    useEffect(()=>{isOpen.current = (activeCard == cardData.id);},[activeCard])
    useEffect(()=>{
            if (!tokenFlag){
                    if (isOpen.current){
                        animate([
                            [scope.current, {rotateY:90}, {duration:0.1}],
                            ['.cardBackImg', {display:'none'},{duration:0.1}],
                            [scope.current, {rotateY:0}, {duration:0.1}],
                            [scope.current, cardVariantStyles.open, {duration:0.2}],
                            ['.cardContentWrap', contentVariants.open,]
                        ])
                    } else {
                        console.log('closing: fade content and resize');
                        
                        animate([
                            ['.cardContentWrap', contentVariants.initial, {duration:0.1}],
                            [scope.current, {width: 93,height: 125,}, {duration:0.1}],
                            [scope.current, {rotateY:90}, {duration:0.1}],
                            ['.cardBackImg', {display:'block'},{duration:0.1,}],
                            [scope.current, {rotateY:0}, {duration:0.1}],
                            [scope.current, cardVariantStyles.initial,{duration:0.1,}],
                        ])
                        const wiggleAmount = 2 * Math.sign(Math.random() - 0.5);
                        const wiggleDuration = 10;
                        animate(scope.current,  {rotate: [0,wiggleAmount,-wiggleAmount,0]},
                                                {duration:wiggleDuration, ease:'easeInOut', repeat: Infinity,
                                                    repeatType: 'loop', delay: Math.random() * 3
                                                }
                        )
                    }
                }
            },[isOpen.current]
    )
    /**
     * ==============   Styles   ================
     */


    const cardStyle: MotionStyle = {
        width: 93,
        height: 125,
        zIndex:2,
        display:'flex',

        color:'black',
        borderRadius: 10,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'black',
        position:'absolute',

        backgroundColor:'#FFFFFF',
        boxShadow:'1px 4px 3px black',
        
        alignContent:'left',
        textAlign:'left',
    }

    const mergedStyle = {...cardStyle, ...props.style} // override props in cardStyle if exists
    const cardVariantStyles = {
        initial:{
            ...mergedStyle,
        },
        open:   {
            width:850, height:600,
            zIndex:10,
            opacity:1,
            backgroundColor:'#FFFFFF',
            boxShadow:'7px 7px 15px black',
            cursor:'auto'
            
        }
    }

    const cardContentStyle: MotionStyle = {
        margin:5,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        flexGrow:1,
    }

    const contentVariants = {
        initial:{
            display: 'none',
            opacity:0,
        },
        open:{
            zIndex:10,
            display:'block',
            opacity:1
        }
    }

    
    return (
    <motion.div className = "MotionCard"
                ref={scope}
                whileHover={ isOpen.current || tokenFlag ? {} : {scale:1.05, boxShadow:'3px 6px 3px black'} }
                onHoverStart={ event => {
                    // do a little wiggle
                    event
                } }
                whileTap={ isOpen.current ? {} : {scale:0.99, rotate:2}}
                drag = { props.activeCard != cardData.id }
                onDragStart={onDragStartHandler}
                onDrag={onDragHandler}
                onDragEnd={onDragEndHandler}
                style={{
                    x:currentX, y:currentY, // controls the position of the card. Uses currentX and currentY to spring towards targetXY
                    translateX: '-50%', 
                    translateY: '-50%',
        rotate: angleSpring,
                    originX:'50%%',
                    originY:'-20%',
                    // rotateX: rotateX ,
                    // rotate: angleSpring,
                    ...mergedStyle,
                    // originX:cardData.origin.x, originY:cardData.origin.y
                    }}
                >
        <Draggable  style={{pointerEvents: (isOpen.current ? 'none' : 'auto') }} 
                    drag_id={cardData.id}
                    cardData={cardData}
                    />
            <motion.img src={props.cardBack} className = 'cardBackImg' style={{}}/>
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


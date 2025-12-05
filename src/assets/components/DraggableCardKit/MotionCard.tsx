import { motion, useAnimate, useMotionValue, useSpring } from "motion/react"
import { useEffect, type CSSProperties, type ReactNode} from "react"
import Draggable from "../dnd-kit-wrappers/draggable"
import { makeCoords, type CardData } from "./CardKitFunctions"
import type { UniqueIdentifier } from "@dnd-kit/core"


interface CardProps{
    cardData:CardData
    activeCard: UniqueIdentifier | null;
    setActiveCard:Function;
    style?: CSSProperties;
    children?: ReactNode;
}

/**
 * Card that you can drag around, and always returns to its 'origin point'
 * Origin can be updated, and is updated via the origin prop.
 */
export default function MotionCard(props: CardProps) {
    const cardData = props.cardData
    const activeCard = props.activeCard;
    const [ref, animate] = useAnimate();
    const springConfig = { damping: 8, stiffness: 120, mass: 0.01, restDelta: 0.001 }

    const targetX = useMotionValue(cardData.origin.x);
    const targetY = useMotionValue(cardData.origin.y);
    const currentX = useSpring(targetX, springConfig);
    const currentY = useSpring(targetY, springConfig);

    const returnToOrigin = () => { 
        animate(ref.current, makeCoords(cardData.origin.x, cardData.origin.y))
    }

    useEffect(()=>{
            returnToOrigin()
        },[cardData.origin.x, cardData.origin.y]
    )

    /**
     * PLAN: useEffect( [activeCard]) to expand the card AND limit its drag.
     *      how can I add content to it? should it be pre-loaded and fade in? including the button?
     */
    useEffect(()=>{ // animate to the active/inactive card styles
        if (activeCard != cardData.id){
            animate(ref.current, cardStyle) 
            animate('.cardContentWrap', {opacity:0})
        } else {
            animate(ref.current, openCardStyle) 
            animate('.cardContentWrap', {opacity:1}, {duration: 1})

        }

    }, [activeCard]);

    return (
    <motion.div className = "MotionCard"
                ref={ref}
                drag = { props.activeCard != cardData.id }
                onDrag={(_,info)=>{
                    // info.offset is the total mouse displacement from the start of the drag
                    // using this, we can calculate the position we need to drag to via origin + offset!
                    const newTargetX = cardData.origin.x + info.offset.x
                    const newTargetY = cardData.origin.y + info.offset.y
                    targetX.set(newTargetX)
                    targetY.set(newTargetY)
                }}

                onDragEnd={()=>{
                    returnToOrigin()}}
                style={{
                    x:currentX, y:currentY, // controls the position of the card. Uses currentX and currentY to spring towards targetXY
                    backgroundColor: props.activeCard == cardData.id ? "#ffffffff": "#2f7cf8",
                        ...cardStyle, ...props.style, 
                        // originX:cardData.origin.x, originY:cardData.origin.y
                        }}
                initial={{
                    translateX: '-50%', 
                    translateY: '-50%'
                }}
                >
            <Draggable style={{pointerEvents: (activeCard == cardData.id ? 'none' : 'auto') }} drag_id={cardData.id}/>
                <motion.div className={"cardContentWrap"} ref={ref} style={{...cardContentStyle , pointerEvents: (activeCard == cardData.id ? 'auto' : 'none')}}>
                    <p>ID: {cardData.id}</p>
                    <p>Zone: {cardData.zone}</p>
                    <p>activeCard: {props.activeCard}</p>
                    <p> {cardData.origin.x} , {cardData.origin.y}</p>
                    <button style={{zIndex:10}} onClick={()=>{
                        props.setActiveCard(null);
                    }}></button>

                    {props.children}
                </motion.div>
    </motion.div>
        
    )
}

/**
 * ==============   Styles   ================
 */
const cardStyle: CSSProperties = {
    width: 100,
    height: 125,
    zIndex:2,
    color:'black',
    borderRadius: 10,
    borderStyle:'solid',
    borderWidth:3,
    borderColor:'black',
    position:'absolute',

    alignContent:'left',
    textAlign:'left',
    // padding:15 // cant do padding, risks misaligning 
}


const openCardStyle: CSSProperties = {
    width:500, height:900,
    zIndex:10,
    opacity:1
}

const cardContentStyle: CSSProperties = {
    
}


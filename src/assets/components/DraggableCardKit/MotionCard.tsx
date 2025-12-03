import { motion, useAnimate, useMotionValue, useSpring } from "motion/react"
import { useEffect, type CSSProperties, type ReactNode} from "react"
import Draggable from "../dnd-kit-wrappers/draggable"
import { makeCoords, type CardData } from "./CardKitFunctions"


interface CardProps{
    cardData:CardData

    style?: CSSProperties;
    children?: ReactNode;
}

/**
 * Card that you can drag around, and always returns to its 'origin point'
 * Origin can be updated, and is updated via the origin prop.
 */
export default function MotionCard(props: CardProps) {
    const cardData = props.cardData
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

    return <motion.div className = "MotionCard"
        ref={ref}
        drag
        onDrag={(_,info)=>{
            // info.offset is the total mouse displacement from the start of the drag
            // using this, we can calculate the position we need to drag to via origin + offset!
            const newTargetX = cardData.origin.x + info.offset.x
            const newTargetY = cardData.origin.y + info.offset.y
            targetX.set(newTargetX)
            targetY.set(newTargetY)
        }}

        onDragEnd={()=>{
            console.log("drag ended");
            returnToOrigin()}}
        style={{
            x:currentX, y:currentY, // controls the position of the card. Uses currentX and currentY to spring towards targetXY
                ...box, ...props.style, 
                // originX:cardData.origin.x, originY:cardData.origin.y
                }}>
            <Draggable drag_id={cardData.id}/>
            
            <p>ID: {cardData.id}</p>
            <p>Zone: {cardData.zone}</p>
           
            <p> {cardData.origin.x} , {cardData.origin.y}</p>
            
            {props.children}
        </motion.div>
}

/**
 * ==============   Styles   ================
 */
const box: CSSProperties = {
    width: 100,
    height: 125,
    zIndex:4,
    backgroundColor:"#2f7cf8",
    color:'black',
    borderRadius: 10,
    position:'absolute',
    // transform: 'translate(-50%, -50%)',
}



import type { UniqueIdentifier } from "@dnd-kit/core"
import { frame, motion, useAnimate, useMotionValue, useSpring } from "motion/react"
import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject} from "react"
import { makeCoords, type CardData, type coord} from "../../../App"
import Draggable from "../dnd-kit-wrappers/draggable"


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

    // const onDragPosition = useRef({x:0, y:0})


    const returnToOrigin = () => { 
        animate(ref.current, makeCoords(cardData.origin.x, cardData.origin.y))
    }

    useEffect(()=>{
            returnToOrigin()
        },[cardData.origin.x, cardData.origin.y]
    )

    return <motion.div
        ref={ref}
        drag
        onDragStart={()=>{
            // onDragPosition.current.x = currentX.get()
            // onDragPosition.current.y = currentY.get()
        }}
        onDrag={(_,info)=>{
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
}



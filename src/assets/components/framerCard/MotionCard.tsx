import type { UniqueIdentifier } from "@dnd-kit/core"
import { frame, motion, useAnimate, useSpring } from "motion/react"
import { useEffect, useState, type CSSProperties, type ReactNode, type RefObject} from "react"
import { makeCoords, type CardData, type coord} from "../../../App"
import Draggable from "../dnd-kit-wrappers/draggable"


function useFollowPointer(ref: RefObject<HTMLDivElement | null>, doFollow: boolean) {
    const spring = { damping: 8, stiffness: 120, mass: 0.01, restDelta: 0.001 }
    const x = useSpring(0, spring)
    const y = useSpring(0, spring)
    useEffect(() => {
        if (!ref || !ref.current) return
        if (!doFollow) return

        const handlePointerMove = (e: PointerEvent) => {
            const { clientX, clientY } = e
            const element = ref.current;
            if (!element) return

            frame.read(() => {
                x.set(clientX - element.offsetLeft - element.offsetWidth / 2)
                y.set(clientY - element.offsetTop - element.offsetHeight / 2)
            })
        }
        window.addEventListener("pointermove", handlePointerMove)
        return () => window.removeEventListener("pointermove", handlePointerMove)
    }, [doFollow, ref, x,y])
    return {x,y}
}

interface CardProps{
    cardData:CardData

    style?: CSSProperties;
    children?: ReactNode;
}

/**
 * Card that you can drag around, and always returns to its 'origin point'
 * Origin can be updated, and is updated via the origin prop. Updated 
 */
export default function MotionCard(props: CardProps) {
    const cardData = props.cardData
    const [ref, animate] = useAnimate();
    const [doFollow, setFollow] = useState(false)
    const {x,y} = useFollowPointer(ref, doFollow)

    const returnToOrigin = () => { setFollow(false); animate(ref.current, makeCoords(cardData.origin.x, cardData.origin.y))}
    useEffect(()=>{returnToOrigin()},[cardData.origin])    // when origin is updated, return to origin

    return <motion.div
        drag
        onMouseDown={()=> setFollow(true) }
        onDragEnd={returnToOrigin}
        ref={ref}
        style={{...box, x,y, ...props.style, 
                originX:cardData.origin.x, originY:cardData.origin.y}}>
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
    borderRadius: 10,
    position:'absolute',
}



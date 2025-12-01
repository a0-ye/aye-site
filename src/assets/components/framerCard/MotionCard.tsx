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
            const rect = ref.current?.getBoundingClientRect();
            if (!element || !rect) return

            frame.read(() => {
                x.set(clientX - rect.left - element.offsetWidth / 2) // problem: element.offsetLeft is 0 compared to its parent
                y.set(clientY - rect.top - element.offsetHeight / 2) //            need to f
                console.log(x.get(), y.get());
                
            })
        }
        window.addEventListener("pointermove", handlePointerMove)
        return () => {
            window.removeEventListener("pointermove", handlePointerMove)
        }
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
 * Origin can be updated, and is updated via the origin prop.
 */
export default function MotionCard(props: CardProps) {
    const cardData = props.cardData
    const [ref, animate] = useAnimate();
    const [doFollow, setFollow] = useState(false)
    const {x,y} = useFollowPointer(ref, doFollow)

    const returnToOrigin = () => { 
        setFollow(false);
        animate(ref.current, makeCoords(cardData.origin.x, cardData.origin.y))
    }

    useEffect(()=>{
        console.log("Origin Updated!!");
        returnToOrigin()
    },[cardData.origin.x, cardData.origin.y]
    )    // when origin is updated, return to origin
    // window.addEventListener("pointerup",returnToOrigin);

    return <motion.div
        // drag
        onMouseDown={()=> {
                setFollow(true)
            }
        }
        // onDragEnd={()=>{
        //     console.log("drag ended");
        //     returnToOrigin()}}
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
    color:'black',
    borderRadius: 10,
    position:'absolute',
}



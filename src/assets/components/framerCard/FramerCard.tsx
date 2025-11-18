"use client"
import { frame, motion, useSpring } from "motion/react"
import { useEffect, useRef, useState, type RefObject} from "react"

function useFollowPointer(ref: RefObject<HTMLDivElement>, doFollow: boolean) {
    const spring = { damping: 8, stiffness: 120, mass: 0.01, restDelta: 0.001 }
    const x = useSpring(0, spring)
    const y = useSpring(0, spring)
    
    useEffect(() => {
        if (!doFollow) return
        if (!ref.current) return

        const handlePointerMove = (e: PointerEvent) => {
            const { clientX, clientY } = e
            const element = ref.current

            frame.read(() => {
                x.set(clientX - element.offsetLeft - element.offsetWidth / 2)
                y.set(clientY - element.offsetTop - element.offsetHeight / 2)
            })
    }
    window.addEventListener("pointermove", handlePointerMove)
    return () => window.removeEventListener("pointermove", handlePointerMove)
}, [doFollow, x, y, ref])
    return {x,y}
}

function dropZoneCheck(event: PointerEvent, info:any){
    /**
     *  point: The x and y coordinates of the pointer.
     *  delta: The distance moved since the last event.
     *  offset: The distance from the element's origin.
     *  velocity: The current velocity of the pointer.
     */
    console.log("Drop Zone Check:",event, info);
    return
}


export default function MotionCard() {
    const [doFollow, setFollow] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const {x,y} = useFollowPointer(ref, doFollow)

    useEffect(()=>{
        if(doFollow) return
        const stopFollow = () => setFollow(false)
        window.addEventListener('pointerup',stopFollow)
        window.addEventListener('pointercancel',stopFollow)
        
        return ()=> {
            window.addEventListener('pointerup',stopFollow)
            window.addEventListener('pointercancel',stopFollow)
        }
    },[doFollow])

    return <motion.div
        draggable={true}
        drag
        dragSnapToOrigin
        dragTransition={{
            min:0,
            max:100,
            bounceDamping:20,
            bounceStiffness:200,
        }}

        dragElastic={0.1}
        onMouseDown={()=> setFollow(true) }
        onDragEnd={dropZoneCheck}
        ref={ref}
        style={{...box, x, y}} />
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#2f7cf8",
    borderRadius: 10,
}


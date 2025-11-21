import { frame, motion, useAnimate, useSpring } from "motion/react"
import { useEffect, useState, type CSSProperties, type ReactNode, type RefObject} from "react"


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

interface cardProps{
    style?: CSSProperties;
    children?: ReactNode;
}

export default function MotionCard(props: cardProps) {
    const [ref, animate] = useAnimate();
    const [doFollow, setFollow] = useState(false)
    const [currentOrigin, setOrigin] = useState({x:0,y:0})
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

    const onDragEndHandler = () => {
        animate(ref.current, {x:currentOrigin.x, y:currentOrigin.y})
    };

    return <motion.div
        draggable={true}
        drag
        onMouseDown={()=> setFollow(true) }
        onDragEnd={onDragEndHandler}
        ref={ref}
        style={{...box, x,y, ...props.style, originX:currentOrigin.x, originY:currentOrigin.y}}>
            <button onClick={()=>{
                setOrigin({x:currentOrigin.x + 15, y:currentOrigin.y + 15 });
                console.log("updated origin by 15",currentOrigin);
            }}></button>
            {props.children}
        </motion.div>
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 125,
    backgroundColor: "#2f7cf8",
    borderRadius: 10,
}


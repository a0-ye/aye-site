import { frame, motion, useSpring } from "motion/react"
import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject} from "react"

interface ZoneProps{
    style?: CSSProperties;
    children?: ReactNode;

}

export default function CardZone(props: ZoneProps) {
    const ref = useRef<HTMLDivElement>(null)
    return <motion.div 
            ref={ref} 
            style={{...box,margin:5,padding:15}}>
                {props.children}
            </motion.div>

}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 400,
    height: 250,
    backgroundColor: "#f5f3ddff",
    borderRadius: 10,
}


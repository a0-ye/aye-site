import { frame, motion, useSpring } from "motion/react"
import { useEffect, useRef, useState, type RefObject} from "react"

export default function MotionCard() {
    const ref = useRef<HTMLDivElement>(null)
    return <motion.div
        ref={ref}
        style={{...box}} />
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#f5f3ddff",
    borderRadius: 10,
}


import type { UniqueIdentifier } from "@dnd-kit/core";
import { frame, motion, useSpring } from "motion/react"
import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject} from "react"
import { makeCoords, type ZoneData, type coord} from "../../../App";

interface ZoneProps{
    zoneData:ZoneData,
    style?: CSSProperties;
    children?: ReactNode;
}


// TODO: calculate absolute coordinates relative to the viewport.
// Translate to MotionCard offsets, or convert MotionCard to this system.
function calculateAnchors(numCards:number): coord[] {
    const leftBound = 0
    const width = 400
    const increment = width / numCards;
    const output:coord[] = Array(numCards).fill(makeCoords(0,0))
    return output.map((_, index, )=>{
        const x = leftBound + index * increment;
        return makeCoords(x,0)
    })
}

export default function CardZone(props: ZoneProps) {
    const ref = useRef<HTMLDivElement>(null)
    const zoneData = props.zoneData;
    
    // useEffect( ()=> {recalculate the anchor points based on num cards} , [num_of_cards_in_zone])
    useEffect( ()=>{
        const cards = zoneData.cards
        const newAnchors = calculateAnchors(cards.length);
        zoneData.changeOrigins(cards, newAnchors)   // use given function to update zoneState
    },[zoneData.cards])

    return <motion.div 
            ref={ref} 
            style={{...box,margin:5,padding:15}}>
                <p style={{zIndex:100, position:'absolute'}}>
                    {zoneData.cards}
                </p>
                {props.children}
            </motion.div>

}

/**
 * ==============   Styles   ================
 */

const box: CSSProperties = {
    width: 400,
    height: 250,
    backgroundColor: "#f5f3ddff",
    color:'black',
    borderRadius: 10,
    display:'flex',
}


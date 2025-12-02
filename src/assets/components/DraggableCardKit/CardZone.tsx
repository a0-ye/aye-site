
import {motion } from "motion/react"
import { useEffect, useRef, type CSSProperties, type ReactNode} from "react"
import Droppable from "../dnd-kit-wrappers/droppable";
import { makeCoords, type ZoneData, type coord } from "./CardKitFunctions";

interface ZoneProps{
    zoneData:ZoneData,
    style?: CSSProperties;
    children?: ReactNode;
}


// TODO: calculate absolute coordinates relative to the viewport.
// OPTION 1: calculate anchors (based on viewport coordinates) then convert to a MotionCard origin (based on MotionCard starting position)
// OPTION 2: make all zones and cards positions absolute. Convert MotionCard movement to coordinates. Calculate anchor based on absolute positions

function calculateAnchors(numCards:number, coord: coord): coord[] {
    const width = zoneStyle.width as number;
    const height = zoneStyle.height as number;
    const increment = width / numCards;
    const output:coord[] = Array(numCards).fill(makeCoords(0,0))
    return output.map((_, index, )=>{
        const x = coord.x + index * increment;
        return makeCoords(x,height / 2)
    })
}

export default function CardZone(props: ZoneProps) {
    const ref = useRef<HTMLDivElement>(null)
    const zoneData = props.zoneData;
    const coordPosition = zoneData.position;    // position of the cardzone's top left within the parent div
    const droppableProps = {
        style: droppableStyle,
        drop_id:zoneData.id,
        zonePosition:{
            x:coordPosition.x,
            y:coordPosition.y,
        }
    }

    // useEffect( ()=> {recalculate the anchor points based on num cards} , [num_of_cards_in_zone])
    useEffect( ()=>{
        const cards = zoneData.cards
        const newAnchors = calculateAnchors(cards.length, coordPosition);
        zoneData.changeOrigins(cards, newAnchors)   // use given function to update zoneState
    },[zoneData.cards])

    return <Droppable {...droppableProps}>
                <motion.div ref={ref} style={{...zoneStyle,...props.style,margin:5,padding:15}}>
                    <p style={{zIndex:100, position:'absolute'}}>
                        {zoneData.cards}
                    </p>
                    x: {coordPosition.x}
                    
                    y: {coordPosition.y}
                    {props.children}
                </motion.div>
            </Droppable>

}

/**
 * ==============   Styles   ================
 */

const zoneStyle: CSSProperties = {
    width: 400,
    height: 250,
    // zIndex:2,
    backgroundColor: "#f5f3ddff",
    // opacity:0.5,
    color:'black',
    borderRadius: 10,
    display:'flex',
}

const droppableStyle: CSSProperties = {
    color:"#2f00ffff",
    position:'absolute',
}

import {motion } from "motion/react"
import { useEffect, useRef, useState, type CSSProperties, type ReactNode} from "react"
import Droppable from "../dnd-kit-wrappers/droppable";
import { makeCoords, type ZoneData, type coord } from "./CardKitFunctions";

interface ZoneProps{
    zoneData:ZoneData,
    style?: CSSProperties;
    children?: ReactNode;
}


// calculates coordinates relative to the top left of the CardBounds / Dnd Context. 
// Anchors are currently distributed evenly along the x axis, and in the center of the Zone
function calculateAnchors(numCards:number, zoneData:ZoneData): coord[] {
    const zonePosition = zoneData.position;
    const zoneDimensions = zoneData.dimensions;
    const increment = zoneDimensions.width / (1 + numCards);
    const output:coord[] = Array(numCards).fill(makeCoords(0,0))
    return output.map((_, index, )=>{
        const x = zonePosition.x + (index + 1) * increment;
        const y = zonePosition.y + (zoneDimensions.height / 2);
        return makeCoords(x,y)
    })
}


/**
 * 
 * Position of where the div lives is based on the ZoneData.position
 */
export default function CardZone(props: ZoneProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [currentOrigins, setOrigins] = useState([makeCoords(0,0)])
    const zoneData = props.zoneData;
    const zonePosition = zoneData.position;    // position of the cardzone's top left within the parent div
    const zoneDimensions = zoneData.dimensions;
    const droppableProps = {
        style: droppableStyle,
        drop_id:zoneData.id,
        zonePosition:{
            x:zonePosition.x,
            y:zonePosition.y,
        },
        zoneDimensions: zoneDimensions
    }

    // useEffect( ()=> {recalculate the anchor points based on num cards} , [num_of_cards_in_zone])
    const prevNumCards = useRef<number | null>(null)
    useEffect( ()=>{
        const cards = zoneData.cards
        if (prevNumCards.current && prevNumCards.current == cards.length) {return} // if no change in card amount dont recalc
        else {
            prevNumCards.current = cards.length;
        }
        const newAnchors = calculateAnchors(cards.length, zoneData);
        setOrigins(newAnchors)
        zoneData.changeOrigins(zoneData.id, cards, newAnchors)   // use given function to update zoneState
    },[zoneData.cards])

    function debugShowAnchors(){
        return currentOrigins.map(
            (coord) => { return <div style={{   
                position: 'absolute',
                left:coord.x - zonePosition.x,
                top: coord.y - zonePosition.y,
                width: 10,
                height: 10,
                backgroundColor:"#ff00eaff" , 
                borderRadius: 50,
                // opacity:0.5,
                zIndex:5,
                transform: 'translate(-50%, -50%)'
                }}></div>
            }) 
    }

    // droppable inherently has nothing in it. It flexes to the size of the children,
    // here being whatever width/height our motion.div is
    // Position the Div using Droppable Wrap
    return <Droppable {...droppableProps}>
                <motion.div className="CardZone" ref={ref} style={{...zoneDimensions, ...zoneStyle,...props.style}}>
                    {debugShowAnchors()}
                    <p style={{zIndex:100, position:'absolute'}}>
                        {zoneData.cards}
                    </p>
                    {props.children}
                </motion.div>
            </Droppable>

}

/**
 * ==============   Styles   ================
 */

const zoneStyle: CSSProperties = {
    position:'absolute',
    // width: 400,
    // height: 250,
    backgroundColor: "#f5f3ddff",
    color:'black',
    borderRadius: 10,
    display:'flex',
}

const droppableStyle: CSSProperties = {
    color:"#2f00ffff",
    position:'absolute',
}
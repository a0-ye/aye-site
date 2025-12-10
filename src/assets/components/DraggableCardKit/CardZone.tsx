
import {motion, useAnimate } from "motion/react"
import { useEffect, /** useState , */ type CSSProperties, type ReactNode,} from "react"
import Droppable from "../dnd-kit-wrappers/droppable";
import { makeCoords, type ZoneData, type coord } from "./CardKitFunctions";
import type { UniqueIdentifier } from "@dnd-kit/core";

interface ZoneProps{
    zoneData:ZoneData,
    // disableFlagRef?:RefObject<boolean | undefined>,
    disableFlag?:boolean
    draggedCardStartZone: UniqueIdentifier | null;
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
    const [scope, animate] = useAnimate();
    // const [currentOrigins, setOrigins] = useState([makeCoords(0,0)])
    const zoneData = props.zoneData;
    const zonePosition = zoneData.position;    // position of the cardzone's top left within the parent div
    const zoneDimensions = zoneData.dimensions;
    const droppableProps = {
        style: {
            backgroundColor: props.draggedCardStartZone != zoneData.id ? "#2f00ffff" : undefined,
        },
        drop_id:zoneData.id,
        zonePosition:{
            x:zonePosition.x,
            y:zonePosition.y,
        },
        zoneDimensions: zoneDimensions
    }

    // useEffect( ()=> {recalculate the anchor points based on num cards} , [num_of_cards_in_zone])
    useEffect( ()=>{
        const cards = zoneData.cards
        const newAnchors = calculateAnchors(cards.length, zoneData);
        // setOrigins(newAnchors)
        zoneData.changeOrigins(cards, newAnchors)   // use given function to update zoneState
        
    },[zoneData.cards])

    // function debugShowAnchors(){
    //     return currentOrigins.map(
    //         (coord) => { return <div style={{   
    //             position: 'absolute',
    //             left:coord.x - zonePosition.x,
    //             top: coord.y - zonePosition.y,
    //             width: 10,
    //             height: 10,
    //             backgroundColor:"#ff00eaff" , 
    //             borderRadius: 50,
    //             opacity:0,
    //             zIndex:5,
    //             transform: 'translate(-50%, -50%)'
    //             }}></div>
    //         }) 
    // }

    useEffect(()=>{
        if (props.disableFlag){
            animate([
                [scope.current, zoneVariants.disabled, {duration:0.1}]
            ])
        } else {
            animate([
                [scope.current, zoneVariants.initial, {duration:0.1}]
            ])
        }
    },[props.disableFlag])

    const mergedStyle = Object.assign({...zoneStyle}, props.style) // override props if exists

    // droppable inherently has nothing in it. It flexes to the size of the children,
    // here being whatever width/height our motion.div is
    // Position the Div using Droppable Wrap
    return <Droppable {...droppableProps}>
                <motion.div className="CardZone" 
                ref={scope} 
                initial={'initial'}
                style={{...zoneDimensions, ...mergedStyle}}>
                    {/* {debugShowAnchors()}
                    <p style={{zIndex:100, }}>{zoneData.cards}</p> */}
                    {props.children}
                </motion.div>
            </Droppable>

}

/**
 * ==============   Styles   ================
 */

const zoneVariants = {
    initial:{
        opacity:1,
    },
    active:{
        opacity:1,

    },
    disabled:{
        opacity:0,
    }
}


const zoneStyle: CSSProperties = {
    position:'absolute',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',

    // width: 400,
    // height: 250,
    backgroundColor: "#29292957",
    color:'black',
    borderRadius: 10,
    
}

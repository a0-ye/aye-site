import React, { useState, useRef} from "react";
// import './PageCard.css'


import Tilt from 'react-parallax-tilt';
import { animated, useSpring, useChain } from '@react-spring/web'


interface SpringPageCardProps {
    id: number;
    activeCard: number;
    thumbnail?: React.ReactNode; // html content for minimized
    content: React.ReactNode;   // html content for expanded
    onClick?: () => void;
}


/**
 * A card that when clicked, moves to the center of the screen, then expands to display more detailed content
 * 
 * 
 * Achieved using React Spring.
 *  useChain allows for chaining animations together.
 */
 export default function SpringPageCard(props:SpringPageCardProps) {
    // const [open, set] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const cardWidth = 80;
    const cardHeight = 80;
    const [isCentered, setIsCentered] = useState(false);
    const [springs, api] = useSpring( () => ({
        from: {x:0, y:0, width:cardWidth, height:cardHeight, zIndex:0}, // transform: 'scale(1)'
    }))

    const triggerSpring = () => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;


        if (!isCentered) {
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            const dx = centerX - cardCenterX;
            const dy = centerY - cardCenterY;
            console.log(centerX, centerY);
            
            api.start({
                // every animation transformation is relative to the div's current position
                to:[
                    {x: dx, y: dy,zIndex:100},
                    // {transform: 'scale(5)'},
                    // { x: -(cardWidth),},
                    { width:cardWidth*5, height:cardHeight*5},

                ]
                
                });
        } else {
            // change this trigger to be tied to some button instead of onclick?
            api.start({ x: 0, y: 0, width:cardWidth, height:cardHeight,zIndex:0});
        }

        setIsCentered(!isCentered);
    };


    return <animated.div className='SpringPageCard'
        onClick={triggerSpring}
        ref={cardRef}
        style = {{
            background: '#915dccff',
            borderRadius: 8,
            ...springs
        }}
    >
        {isCentered ? props.content : <Tilt>{props.thumbnail}</Tilt>}
    </animated.div>
    
}


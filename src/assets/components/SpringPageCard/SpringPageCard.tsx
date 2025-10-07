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
 * A card that when clicked, moves to the center of the screen, then grows in size, now displaying more detailed content
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
        from: {x:0, y:0, scale: [1,1], size: '20%'},
    }))

    const triggerSpring = () => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        if (!isCentered) {
            const dx = centerX - cardCenterX;
            const dy = centerY - cardCenterY;
            api.start({ x: dx, y: dy, scale: 9 });
        } else {
            api.start({ x: 0, y: 0, scale: 1 });
        }

        setIsCentered(!isCentered);
    };


    return <animated.div className='SpringPageCard'
        onClick={triggerSpring}
        ref={cardRef}
        style = {{
            width:cardWidth,
            height:cardHeight,
            
            background: '#915dccff',
            borderRadius: 8,
            ...springs
        }}
    >
        {isCentered ? props.content : props.thumbnail}
    </animated.div>
    
}


import React, { useEffect } from "react";
import './PageCard.css'


import Tilt from 'react-parallax-tilt';


interface PageCardProps {
    id: number;
    activeCard: number;
    thumbnail?: React.ReactNode; // html content for minimized
    content: React.ReactNode;   // html content for expanded
    // maybe put a button from parent 
    onClick?: () => void;
}

const PageCard = (props: PageCardProps) => {
    if(props.id === props.activeCard){

        return (
                <div className='container grown'>
                    {props.content}
                </div>
        )

    } else{
        return (
            <Tilt>
                <div 
                    className='container'
                    onClick = {props.onClick}
                >
                    {props.thumbnail}
                    <p></p>
                    <> ID:{props.id}</>
                </div>
            </Tilt>
            )
    }
    
}

export default PageCard



// interface ExpandingCardsProps{
//     data: Array<PageCard>;
// }

// const ExpandingCards = ({data}: ExpandingCardsProps) => {

//     return <div>{data}</div>
// }

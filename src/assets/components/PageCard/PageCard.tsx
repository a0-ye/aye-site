import React from "react";
import './PageCard.css'

interface PageCardProps {
    id: number;
    activeCard: number;
    thumbnail?: React.ReactNode; // html content for minimized
    content: React.ReactNode;   // html content for expanded
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
                <div 
                    className='container'
                    onClick = {props.onClick}
                >
                    {props.thumbnail}
                    <p></p>
                    <> ID:{props.id}</>
                </div>
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

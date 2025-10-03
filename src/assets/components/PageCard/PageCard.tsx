import React from "react";
import './PageCard.css'

interface PageCardProps {
    id: number;
    expanded: boolean;  // 0 or 1
    content: React.ReactNode;   // html content
    onClick?: () => void;
}

const PageCard = (props: PageCardProps) => {
    if(props.expanded){

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
                    click me! {props.id}
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

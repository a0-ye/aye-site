import type { UniqueIdentifier } from "@dnd-kit/core";
import './LeftPanel.css'
import MotionCard from "../DraggableCardKit/MotionCard";
import { useId } from "react";

interface panelProps {
    activeCard:UniqueIdentifier | null
}
export default function LeftPanel (props: panelProps) {
    const tokenID = useId();
    const activeCard = props.activeCard
    return <div className='left-panel'>
        
        <div className='panel-box'>
            <div id='blind-header'>hello! THIS IS A WIP</div>
            <div id='blind-body'>
                <div id="token-container">
                    <MotionCard
                        cardData={{id:tokenID, zone:tokenID, origin:{x:0,y:0}}}
                        style={{top:"50%",left:'50%',
                            width:75,
                            height:75,
                            backgroundColor:'transparent',
                            borderRadius:50,
                            borderColor:'transparent',
                            backgroundImage:'url("img/sprout-token.png")',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                            backgroundSize:'contain',
                        }}
                    >
                        {/* <img src="public/img/sprout-token.png"></img> */}
                    </MotionCard>
                </div>
                <div className="panel-text">
                    headlineinfo. owns a nerd certificate
                </div>
            </div>
        </div>

        <div id='score-box' className='panel-box'>
            <div id='score-text' className='panel-text' >Score:</div>
            <div className='panel-value'> 67</div>
        </div>

        <div id='hand-box' className='panel-box'>
            <div className='panel-text'>Active Card:</div>
            <div className='panel-value'>{activeCard ? activeCard : " Drag some cards!" }</div>
        </div>
        
        <div id='buttons-n-numbers-grid' >
            <div id='panel-button-container'>
                <button className='panel-button'> runinfo </button>
                <button className='panel-button'> options </button>
            </div>
            <div id='numbers-container'>
                <div id='hand-discard-container' className='duo-val-container'>
                <div className='panel-box'>
                    <div className='panel-text'>hands:</div>
                    <div className='panel-value'>4</div>
                </div>
                <div className='panel-box'>
                    <div className='panel-text'> discards:</div>
                    <div className='panel-value'>3</div>
                </div>
                </div>
                <div className='panel-box'>
                <div className='panel-value' >$money</div>
                </div>
                <div id='ante-round-container' className='duo-val-container'>
                <div className='panel-box'>
                    <div className='panel-text'> Ante: </div>
                    <div className='panel-value'> 2/8  </div>
                </div>
                <div className='panel-box'>
                    <div className='panel-text'> Round:</div>
                    <div className='panel-value'>1   </div>
                </div>
                </div>
            </div>
        </div>

    </div>
}

function useID() {
    throw new Error("Function not implemented.");
}

import type { UniqueIdentifier } from "@dnd-kit/core";
import './LeftPanel.css'
import MotionCard from "../DraggableCardKit/MotionCard";
import { BLANK_CARD_DATA, type CardMap } from "../DraggableCardKit/CardKitFunctions";

interface panelProps {
    activeCard:UniqueIdentifier,
    cardsData:CardMap,
    setActiveCard:Function
    setShowSettings:Function,
    setShowInfo:Function,
}

export default function LeftPanel (props: panelProps) {
    const activeCard = props.activeCard
    return <div className='left-panel'>
        <button style={{
                    zIndex: 10,
                }} onClick={() => { props.setActiveCard?.(BLANK_CARD_DATA); }}> DEBUG Close Card</button>
        <div className='panel-box'>
            <div className='blind-header'>Adrian Ye</div>
            <div id='blind-body'>
                <div id="token-container">
                    <MotionCard
                        cardData={BLANK_CARD_DATA}
                        cardContent={{cardBack:"img/sprout-token.png"}}
                        style={{top:"50%",left:'50%',
                            width:75,
                            height:75,
                            backgroundColor:'transparent',
                            borderRadius:50,
                            borderColor:'transparent',
                        }}
                    >
                        {/* <img src="public/img/sprout-token.png"></img> */}
                    </MotionCard>
                </div>
                <div className="panel-text">
                    B.S. Computer Science & Engineering
                </div>
            </div>
        </div>

        <div id='score-box' className='panel-box'>
            <div id='score-text' className='panel-text' >Score:</div>
            <div className='panel-value'> 67</div>
        </div>

        <div id='hand-box' className='panel-box'>
            <div className='panel-text'>Active Card:</div>
            <div className='panel-value'>{activeCard != "" ? props.cardsData[activeCard].cardContent.cardHoverInfo : " Drag some cards!" }</div>
        </div>
        
        <div id='buttons-n-numbers-grid' >
            <div id='panel-button-container'>
                <button className='panel-button' onClick={()=>props.setShowInfo(true)}> runinfo </button>
                <button className='panel-button' onClick={()=>props.setShowSettings(true)}> options </button>
            </div>
            <div id='numbers-container'>
                <div id='hand-discard-container' className='duo-val-container'>
                    <div className='panel-box'>
                        <div className='panel-text'>hands:</div>
                        <div className='panel-value'>4</div>
                    </div>
                    <div className='panel-box'>
                        <div className='panel-text'>    discards:  </div>
                        <div className='panel-value'>   3          </div>
                    </div>
                </div>
                <div className='panel-box'>
                    <div className='panel-value' >$broke :sob: </div>
                </div>
                <div id='ante-round-container' className='duo-val-container'>
                    <div className='panel-box'>
                        <div className='panel-text'> GPA: </div>
                        <div className='panel-value'> 3.65  </div>
                    </div>
                    <div className='panel-box'>
                        <div className='panel-text'> Round: </div>
                        <div className='panel-value'>1      </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
}

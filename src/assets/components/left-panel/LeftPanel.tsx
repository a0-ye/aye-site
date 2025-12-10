import type { UniqueIdentifier } from "@dnd-kit/core";
import './LeftPanel.css'

interface panelProps {
    activeCard:UniqueIdentifier | null
}

export default function LeftPanel (props: panelProps) {
    const activeCard = props.activeCard
    return <div className='left-panel'>
        
        <div className='panel-box'>
            <div id='blind-header'>hello! THIS IS A WIP</div>
            <div id='blind-body'>
                token, headlineinfo. owns a nerd certificate; sexy
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
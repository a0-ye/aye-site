import type { CSSProperties, ReactNode } from "react";
import './stickynote.css'

interface StickyNoteProps {
    children?: ReactNode
    noteStyle?:CSSProperties
    tapeStyle?:CSSProperties
}

export default function StickyNote(props: StickyNoteProps) {
    return (
        <div className='sticky' style={props.noteStyle}>
            <div className='tape' style={props.tapeStyle}/>
            {props.children}
        </div>
    )

}
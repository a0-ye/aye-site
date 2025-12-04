import { type CSSProperties, type ReactNode } from 'react';
import {useDraggable, type UniqueIdentifier} from '@dnd-kit/core';

interface draggableProps{
  drag_id: UniqueIdentifier
  style?: CSSProperties
  children?: ReactNode
}

/**
 * Wrapper to make something draggable. DOES NOT SHOW THE ANIMATION / TRANSFORMATIONS, should be 
 * handled separately by Motion api
 */
export default function Draggable(props: draggableProps) {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: props.drag_id,
  });

  
  return (
    <div className='draggable-wrap' ref={setNodeRef} {...listeners} {...attributes} style={{...props.style, ...draggableStyle}}>
      {props.children}
    </div>
  );

  
}
const draggableStyle: CSSProperties = {
    width:'100%',height:'100%',
    backgroundColor:'#ff4ca6ff',
    opacity:0,
    position:'absolute',
    // pointerEvents:'none',
  }
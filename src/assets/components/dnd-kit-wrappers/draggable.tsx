import React, { type ReactNode } from 'react';
import {useDraggable, type UniqueIdentifier} from '@dnd-kit/core';

interface draggableProps{
  drag_id: UniqueIdentifier
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
    <div ref={setNodeRef} {...listeners} {...attributes} style={{width:'100%',height:'100%',}}>
      {props.children}
    </div>
  );
}
import React, { type CSSProperties, type ReactNode } from 'react';
import {useDroppable, type UniqueIdentifier} from '@dnd-kit/core';

interface droppableProps {
  drop_id:UniqueIdentifier,
  zonePosition:{
      x:number,
      y:number,
  }
  children?:ReactNode,
}

export default function Droppable(props: droppableProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.drop_id,
  });
  const style: CSSProperties = {
    left:props.zonePosition.x,
    top:props.zonePosition.y,
    backgroundColor: isOver ? 'green' : "#ffff65ff",
    color:"#2f00ffff",
    position:'absolute',
  };
  
  
  return (
    <div ref={setNodeRef} style={{...style}}>
      {props.zonePosition.x}
      {props.zonePosition.y}
      {props.children}
    </div>
  );
}
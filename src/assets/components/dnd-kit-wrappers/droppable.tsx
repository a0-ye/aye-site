import { type CSSProperties, type ReactNode } from 'react';
import {useDroppable, type UniqueIdentifier} from '@dnd-kit/core';

interface droppableProps {
  drop_id:UniqueIdentifier,
  zonePosition:{
      x:number,
      y:number,
  }
  zoneDimensions: {width:number, height:number},
  style?: CSSProperties,
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

  };
  
  
  return (
    <div className="droppable-wrap" ref={setNodeRef} style={{...props.zoneDimensions, ...style, ...props.style}}>
      {props.children}
    </div>
  );
}
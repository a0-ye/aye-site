import { type CSSProperties, type ReactNode } from 'react';
import {useDroppable, type UniqueIdentifier} from '@dnd-kit/core';

interface droppableProps {
  drop_id:UniqueIdentifier,
  zonePosition:{
      x:number,
      y:number,
  }
  zoneDimensions: {width:number, height:number},
  disableFlag?:boolean,
  style?: CSSProperties,
  children?:ReactNode,
}
 

export default function Droppable(props: droppableProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.drop_id,
  });  


   const style: CSSProperties = {
    position:'absolute',
    left:props.zonePosition.x,
    top:props.zonePosition.y,
    backgroundColor: (isOver) ? props.style?.backgroundColor : undefined,
    borderRadius:10,
  };
  
  
  return (
    <div className="droppable-wrap" ref={setNodeRef} style={{...props.zoneDimensions, ...style}}>
      {props.children}
    </div>
  );
}
import React, { type ReactNode } from 'react';
import {useDroppable} from '@dnd-kit/core';

export default function Droppable(props: {drop_id: number, children:ReactNode}) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.drop_id,
  });
  const style = {
    backgroundColor: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
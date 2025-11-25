import React, { type ReactNode } from 'react';
import {useDroppable, type UniqueIdentifier} from '@dnd-kit/core';

interface droppableProps {
  drop_id: UniqueIdentifier,
  children:ReactNode,
}

export default function Droppable(props: droppableProps) {
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
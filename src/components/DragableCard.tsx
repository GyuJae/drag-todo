import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  height: 50px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IDragableCard {
  toDo: string;
  toDoId: number;
  index: number;
}

const DragableCard: React.FC<IDragableCard> = ({ toDo, index, toDoId }) => {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
        <Card
          ref={innerRef}
          isDragging={isDragging}
          {...draggableProps}
          {...dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragableCard);

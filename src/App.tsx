import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setToDos((allToDos) => {
        const toDosCopy = [...allToDos[source.droppableId]];
        const taskObj = toDosCopy[source.index];
        toDosCopy.splice(source.index, 1);
        toDosCopy.splice(destination?.index as number, 0, taskObj);
        return {
          ...allToDos,
          [source.droppableId]: toDosCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allToDos) => {
        const sourceCopy = [...allToDos[source.droppableId]];
        const taskObj = sourceCopy[source.index];
        const destCopy = [...allToDos[destination.droppableId]];
        sourceCopy.splice(source.index, 1);
        destCopy.splice(destination?.index as number, 0, taskObj);
        return {
          ...allToDos,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destCopy,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

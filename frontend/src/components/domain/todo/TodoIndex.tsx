import initialData from "./data";
import { useState } from "react";
import Column from "./Column";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import {InitData} from "./dataTypes";
import {DragStart, DragUpdate, DropResult} from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
`;

const TodoIndex = () => {
  const [state, setState] = useState<InitData>(initialData);
  const [homeIndex, setHomeIndex] = useState<number | null>(0);
  const onDragStart = (start: DragStart): void => {
    setHomeIndex(state.columnOrder.indexOf(start.source.droppableId));

    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.2s ease";
  };

  const onDragUpdate = (update: DragUpdate) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const onDragEnd = (result: DropResult) => {
    setHomeIndex(null);

    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const column = state.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColum = {
        ...column,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: { ...state.columns, [newColum.id]: newColum },
        // 무슨 문법인지 알아볼것 -> 계산된 속성이름 구조 분해 (computed property name)
        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      };
      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };
  return (
    <div>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        <StrictModeDroppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId]
                );
                const isDropDisabled = homeIndex == null ? false: index < homeIndex;
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    isDropDisabled={isDropDisabled}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
};

export default TodoIndex;

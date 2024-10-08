import { createReducer, on } from '@ngrx/store';
import { boardAdapter, initialBoardState } from '../board.state';
import {
  addBoard,
  addTask,
  deleteBoard,
  deleteTask,
  loadBoards,
  loadBoardsError,
  loadBoardsSuccess,
  moveTask,
  reorderTasks,
  updateBoard,
  updateSubTask,
  updateTask,
  updateTaskStatus,
} from '../actions/board.actions';
import { Task } from '../../../models/app.model';

export const boardReducer = createReducer(
  initialBoardState,
  //   CREATE
  on(addBoard, (state, { board }) => boardAdapter.addOne(board, state)),

  //   READ
  on(loadBoards, (state) => ({ ...state, isLoading: true })),
  on(loadBoardsSuccess, (state, { boards }) =>
    boardAdapter.setAll(boards, state)
  ),

  on(loadBoardsError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  //   UPDATE
  on(updateBoard, (state, { board }) =>
    boardAdapter.updateOne({ id: board.id, changes: board }, state)
  ),

  //   DELETE
  on(deleteBoard, (state, { boardId }) =>
    boardAdapter.removeOne(boardId, state)
  ),

  // TASKS

  //   CREATE
  on(addTask, (state, { boardId, columnName, task }) => {
    const board = state.entities[boardId];

    if (!board) return state;

    const updatedColumns = board.columns.map((column) => {
      if (column.name === columnName) {
        return {
          ...column,
          tasks: [...column.tasks, task] as Task[], // Add task to column's task array
        };
      }
      return column;
    });

    const updatedBoard = {
      ...board,
      columns: updatedColumns,
    };

    return boardAdapter.updateOne(
      { id: boardId, changes: updatedBoard },
      state
    );
  }),

  //   UPDATE
  on(updateTask, (state, { boardId, columnName, task }) => {
    const board = state.entities[boardId];
  
    if (!board) return state;
  
    // Find the column where the task belongs
    const columnsWithUpdatedTask = board.columns.map((column) => {
      if (column.name === task.status) {
        // Find the task that needs to be updated within this column
        const updatedTasks = column.tasks.map((existingTask) => {
          if (existingTask.id === task.id) {
            // Replace the task with the updated version (including updated subtasks)
            return { ...task };
          }
          return existingTask;
        });
  
        return {
          ...column,
          tasks: updatedTasks,
        };
      }
      return column;
    });
  
    // Create the updated board with the modified columns
    const updatedBoard = {
      ...board,
      columns: columnsWithUpdatedTask,
    };
  
    return boardAdapter.updateOne(
      { id: boardId, changes: updatedBoard },
      state
    );
  }),
  
  on(updateTaskStatus, (state, { boardId, columnName, task }) => {
    const board = state.entities[boardId];

    if (!board) return state;

    //  Remove the task from its original column
    const updatedColumns = board.columns.map((column) => {
      if (column.name === columnName) {
        const updatedTasks = column.tasks.filter((t) => t.id !== task.id);
        return {
          ...column,
          tasks: updatedTasks,
        };
      }
      return column;
    });

    // Add the task to the new column (based on its updated status)
    const columnsWithUpdatedTask = updatedColumns.map((column) => {
      if (column.name === task.status) {
        return {
          ...column,
          tasks: [...column.tasks, task], // Append the updated task while preserving the other tasks
        };
      }
      return column;
    });

    // Create the updated board with the modified columns
    const updatedBoard = {
      ...board,
      columns: columnsWithUpdatedTask,
    };

    return boardAdapter.updateOne(
      { id: boardId, changes: updatedBoard },
      state
    );
  }),




  //   DELETE
  on(deleteTask, (state, { boardId, columnName, taskId }) => {
    const board = state.entities[boardId];

    if (!board) return state;

    const updatedColumns = board.columns.map((column) => {
      if (column.name === columnName) {
        const updatedTasks = column.tasks.filter((task) => task.id !== taskId);
        return {
          ...column,
          tasks: updatedTasks,
        };
      }
      return column;
    });

    const updatedBoard = {
      ...board,
      columns: updatedColumns,
    };

    return boardAdapter.updateOne(
      { id: boardId, changes: updatedBoard },
      state
    );
  }),

  // SUBTASKS
  on(updateSubTask, (state, { boardId, columnName, task }) => {
    const board = state.entities[boardId];
  
    if (!board) return state;
  
    // Find the column where the task belongs
    const columnsWithUpdatedTask = board.columns.map((column) => {
      if (column.name === task.status) {
        // Find the task that needs to be updated within this column
        const updatedTasks = column.tasks.map((existingTask) => {
          if (existingTask.id === task.id) {
            // Replace the task with the updated version (including updated subtasks)
            return { ...task };
          }
          return existingTask;
        });
  
        return {
          ...column,
          tasks: updatedTasks,
        };
      }
      return column;
    });
  
    // Create the updated board with the modified columns
    const updatedBoard = {
      ...board,
      columns: columnsWithUpdatedTask,
    };
  
    return boardAdapter.updateOne(
      { id: boardId, changes: updatedBoard },
      state
    );
  }),

  on(
    reorderTasks,
    (state, { boardId, columnName, previousIndex, currentIndex }) => {
      return boardAdapter.updateOne(
        {
          id: boardId,
          changes: {
            columns: state.entities[boardId]?.columns.map((column) => {
              if (column.name === columnName) {
                const newTasks = [...column.tasks];
                const [movedTask] = newTasks.splice(previousIndex, 1);
                newTasks.splice(currentIndex, 0, movedTask);
                return { ...column, tasks: newTasks };
              }
              return column;
            }),
          },
        },
        state
      );
    }
  ),
  on(
    moveTask,
    (
      state,
      {
        boardId,
        sourceColumnName,
        destinationColumnName,
        previousIndex,
        currentIndex,
      }
    ) => {
      return boardAdapter.updateOne(
        {
          id: boardId,
          changes: {
            columns: state.entities[boardId]?.columns.map((column) => {
              if (column.name === sourceColumnName) {
                const newTasks = [...column.tasks];
                const [movedTask] = newTasks.splice(previousIndex, 1);
                return { ...column, tasks: newTasks };
              }
              if (column.name === destinationColumnName) {
                const newTasks = [...column.tasks];
                newTasks.splice(
                  currentIndex,
                  0,
                  state.entities[boardId]?.columns.find(
                    (c) => c.name === sourceColumnName
                  )?.tasks[previousIndex]!
                );
                return { ...column, tasks: newTasks };
              }
              return column;
            }),
          },
        },
        state
      );
    }
  )
  
);

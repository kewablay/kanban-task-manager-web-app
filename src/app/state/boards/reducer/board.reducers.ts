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
  updateBoard,
  updateTask,
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

    // Step 1: Remove the task from its original column
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

    // Step 2: Add the task to the new column (based on its updated status)
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
  })
);

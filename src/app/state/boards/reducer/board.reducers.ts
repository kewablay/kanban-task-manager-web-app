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

    const updatedColumns = board.columns.map(column => {
      if (column.name === columnName) {
        const updatedTasks = column.tasks.map(t => 
          t.id === task.id ? { ...t, ...task } : t
        );
        return {
          ...column,
          tasks: updatedTasks
        };
      }
      return column;
    });

    const updatedBoard = {
      ...board,
      columns: updatedColumns
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

    const updatedColumns = board.columns.map(column => {
      if (column.name === columnName) {
        const updatedTasks = column.tasks.filter(task => task.id !== taskId);
        return {
          ...column,
          tasks: updatedTasks
        };
      }
      return column;
    });

    const updatedBoard = {
      ...board,
      columns: updatedColumns
    };

    return boardAdapter.updateOne(
      { id: boardId, changes: updatedBoard },
      state
    );
  })
);

import { createReducer, on } from '@ngrx/store';
import { boardAdapter, initialBoardState } from '../board.state';
import {
  addBoard,
  deleteBoard,
  loadBoards,
  loadBoardsError,
  loadBoardsSuccess,
  updateBoard,
} from '../actions/board.actions';

export const boardReducer = createReducer(
  initialBoardState,
  //   CREATE
  on(addBoard, (state, {board}) => boardAdapter.addOne(board, state)),

  //   READ
  on(loadBoards, (state) => ({ ...state, isLoading: true })),
  on(loadBoardsSuccess, (state, { boards }) => boardAdapter.setAll(boards, state)),

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
  )
);

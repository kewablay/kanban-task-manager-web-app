import { createFeatureSelector, createSelector } from '@ngrx/store';
import { boardAdapter, BoardState } from '../board.state';

export const selectBoardState = createFeatureSelector<BoardState>('boards');

export const {
  selectAll: selectBoards,
  selectEntities: selectBoardEntities,
  selectIds: selectBoardIds,
  selectTotal: selectBoardTotal,
} = boardAdapter.getSelectors(selectBoardState);

export const selectBoardLoading = createSelector(
  selectBoardState,
  (state) => state.isLoading
);

export const selectBoardError = createSelector(
  selectBoardState,
  (state) => state.error
);

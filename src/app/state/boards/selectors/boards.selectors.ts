import { createFeatureSelector, createSelector } from '@ngrx/store';
import { boardAdapter, BoardState } from '../board.state';
import { selectRouteParams } from '../../router.selectors';

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

export const selectBoardById = (id: string) =>
  createSelector(selectBoardEntities, (entities) => entities[id]);

export const selectBoardWithParamId = createSelector(
  selectBoardEntities,
  selectRouteParams,
  (boards, params) => {
    const id = params['id'];
    return id ? boards[id] : null;
  }
);

export const selectFirstBoardId = createSelector(
  selectBoardIds,
  (ids) => ids[0] || null
);

export const selectNextBoardId = createSelector(selectBoardIds, (ids) =>
  ids.length > 0 ? Math.max(...(ids as number[])) + 1 : -1
);

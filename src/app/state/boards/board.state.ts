import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Board } from '../../models/app.model';

export interface BoardState extends EntityState<Board> {
  boards: Board[];
  isLoading: boolean;
  error: string | null;
}

export const boardAdapter: EntityAdapter<Board> = createEntityAdapter<Board>({
  selectId: (board: Board) => board.id,
  sortComparer: false,
});

export const initialBoardState: BoardState = boardAdapter.getInitialState({
  boards: [],
  isLoading: false,
  error: null,
});

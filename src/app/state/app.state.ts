import { BoardState } from './boards/board.state';
import { ThemeState } from './theme/reducer/theme.reducers';

export interface AppState {
  boards: BoardState;
  theme: ThemeState;
}

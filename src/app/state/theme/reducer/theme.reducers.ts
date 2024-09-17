import { createReducer, on } from '@ngrx/store';
import { setTheme, toggleTheme } from '../actions/theme.actions';

export interface ThemeState {
  theme: string;
}

export const initialState: ThemeState = {
  theme: 'light',
};

export const themeReducer = createReducer(
  initialState,
  on(toggleTheme, (state) => ({
    ...state,
    theme: state.theme === 'light' ? 'dark' : 'light',
  })),
  on(setTheme, (state, { theme }) => ({ ...state, theme }))
);

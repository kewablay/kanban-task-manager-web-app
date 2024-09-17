import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ThemeState } from './theme.reducers';

const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectCurrentTheme = createSelector(
  selectThemeState,
  (state: ThemeState) => state.theme
);

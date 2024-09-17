import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { LocalStorageService } from '../../../services/localStorageService/local-storage.service';
import { loadTheme, setTheme, toggleTheme } from '../actions/theme.actions';

@Injectable()
export class themeEffect {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService
  ) {}

  toggleTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(toggleTheme),
        tap(() => {
          const currrentTheme = this.localStorageService.getItem('theme');
          const newTheme = currrentTheme === 'light' ? 'dark' : 'light';
          this.localStorageService.setItem('theme', newTheme);
          document.documentElement.setAttribute('data-theme', newTheme);
        })
      ),
    { dispatch: false }
  );

  loadTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTheme),
      map(() => {
        const currrentTheme = this.localStorageService.getItem('theme');
        if (currrentTheme === null) {
          this.localStorageService.setItem('theme', 'light');
          const theme = 'light';
          document.documentElement.setAttribute('data-theme', theme);

          return setTheme({ theme });
        } else {
          const theme = currrentTheme;
          document.documentElement.setAttribute('data-theme', theme);
          return setTheme({ theme });
        }
      })
    )
  );
}

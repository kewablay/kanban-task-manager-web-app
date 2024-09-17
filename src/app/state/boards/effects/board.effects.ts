import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '../../../services/localStorageService/local-storage.service';
import { DataService } from '../../../services/data-service/data.service';
import { loadBoards, loadBoardsSuccess, test } from '../actions/board.actions';
import { map, mergeMap, of, switchMap, tap } from 'rxjs';

@Injectable()
export class BoardEffects {
  constructor(
    private dataService: DataService,
    private actions$: Actions,
    private localStorageService: LocalStorageService
  ) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBoards),
      mergeMap(() => {
        const localBoards = this.localStorageService.getItem('boards');

        if (localBoards) {
          return of(loadBoardsSuccess({ boards: localBoards }));
        } else {
          return this.dataService.fetchData().pipe(
            tap((data) => console.log('data from server ', data)),
            map((boards) => {
              this.localStorageService.setItem('boards', boards);
              return loadBoardsSuccess({ boards });
            })
          );
        }
      })
    )
  );
}

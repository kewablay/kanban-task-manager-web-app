import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '../../../services/localStorageService/local-storage.service';
import { DataService } from '../../../services/data-service/data.service';
import { addBoard, addTask, deleteBoard, deleteTask, loadBoards, loadBoardsSuccess, updateSubTask, updateTaskStatus } from '../actions/board.actions';
import { map, mergeMap, of, switchMap, tap } from 'rxjs';
import { selectBoards } from '../selectors/boards.selectors';
import { select, Store } from '@ngrx/store';

@Injectable()
export class BoardEffects {
  constructor(
    private dataService: DataService,
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private store: Store
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

  updateLocaStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        addBoard,
        deleteBoard,
        addTask,
        updateTaskStatus,
        deleteTask,
        updateSubTask,
      ),
      switchMap(() =>
        this.store.pipe(
          select(selectBoards),
          tap((boards) => this.localStorageService.setItem('boards', boards))
        )
      )
    ),
    { dispatch: false } // This is the key to prevent the effect from triggering another action
  );

}

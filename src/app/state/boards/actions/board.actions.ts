import { createAction, props } from '@ngrx/store';
import { Board } from '../../../models/app.model';
import { Task } from '../../../models/app.model';
// CREATE
export const addBoard = createAction(
  '[Board] Add Board',
  props<{ board: Board }>()
);

// READ
export const loadBoards = createAction('[Board] Load Boards');
export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: Board[] }>()
);
export const loadBoardsError = createAction(
  '[Board] Load Boards Error',
  props<{ error: string }>()
);

// UPDATE
export const updateBoard = createAction(
  '[Board] Update Board',
  props<{ board: Partial<Board> & { id: number } }>()
);

// DELETE
export const deleteBoard = createAction(
  '[Board] Delete Board',
  props<{ boardId: number }>()
);

// ACTIONS FOR TASKS

// CREATE
export const addTask = createAction(
  '[Task] Add task',
  props<{ boardId: number; columnName: string; task: Task }>()
);

// UPDATE
export const updateTask = createAction(
  '[Task] Update task',
  props<{ boardId: number; columnName: string; task: Task }>()
);

// DELETE
export const deleteTask = createAction(
  '[Task] Delete task',
  props<{ boardId: number; columnName: string; taskId: number }>()
);

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
export const updateTaskStatus = createAction(
  '[Task] Update Subtask',
  props<{ boardId: number; columnName: string; task: Task }>()
);
export const updateTask = createAction(
  '[Task] Update task',
  props<{ boardId: number; columnName: string; task: Task }>()
);

// DELETE
export const deleteTask = createAction(
  '[Task] Delete task',
  props<{ boardId: number; columnName: string; taskId: number }>()
);

// ACTIONS FOR SUBTASKS
export const updateSubTask = createAction(
  '[Subtask] Update subtask',
  props<{ boardId: number; columnName: string; task: Task }>()
);


export const reorderTasks = createAction(
  '[Board] Reorder Tasks',
  props<{
    boardId: number;
    columnName: string;
    previousIndex: number;
    currentIndex: number;
  }>()
);

export const moveTask = createAction(
  '[Board] Move Task',
  props<{
    boardId: number;
    sourceColumnName: string;
    destinationColumnName: string;
    previousIndex: number;
    currentIndex: number;
  }>()
);
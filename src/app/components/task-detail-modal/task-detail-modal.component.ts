import { Component, Input, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectBoardWithParamId,
  selectTask,
} from '../../state/boards/selectors/boards.selectors';
import { Board, Task } from '../../models/app.model';
import { updateTask } from '../../state/boards/actions/board.actions';

@Component({
  selector: 'app-task-detail-modal',
  standalone: true,
  imports: [],
  templateUrl: './task-detail-modal.component.html',
  styleUrl: './task-detail-modal.component.sass',
})
export class TaskDetailModalComponent {
  @Input() task!: Task;
  statuses: string[] = [];
  board$: Observable<Board | null | undefined>;
  boardId: number = 0;
  constructor(private store: Store) {
    // this.task$ = this.store.select(selectTask());
    console.log('task from task detail modal', this.task);
    this.board$ = this.store.select(selectBoardWithParamId);
  }

  ngOnInit() {
    this.board$.subscribe((board) => {
      if (board) {
        this.statuses = [];
        this.boardId = board.id;
        this.statuses = board.columns.map((column) => column.name);
      }
    });

    console.log("TAsk ", this.task)
  }

  updateTask(index: number) {
    // this.task.subtasks[index].isCompleted = !this.task.subtasks[index].isCompleted;
    // const updatedTask = { ...this.task, subtasks: this.task.subtasks[index].isCompleted ? this.task.subtasks.map((subtask) => ({ ...subtask, isCompleted: false })) : this.task.subtasks.map((subtask) => ({ ...subtask, isCompleted: true }))};
    // console.log("update task : ", updateTask)
    this.store.dispatch(
      updateTask({
        boardId: this.boardId,
        columnName: this.task.status,
        task: this.task,
      })
    );

  }

  // updateTaskStatus(event: any) {
  //   console.log(event.target.value);

  //   this.store.dispatch(
  //     updateTask({
  //       boardId: this.boardId,
  //       columnName: event.target.value,
  //       task: {
  //         ...this.task,
  //         status: event.target.value,
  //       },
  //     })
  //   );
  // }

  updateTaskStatus(event: any) {
    const newStatus = event.target.value;
    // console.log("column name: ", )

    this.store.dispatch(
      updateTask({
        boardId: this.boardId,
        columnName: this.task.status, // Old status (current column)
        task: {
          ...this.task,
          status: newStatus, // New status (target column)
        },
      })
    );
  }
}

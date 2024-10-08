import { Component, inject, Input, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBoardWithParamId } from '../../state/boards/selectors/boards.selectors';
import { Board, Subtask, Task } from '../../models/app.model';
import {
  deleteTask,
  updateSubTask,
  updateTaskStatus,
} from '../../state/boards/actions/board.actions';
import { TaskFormComponent } from '../../shared/task-form/task-form.component';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-task-detail-modal',
  standalone: true,
  imports: [TaskFormComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './task-detail-modal.component.html',
  styleUrl: './task-detail-modal.component.sass',
})
export class TaskDetailModalComponent {
  statuses: string[] = [];
  board$: Observable<Board | null | undefined>;
  boardId: number = 0;
  isEditTaskOpen: boolean = false;
  task = inject(DIALOG_DATA);
  private taskDetailModalRef = inject(DialogRef<TaskDetailModalComponent>);

  constructor(private store: Store, public dialog: Dialog) {
    // this.task$ = this.store.select(selectTask());
    // console.log('task from task detail modal', this.task);

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
  }

  updateSubtask(event: any) {
    const isCompleted = event.target.checked;
    const subtaskTitle = event.target.value;

    const updatedSubtask = this.task.subtasks.map((subtask: Subtask) => {
      if (subtask.title === subtaskTitle) {
        return {
          ...subtask,
          isCompleted: isCompleted,
        };
      }
      return subtask;
    });

    this.store.dispatch(
      updateSubTask({
        boardId: this.boardId,
        columnName: this.task.status,
        task: {
          ...this.task,
          subtasks: updatedSubtask,
        },
      })
    );
  }

  updateStatus(event: any) {
    const newStatus = event.target.value;
    // console.log("column name: ", )

    this.store.dispatch(
      updateTaskStatus({
        boardId: this.boardId,
        columnName: this.task.status, // Old status (current column)
        task: {
          ...this.task,
          status: newStatus, // New status (target column)
        },
      })
    );
  }

  openEditTaskModal() {
    this.taskDetailModalRef.close()
    this.dialog.open(TaskFormComponent, {
      width: '85%',
      maxWidth: '480px',
      data: this.task,
    });
  }

  handleDeleteTask(taskId: number) {
    this.taskDetailModalRef.close()
    
    this.dialog.open(DeleteDialogComponent, {
      width: '85%',
      maxWidth: '480px', 
      data: this.task
    })
    // this.store.dispatch(
    //   deleteTask({
    //     boardId: this.boardId,
    //     taskId: taskId,
    //     columnName: this.task.status,
    //   })
    // );
  }
}

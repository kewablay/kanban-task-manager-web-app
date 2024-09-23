import { Component, Input } from '@angular/core';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';
import { Subtask, Task } from '../../models/app.model';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskDetailModalComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.sass',
})
export class TaskComponent {
  @Input() task!: Task;

  constructor(private dialog: Dialog) {}

  showTaskDetail() {
    this.dialog.open(TaskDetailModalComponent, {
      width: '85%',
      maxWidth: '480px',
      data: this.task
    });
  }

  getCompletedSubtasks(subtasks: Subtask[]): number {
    return subtasks.filter(subtask => subtask.isCompleted).length;
  }
}

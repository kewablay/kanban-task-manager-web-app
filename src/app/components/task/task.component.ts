import { Component, Input } from '@angular/core';
import { TaskDetailModalComponent } from "../task-detail-modal/task-detail-modal.component";
import { Task } from '../../models/app.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskDetailModalComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.sass',
})
export class TaskComponent {
  @Input() task!: Task;
}

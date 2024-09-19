import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board, Task } from '../../models/app.model';
import { selectBoardWithParamId } from '../../state/boards/selectors/boards.selectors';
import { addTask, updateTask } from '../../state/boards/actions/board.actions';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.sass',
})
export class TaskFormComponent {
  @Input() task!: Task;
  taskForm: FormGroup;
  // statuses = ['Todo', 'Doing', 'Done'];
  board$: Observable<Board | null | undefined>;
  boardId!: number;
  statuses: string[] = [];

  constructor(private fb: FormBuilder, private store: Store) {
    this.taskForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      subtasks: this.fb.array([this.fb.control(''), this.fb.control('')]),
      status: ['', Validators.required],
    });

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
  initializeSubtasks() {
    const subtasks = this.task?.subtasks || [];
    const subTasksFormControls = subtasks.map((subtask) =>
      this.fb.control(subtask.title, Validators.required)
    );
    return subTasksFormControls;
  }

  // ngOnChanges(simpleChanges: any) {
  //   if (simpleChanges.task) {
  //     this.taskForm = this.fb.group({
  //       title: [this.task.title || '', Validators.required],
  //       description: [this.task.description || '', Validators.required],
  //       subtasks: this.fb.array([
  //         this.fb.control(''),
  //         this.fb.control(''),
  //       ]),
  //       status: [this.task.status || '', Validators.required],
  //     });
  //   }
  // }

  ngOnChanges(simpleChanges: any) {
    if (simpleChanges.task) {
      this.taskForm = this.fb.group({
        title: [this.task.title || '', Validators.required],
        description: [this.task.description || '', Validators.required],
        subtasks: this.fb.array(this.initializeSubtasks()),
        status: [this.task.status || '', Validators.required],
      });
    }
  }

  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubTask() {
    this.subtasks.push(this.fb.control(''));
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  onSubmit() {
    console.log('task value: ', this.taskForm.value);
    const newSubTasks = this.taskForm.value.subtasks.map((subtask: string) => {
      return { title: subtask, isCompleted: false };
    });

    console.log('new subtask : ', this.taskForm.value.subtasks);

    const newTaskData = {
      boardId: this.boardId,
      columnName: this.taskForm.value.status,
      task: {
        ...this.taskForm.value,
        subtasks: newSubTasks,
      },
    };

    console.log('task new value: ', newTaskData);
    if (this.task) {
      newTaskData.task.id = this.task.id;
      this.store.dispatch(updateTask({ ...newTaskData }));
    } else {
      this.store.dispatch(addTask({ ...newTaskData }));
    }
  }
}

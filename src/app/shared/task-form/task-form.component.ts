import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.sass',
})
export class TaskFormComponent {
  taskForm: FormGroup;
  statuses = ['Todo', 'Doing', 'Done'];

  constructor(private fb: FormBuilder, private store: Store) {
    this.taskForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      subtasks: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
      ]),
      status: ['', Validators.required],
    });
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
  }
}

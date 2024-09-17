import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './board-form.component.html',
  styleUrl: './board-form.component.sass',
})
export class BoardFormComponent {
  boardForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.boardForm = this.fb.group({});
  }

  ngOnInit() {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([this.fb.control('')]),
    });
  }

  get columns() {
    return this.boardForm.get('columns') as FormArray;
  }

  addColumn() {
    this.columns.push(this.fb.control(''));
  }

  removeColumn(index: number) {
    this.columns.removeAt(index);
  }
}

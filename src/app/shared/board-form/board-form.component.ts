import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  addBoard,
  updateBoard,
} from '../../state/boards/actions/board.actions';
import { selectNextBoardId } from '../../state/boards/selectors/boards.selectors';
import { Board } from '../../models/app.model';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './board-form.component.html',
  styleUrl: './board-form.component.sass',
})
export class BoardFormComponent {
  boardForm: FormGroup;
  nextBoardId!: number;
  @Input() board!: Board;
  constructor(private fb: FormBuilder, private store: Store) {
    this.boardForm = this.fb.group({});
    this.store
      .select(selectNextBoardId)
      .subscribe((id) => (this.nextBoardId = id));
  }

  ngOnChanges() {
    this.boardForm = this.fb.group({
      name: [this.board.name || "", Validators.required],
      columns: this.fb.array([
        this.fb.control('Todo'),
        this.fb.control('Doing'),
      ]),
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

  // FORM SUBMISSION
  onSubmit() {
    if (this.boardForm.valid) {
      console.log(this.boardForm.value);
      console.log(this.columns.value);

      const newColumns = this.columns.value.map((column: string) => {
        return { name: column, tasks: [] };
      });
      // console.log(newColumns)
      const newBoard = {
        id: this.nextBoardId,
        name: this.boardForm.value.name,
        columns: newColumns,
      };
      // console.log('new Board ', newBoard);

      if (this.board) {
        newBoard.id = this.board.id;
        this.store.dispatch(updateBoard({ board: newBoard }));
      } else {
        this.store.dispatch(addBoard({ board: newBoard }));
      }
    }
  }
}

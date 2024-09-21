import { Component, inject, Input } from '@angular/core';
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
import { Board, Column } from '../../models/app.model';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './board-form.component.html',
  styleUrl: './board-form.component.sass',
})
export class BoardFormComponent {
  board = inject(DIALOG_DATA);
  boardForm: FormGroup;
  nextBoardId!: number;

  // @Input() board!: Board;

  constructor(private fb: FormBuilder, private store: Store) {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([]),
    });
    this.store
      .select(selectNextBoardId)
      .subscribe((id) => (this.nextBoardId = id));

    console.log('dialog data: ', this.board);
  }

  initializeColumns() {
    const columns = this.board?.columns || [];
    const columnFormControls = columns.map((column: Column) =>
      this.fb.control(column.name, Validators.required)
    );
    return columnFormControls;
  }

  ngOnInit() {
    this.boardForm = this.fb.group({
      name: [this.board?.name || '', Validators.required],
      columns: this.fb.array(this.initializeColumns()),
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
  // onSubmit() {
  //   if (this.boardForm.valid) {
  //     console.log(this.boardForm.value);
  //     console.log(this.columns.value);

  //     const newColumns = this.columns.value.map((column: string) => {
  //       return { name: column, tasks: [] };
  //     });
  //     // console.log(newColumns)
  //     const newBoard = {
  //       id: this.nextBoardId,
  //       name: this.boardForm.value.name,
  //       columns: newColumns,
  //     };
  //     // console.log('new Board ', newBoard);

  //     if (this.board) {
  //       newBoard.id = this.board.id;
  //       this.store.dispatch(updateBoard({ board: newBoard }));
  //     } else {
  //       this.store.dispatch(addBoard({ board: newBoard }));
  //     }
  //   }
  // }

  onSubmit() {
    if (this.boardForm.valid) {
      // Map columns from the form and keep tasks if updating an existing board
      const newColumns = this.columns.value.map(
        (columnName: string, index: number) => {
          // If updating, preserve tasks from the existing column
          const existingTasks = this.board?.columns?.[index]?.tasks || [];
          return { name: columnName, tasks: existingTasks };
        }
      );
      const newBoard: Board = {
        id: this.board ? this.board.id : this.nextBoardId, // Use existing ID for update
        name: this.boardForm.value.name,
        columns: newColumns,
      };

      if (this.board) {
        // Update existing board
        this.store.dispatch(updateBoard({ board: newBoard }));
      } else {
        // Create a new board
        this.store.dispatch(addBoard({ board: newBoard }));
      }
    }
  }
}

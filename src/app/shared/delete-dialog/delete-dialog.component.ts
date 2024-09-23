import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  deleteBoard,
  deleteTask,
} from '../../state/boards/actions/board.actions';
import { Router } from '@angular/router';
import { Board } from '../../models/app.model';
import { Observable } from 'rxjs';
import { selectBoardWithParamId } from '../../state/boards/selectors/boards.selectors';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.sass',
})
export class DeleteDialogComponent {
  board$: Observable<Board | null | undefined>;
  boardId: number = 0;
  data = inject(DIALOG_DATA);
  private deletDialogRef = inject(DialogRef<DeleteDialogComponent>);

  constructor(private store: Store, private router: Router) {
    this.board$ = this.store.select(selectBoardWithParamId);
  }

  ngOnInit() {
    this.board$.subscribe((board) => {
      if (board) {
        this.boardId = board.id;
      }
    });
  }

  onDeleteConfirm(id: number) {
    this.deletDialogRef.close(); // Emit confirmation
    // delete data (which can be a board or a task )
    if (this.data.columns) {
      this.store.dispatch(deleteBoard({ boardId: id }));
      this.router.navigate(['/']);
    } else {
      this.store.dispatch(
        deleteTask({
          boardId: this.boardId,
          taskId: id,
          columnName: this.data.status,
        })
      );
    }
  }

  onCancel(): void {
    this.deletDialogRef.close(); // Emit cancellation
  }
}

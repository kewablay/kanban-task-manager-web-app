import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../../models/app.model';
import { selectBoards } from '../../state/boards/selectors/boards.selectors';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toggleTheme } from '../../state/theme/actions/theme.actions';
import { BoardFormComponent } from '../../shared/board-form/board-form.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialogClose } from '@angular/material/dialog';

import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    BoardFormComponent,
    ToggleComponent,
    MatDialogClose,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass',
})
export class SidebarComponent {
  boards$: Observable<Board[]>;
  isAddBoardModalOpen = false;
  constructor(private store: Store, public dialog: Dialog) {
    this.boards$ = this.store.select(selectBoards);
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  openAddBoardModal() {
    this.dialog.open(BoardFormComponent, {
      width: '85%',
      maxWidth: '480px',
    });
  }
}

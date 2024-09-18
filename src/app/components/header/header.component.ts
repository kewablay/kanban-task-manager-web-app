import { Component, Input } from '@angular/core';
import { Board } from '../../models/app.model';
import { AsyncPipe } from '@angular/common';
import { BoardFormComponent } from '../../shared/board-form/board-form.component';
import { Store } from '@ngrx/store';
import { deleteBoard } from '../../state/boards/actions/board.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, BoardFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  @Input() board!: Board;
  isEditBoardModalOpen = false;

  constructor(private store: Store,private router: Router) {}

  openEditBoardModal() {
    this.isEditBoardModalOpen = !this.isEditBoardModalOpen;
  }

  deleteBoard(id: number) {
    this.store.dispatch(deleteBoard({ boardId: id }));
    this.router.navigate(['/']);
  }
}

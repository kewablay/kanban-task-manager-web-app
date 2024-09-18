import { Component, Input } from '@angular/core';
import { Board } from '../../models/app.model';
import { AsyncPipe } from '@angular/common';
import { BoardFormComponent } from '../../shared/board-form/board-form.component';
import { Store } from '@ngrx/store';
import { deleteBoard } from '../../state/boards/actions/board.actions';
import { Router } from '@angular/router';
import { TaskFormComponent } from '../../shared/task-form/task-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, BoardFormComponent, TaskFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  @Input() board!: Board;
  isEditBoardModalOpen: boolean = false;
  isTaskModalOpen: boolean = false;

  constructor(private store: Store, private router: Router) {}

  openEditBoardModal() {
    this.isEditBoardModalOpen = !this.isEditBoardModalOpen;
  }
  openTaskModal() {
    this.isTaskModalOpen = !this.isTaskModalOpen;
  }

  deleteBoard(id: number) {
    this.store.dispatch(deleteBoard({ boardId: id }));
    this.router.navigate(['/']);
  }

}

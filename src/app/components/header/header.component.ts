import { Component, Input } from '@angular/core';
import { Board } from '../../models/app.model';
import { AsyncPipe } from '@angular/common';
import { BoardFormComponent } from '../../shared/board-form/board-form.component';
import { Store } from '@ngrx/store';
import { deleteBoard } from '../../state/boards/actions/board.actions';
import { Router } from '@angular/router';
import { TaskFormComponent } from '../../shared/task-form/task-form.component';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AsyncPipe,
    BoardFormComponent,
    TaskFormComponent,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    DialogModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  @Input() board!: Board;
  isEditBoardModalOpen: boolean = false;
  isTaskModalOpen: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    public dialog: Dialog
  ) {}

  openEditBoardModal() {
    this.dialog.open(BoardFormComponent, {
      width: '85%',
      maxWidth: '480px',
      data: this.board,
    });
  }

  openCreateTaskModal() {
    this.dialog.open(TaskFormComponent, {
      width: '85%',
      maxWidth: '480px',
    });
  }

  openSideBarMenu() {
    this.dialog.open(SidebarComponent, {
      width: '85%',
      maxWidth: '480px',
    });
  }

  deleteBoard(id: number) {
    this.dialog.open(DeleteDialogComponent, {
      width: '85%',
      maxWidth: '480px',
      data: this.board,
    });
    // this.store.dispatch(deleteBoard({ boardId: id }));
    // this.router.navigate(['/']);
  }
}

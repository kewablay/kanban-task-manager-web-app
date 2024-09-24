import { Component, Input } from '@angular/core';
import { Board } from '../../models/app.model';
import { TaskComponent } from "../task/task.component";
import { Dialog } from '@angular/cdk/dialog';
import { BoardFormComponent } from '../../shared/board-form/board-form.component';

@Component({
  selector: 'app-board-content',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './board-content.component.html',
  styleUrl: './board-content.component.sass',
})
export class BoardContentComponent {
  @Input() board!: Board;


  constructor( public dialog: Dialog) {}

  openEditBoardModal() {
    this.dialog.open(BoardFormComponent, {
      width: '85%',
      maxWidth: '480px',
      data: this.board,
    });
  }
}

import { Component, Input } from '@angular/core';
import { Board } from '../../models/app.model';
import { AsyncPipe } from '@angular/common';
import { BoardFormComponent } from '../../shared/board-form/board-form.component';

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

  openEditBoardModal() {
    this.isEditBoardModalOpen = !this.isEditBoardModalOpen;
  }
}

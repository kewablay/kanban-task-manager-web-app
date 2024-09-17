import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBoardWithParamId } from '../../state/boards/selectors/boards.selectors';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { BoardContentComponent } from '../../components/board-content/board-content.component';
import { AsyncPipe } from '@angular/common';
import { BoardFormComponent } from "../../shared/board-form/board-form.component";

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [SidebarComponent, BoardContentComponent, AsyncPipe, BoardFormComponent],
  templateUrl: './board-detail.component.html',
  styleUrl: './board-detail.component.sass',
})
export class BoardDetailComponent {
  board$ = this.store.select(selectBoardWithParamId);
  constructor(private store: Store) {}

  ngOnInit() {
    this.board$.subscribe((board) => {
      console.log('border with params', board);
    });
  }
}

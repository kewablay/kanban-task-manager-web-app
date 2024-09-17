import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBoard } from '../../state/boards/selectors/boards.selectors';

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [],
  templateUrl: './board-detail.component.html',
  styleUrl: './board-detail.component.sass',
})
export class BoardDetailComponent {
  boards$ = this.store.select(selectBoard);
  constructor(private store: Store) {}

  ngOnInit() {
  this.boards$.subscribe((boards) => console.log('boards from store', boards))
  }
}

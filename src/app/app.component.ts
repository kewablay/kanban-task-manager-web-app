import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data-service/data.service';
import { Store } from '@ngrx/store';
import { loadBoards } from './state/boards/actions/board.actions';
import { Observable } from 'rxjs';
import { Board } from './models/app.model';
import { selectBoards } from './state/boards/selectors/boards.selectors';
import { loadTheme } from './state/theme/actions/theme.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  boards$: Observable<Board[]>;
  constructor(private store: Store) {
    this.boards$ = this.store.select(selectBoards);
  }

  ngOnInit() {
    this.store.dispatch(loadBoards());
    this.store.dispatch(loadTheme());
  }

  ngAfterViewInit() {
    this.boards$.subscribe((boards) =>
      console.log('boards from store', boards)
    );
  }
}

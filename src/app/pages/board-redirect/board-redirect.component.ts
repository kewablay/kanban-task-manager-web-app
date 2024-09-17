import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { selectFirstBoardId } from '../../state/boards/selectors/boards.selectors';

@Component({
  selector: 'app-board-redirect',
  standalone: true,
  imports: [],
  templateUrl: './board-redirect.component.html',
  styleUrl: './board-redirect.component.sass',
})
export class BoardRedirectComponent {
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.store
      .select(selectFirstBoardId)
      .subscribe((id) => {
        this.router.navigate(['/board', id]);
      });
  }
}

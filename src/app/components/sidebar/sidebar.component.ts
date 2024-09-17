import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../../models/app.model';
import { selectBoards } from '../../state/boards/selectors/boards.selectors';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass',
})
export class SidebarComponent {
  boards$: Observable<Board[]>;
  constructor(private store: Store) {
    this.boards$ = this.store.select(selectBoards);
  }

}

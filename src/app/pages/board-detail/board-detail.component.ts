import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBoardWithParamId } from '../../state/boards/selectors/boards.selectors';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { BoardContentComponent } from '../../components/board-content/board-content.component';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from "../../components/sidenav/sidenav.component";

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [
    SidebarComponent,
    BoardContentComponent,
    AsyncPipe,
    HeaderComponent,
    MatSidenavModule,
    MatButtonModule,
    SidenavComponent
],
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

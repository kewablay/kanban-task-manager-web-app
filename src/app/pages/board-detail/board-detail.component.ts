import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBoard } from '../../state/boards/selectors/boards.selectors';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './board-detail.component.html',
  styleUrl: './board-detail.component.sass',
})
export class BoardDetailComponent {}

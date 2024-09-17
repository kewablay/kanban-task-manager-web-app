import { Component, Input } from '@angular/core';
import { Board } from '../../models/app.model';

@Component({
  selector: 'app-board-content',
  standalone: true,
  imports: [],
  templateUrl: './board-content.component.html',
  styleUrl: './board-content.component.sass',
})
export class BoardContentComponent {
  @Input() board!: Board;
}

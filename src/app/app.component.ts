import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataServiceService } from './services/data-service/data-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  constructor(private dataService: DataServiceService) {
    this.dataService.fetchData().subscribe((data) => console.log('data:', data));
  }
}

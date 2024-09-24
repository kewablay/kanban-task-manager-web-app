import { Component } from '@angular/core';
import { ToggleComponent } from "../toggle/toggle.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ToggleComponent, SidebarComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.sass'
})
export class SidenavComponent {
  isSidebarOpened = true;

  hideSidebar() {
    this.isSidebarOpened = false;
  }

  showSidebar() {
    this.isSidebarOpened = true;
  }

}

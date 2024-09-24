import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentTheme } from '../../state/theme/selectors/theme.selectors';
import { toggleTheme } from '../../state/theme/actions/theme.actions';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.sass'
})
export class ToggleComponent {
  currentTheme!: string;
  constructor(private store: Store) {
    this.store
      .select(selectCurrentTheme)
      .subscribe((theme) => (this.currentTheme = theme));
  }

  ngOnInit() {}

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }
}

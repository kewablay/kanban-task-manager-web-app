import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'board/:id',
    loadComponent: () =>
      import('./pages/board-detail/board-detail.component').then(
        (m) => m.BoardDetailComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/board-redirect/board-redirect.component').then(
        (m) => m.BoardRedirectComponent
      ),
  },
];

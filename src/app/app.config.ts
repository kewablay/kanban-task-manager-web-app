import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { BoardEffects } from './state/boards/effects/board.effects';
import { boardReducer } from './state/boards/reducer/board.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { themeReducer } from './state/theme/reducer/theme.reducers';
import { themeEffect } from './state/theme/effects/theme.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState({ name: 'boards', reducer: boardReducer }),
    provideState({ name: 'theme', reducer: themeReducer }),
    provideEffects(BoardEffects, themeEffect),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};

import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { itemReducer } from './store/item.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productReducer } from './store/product.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({
        items: itemReducer,
        products: productReducer
    }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideEffects(ProductEffects)]
};

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BeautifulNaggySharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { CartComponent } from './cart/cart.component';

@NgModule({
    imports: [BeautifulNaggySharedModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent, CartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BeautifulNaggyHomeModule {}

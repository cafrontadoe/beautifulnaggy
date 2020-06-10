import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BeautifulNaggySharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { CartComponent } from './cart/cart.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDayModalComponent } from './select-day-modal/select-day.component';

@NgModule({
    imports: [BeautifulNaggySharedModule, RouterModule.forChild([HOME_ROUTE]), NgSelectModule],
    declarations: [HomeComponent, CartComponent, SelectDayModalComponent],
    entryComponents: [SelectDayModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BeautifulNaggyHomeModule {}

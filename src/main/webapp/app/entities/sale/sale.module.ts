import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BeautifulNaggySharedModule } from 'app/shared';
import {
    SaleComponent,
    SaleDetailComponent,
    SaleUpdateComponent,
    SaleDeletePopupComponent,
    SaleDeleteDialogComponent,
    saleRoute,
    salePopupRoute
} from './';

const ENTITY_STATES = [...saleRoute, ...salePopupRoute];

@NgModule({
    imports: [BeautifulNaggySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SaleComponent, SaleDetailComponent, SaleUpdateComponent, SaleDeleteDialogComponent, SaleDeletePopupComponent],
    entryComponents: [SaleComponent, SaleUpdateComponent, SaleDeleteDialogComponent, SaleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BeautifulNaggySaleModule {}

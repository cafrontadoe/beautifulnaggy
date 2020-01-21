import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BeautifulNaggySharedModule } from 'app/shared';
import {
    ProductSaleComponent,
    ProductSaleDetailComponent,
    ProductSaleUpdateComponent,
    ProductSaleDeletePopupComponent,
    ProductSaleDeleteDialogComponent,
    productSaleRoute,
    productSalePopupRoute
} from './';

const ENTITY_STATES = [...productSaleRoute, ...productSalePopupRoute];

@NgModule({
    imports: [BeautifulNaggySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductSaleComponent,
        ProductSaleDetailComponent,
        ProductSaleUpdateComponent,
        ProductSaleDeleteDialogComponent,
        ProductSaleDeletePopupComponent
    ],
    entryComponents: [ProductSaleComponent, ProductSaleUpdateComponent, ProductSaleDeleteDialogComponent, ProductSaleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BeautifulNaggyProductSaleModule {}

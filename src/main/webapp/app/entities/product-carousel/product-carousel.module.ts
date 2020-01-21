import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BeautifulNaggySharedModule } from 'app/shared';
import {
    ProductCarouselComponent,
    ProductCarouselDetailComponent,
    ProductCarouselUpdateComponent,
    ProductCarouselDeletePopupComponent,
    ProductCarouselDeleteDialogComponent,
    productCarouselRoute,
    productCarouselPopupRoute
} from './';

const ENTITY_STATES = [...productCarouselRoute, ...productCarouselPopupRoute];

@NgModule({
    imports: [BeautifulNaggySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductCarouselComponent,
        ProductCarouselDetailComponent,
        ProductCarouselUpdateComponent,
        ProductCarouselDeleteDialogComponent,
        ProductCarouselDeletePopupComponent
    ],
    entryComponents: [
        ProductCarouselComponent,
        ProductCarouselUpdateComponent,
        ProductCarouselDeleteDialogComponent,
        ProductCarouselDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BeautifulNaggyProductCarouselModule {}

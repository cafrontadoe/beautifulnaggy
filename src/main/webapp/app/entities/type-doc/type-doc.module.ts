import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BeautifulNaggySharedModule } from 'app/shared';
import {
    TypeDocComponent,
    TypeDocDetailComponent,
    TypeDocUpdateComponent,
    TypeDocDeletePopupComponent,
    TypeDocDeleteDialogComponent,
    typeDocRoute,
    typeDocPopupRoute
} from './';

const ENTITY_STATES = [...typeDocRoute, ...typeDocPopupRoute];

@NgModule({
    imports: [BeautifulNaggySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TypeDocComponent,
        TypeDocDetailComponent,
        TypeDocUpdateComponent,
        TypeDocDeleteDialogComponent,
        TypeDocDeletePopupComponent
    ],
    entryComponents: [TypeDocComponent, TypeDocUpdateComponent, TypeDocDeleteDialogComponent, TypeDocDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BeautifulNaggyTypeDocModule {}

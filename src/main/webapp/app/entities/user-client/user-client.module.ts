import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BeautifulNaggySharedModule } from 'app/shared';
import {
    UserClientComponent,
    UserClientDetailComponent,
    UserClientUpdateComponent,
    UserClientDeletePopupComponent,
    UserClientDeleteDialogComponent,
    userClientRoute,
    userClientPopupRoute
} from './';

const ENTITY_STATES = [...userClientRoute, ...userClientPopupRoute];

@NgModule({
    imports: [BeautifulNaggySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserClientComponent,
        UserClientDetailComponent,
        UserClientUpdateComponent,
        UserClientDeleteDialogComponent,
        UserClientDeletePopupComponent
    ],
    entryComponents: [UserClientComponent, UserClientUpdateComponent, UserClientDeleteDialogComponent, UserClientDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [UserClientUpdateComponent]
})
export class BeautifulNaggyUserClientModule {}

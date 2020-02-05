import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { BeautifulNaggySharedLibsModule, BeautifulNaggySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from 'app/home/cart.service';
import { NaturalNumberDirective } from './directives/natural-numbers-only.directive';

@NgModule({
    imports: [BeautifulNaggySharedLibsModule, BeautifulNaggySharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, CartComponent, NaturalNumberDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [BeautifulNaggySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, CartComponent, NaturalNumberDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BeautifulNaggySharedModule {
    static forRoot() {
        return {
            ngModule: BeautifulNaggySharedModule
        };
    }
}

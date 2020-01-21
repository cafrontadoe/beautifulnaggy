import { NgModule } from '@angular/core';

import { BeautifulNaggySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [BeautifulNaggySharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [BeautifulNaggySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BeautifulNaggySharedCommonModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'type-doc',
                loadChildren: './type-doc/type-doc.module#BeautifulNaggyTypeDocModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#BeautifulNaggyProductModule'
            },
            {
                path: 'user-client',
                loadChildren: './user-client/user-client.module#BeautifulNaggyUserClientModule'
            },
            {
                path: 'product-carousel',
                loadChildren: './product-carousel/product-carousel.module#BeautifulNaggyProductCarouselModule'
            },
            {
                path: 'sale',
                loadChildren: './sale/sale.module#BeautifulNaggySaleModule'
            },
            {
                path: 'product-sale',
                loadChildren: './product-sale/product-sale.module#BeautifulNaggyProductSaleModule'
            },
            {
                path: 'type-doc',
                loadChildren: './type-doc/type-doc.module#BeautifulNaggyTypeDocModule'
            },
            {
                path: 'user-client',
                loadChildren: './user-client/user-client.module#BeautifulNaggyUserClientModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#BeautifulNaggyProductModule'
            },
            {
                path: 'user-client',
                loadChildren: './user-client/user-client.module#BeautifulNaggyUserClientModule'
            },
            {
                path: 'sale',
                loadChildren: './sale/sale.module#BeautifulNaggySaleModule'
            },
            {
                path: 'product-sale',
                loadChildren: './product-sale/product-sale.module#BeautifulNaggyProductSaleModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#BeautifulNaggyProductModule'
            },
            {
                path: 'sale',
                loadChildren: './sale/sale.module#BeautifulNaggySaleModule'
            },
            {
                path: 'product-sale',
                loadChildren: './product-sale/product-sale.module#BeautifulNaggyProductSaleModule'
            },
            {
                path: 'sale',
                loadChildren: './sale/sale.module#BeautifulNaggySaleModule'
            },
            {
                path: 'product-sale',
                loadChildren: './product-sale/product-sale.module#BeautifulNaggyProductSaleModule'
            },
            {
                path: 'sale',
                loadChildren: './sale/sale.module#BeautifulNaggySaleModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BeautifulNaggyEntityModule {}

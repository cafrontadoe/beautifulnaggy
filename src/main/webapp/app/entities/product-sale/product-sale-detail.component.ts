import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductSale } from 'app/shared/model/product-sale.model';

@Component({
    selector: 'jhi-product-sale-detail',
    templateUrl: './product-sale-detail.component.html'
})
export class ProductSaleDetailComponent implements OnInit {
    productSale: IProductSale;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productSale }) => {
            this.productSale = productSale;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit, HostBinding, OnChanges } from '@angular/core';
import { ProductSale } from 'app/shared/model/product-sale.model';
import { CartService } from 'app/home/cart.service';

@Component({
    selector: 'jhi-sale-client',
    templateUrl: './sale-client.component.html',
    styles: []
})
export class SaleClientComponent implements OnInit, OnChanges {
    constructor() {}

    ngOnInit() {}
    ngOnChanges() {}
}

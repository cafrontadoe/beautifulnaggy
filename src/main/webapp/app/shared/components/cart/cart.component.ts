import { Component, OnInit, ChangeDetectorRef, Input, OnChanges, HostBinding } from '@angular/core';
import { ProductSale } from 'app/shared/model/product-sale.model';
import { CartService } from 'app/home/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {
    @HostBinding('class.is-open')
    productSaleList: ProductSale[];

    totalProducts: number;

    constructor(private readonly cartService: CartService) {}

    ngOnInit() {
        console.log('entra a oninit de cart');
        this.cartService.change.subscribe(productSaleList => {
            this.productSaleList = productSaleList;
            this.onEventSale();
        });
    }

    ngOnChanges() {
        this.cartService.change.subscribe(productSaleList => {
            this.productSaleList = productSaleList;
            this.onEventSale();
        });
    }

    onEventSale() {
        this.totalProducts = 0;
        this.productSaleList.forEach(element => {
            this.totalProducts = this.totalProducts + element.countProduct;
        });
        console.log(this.totalProducts);
    }
}

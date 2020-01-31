import { Component, OnInit, ChangeDetectorRef, HostBinding, OnChanges } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductSale } from 'app/shared/model/product-sale.model';
import { IProduct } from 'app/shared/model/product.model';

const OFFSET_HEIGHT = 170;
const PRODUCT_HEIGHT = 48;

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {
    @HostBinding('class.is-open')
    productSaleList: ProductSale[];
    numProducts = 0;
    totalCost = 0;

    products: any[] = [];
    animatePlop = false;
    animatePopout = false;
    expanded = false;
    expandedHeight: string;
    cartTotal = 0;
    inherit: string;

    changeDetectorRef: ChangeDetectorRef;

    constructor(private cartService: CartService) {}

    ngOnInit() {
        console.log('llega a sale Client');
        this.expandedHeight = '0';
        this.cartService.change.subscribe(productSaleList => {
            this.productSaleList = productSaleList;

            console.log('=====>this.productSaleList');
            console.log(this.productSaleList);
            this.onEventSale();

            // Make a plop animation
            if (this.numProducts > 0) {
                this.animatePlop = true;
                /*   setTimeout(() => {
  this.animatePlop = false;
}, 160); */
            } else if (this.numProducts === 0) {
                this.animatePopout = true;
                setTimeout(() => {
                    this.animatePopout = false;
                }, 300);
            }
            this.expandedHeight = this.products.length * PRODUCT_HEIGHT + OFFSET_HEIGHT + 'px';
            if (!this.products.length) {
                this.expanded = false;
            }
        });
    }

    ngOnChanges() {}

    onEventSale() {
        this.numProducts = 0;
        this.productSaleList.forEach(element => {
            this.numProducts = this.numProducts + element.countProduct;
            this.totalCost = (this.totalCost + element.product.priceBeauty) * element.countProduct;
        });
        console.log(this.numProducts);
    }

    onCartClick() {
        this.expanded = !this.expanded;
    }
}

import { Component, OnInit, ChangeDetectorRef, HostBinding, OnChanges } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductSale } from 'app/shared/model/product-sale.model';

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

    products: any[] = [];
    numProducts = 0;
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
            if (this.numProducts > 1) {
                this.animatePlop = true;
                /*   setTimeout(() => {
          this.animatePlop = false;
        }, 160); */
            } else if (this.numProducts === 1) {
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
        });
        console.log(this.numProducts);
    }

    deleteProduct(product) {
        //this.cartService.deleteProductFromCart(product);
    }

    onCartClick() {
        this.expanded = !this.expanded;
    }
}

import { Injectable, Output, EventEmitter } from '@angular/core';
import { ProductSale } from 'app/shared/model/product-sale.model';

@Injectable()
export class CartService {
    @Output() change: EventEmitter<ProductSale[]> = new EventEmitter();

    addToCart(productSaleList: ProductSale[]) {
        console.log('entra a metodo de servicio');
        this.change.emit(productSaleList);
    }
}

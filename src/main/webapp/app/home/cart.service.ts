import { Injectable, Output, EventEmitter } from '@angular/core';
import { ProductSale } from 'app/shared/model/product-sale.model';

@Injectable({ providedIn: 'root' })
export class CartService {
    @Output() change: EventEmitter<ProductSale[]> = new EventEmitter();

    changeSaleCart(productSaleList: ProductSale[]) {
        console.log('entra a metodo de servicio');
        this.change.emit(productSaleList);
    }
}

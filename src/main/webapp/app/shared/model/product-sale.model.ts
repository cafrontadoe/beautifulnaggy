import { ISale } from 'app/shared/model/sale.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IProductSale {
    id?: number;
    countProduct?: number;
    totalProduct?: number;
    sale?: ISale;
    product?: IProduct;
}

export class ProductSale implements IProductSale {
    constructor(
        public id?: number,
        public countProduct?: number,
        public totalProduct?: number,
        public sale?: ISale,
        public product?: IProduct
    ) {}
}

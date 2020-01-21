import { IProduct } from 'app/shared/model/product.model';
import { ISale } from 'app/shared/model/sale.model';

export interface IProductSale {
    id?: number;
    countProduct?: number;
    totalProduct?: number;
    product?: IProduct;
    sales?: ISale[];
}

export class ProductSale implements IProductSale {
    constructor(
        public id?: number,
        public countProduct?: number,
        public totalProduct?: number,
        public product?: IProduct,
        public sales?: ISale[]
    ) {}
}

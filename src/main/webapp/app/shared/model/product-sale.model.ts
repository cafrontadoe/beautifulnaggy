import { IProduct } from 'app/shared/model/product.model';
import { ISale } from 'app/shared/model/sale.model';

export interface IProductSale {
    id?: number;
    idProduct?: number;
    countProduct?: number;
    totalProduct?: number;
    products?: IProduct[];
    sale?: ISale;
    nameProduct?: string;
    singleValue?: number;
}

export class ProductSale implements IProductSale {
    constructor(
        public id?: number,
        public idProduct?: number,
        public countProduct?: number,
        public totalProduct?: number,
        public products?: IProduct[],
        public sale?: ISale
    ) {}
}

import { IProduct } from 'app/shared/model/product.model';

export interface IProductCarousel {
    id?: number;
    imageContentType?: string;
    image?: any;
    products?: IProduct[];
}

export class ProductCarousel implements IProductCarousel {
    constructor(public id?: number, public imageContentType?: string, public image?: any, public products?: IProduct[]) {}
}

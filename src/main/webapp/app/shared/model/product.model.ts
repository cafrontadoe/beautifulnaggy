import { IProductCarousel } from 'app/shared/model/product-carousel.model';
import { IProductSale } from 'app/shared/model/product-sale.model';

export interface IProduct {
    id?: number;
    imageContentType?: string;
    image?: any;
    imageToShow?: any;
    nombre?: string;
    description?: string;
    codigo?: string;
    available?: number;
    priceBeauty?: number;
    priceClient?: number;
    packaging?: string;
    productCaroucel?: IProductCarousel;
    productSales?: IProductSale[];
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public imageContentType?: string,
        public image?: any,
        public imageToShow?: any,
        public nombre?: string,
        public description?: string,
        public codigo?: string,
        public available?: number,
        public priceBeauty?: number,
        public priceClient?: number,
        public packaging?: string,
        public productCaroucel?: IProductCarousel,
        public productSales?: IProductSale[]
    ) {}
}

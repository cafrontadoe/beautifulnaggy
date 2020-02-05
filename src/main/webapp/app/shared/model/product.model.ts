import { IProductCarousel } from 'app/shared/model/product-carousel.model';
import { IProductSale } from 'app/shared/model/product-sale.model';

export interface IProduct {
    id?: number;
    imageContentType?: string;
    image?: any;
    nombre?: string;
    description?: string;
    codigo?: string;
    available?: number;
    priceBeauty?: number;
    priceClient?: number;
    packaging?: string;
    productCaroucel?: IProductCarousel;
    productSale?: IProductSale;
    imageToShow?: any;
    isAdded?: any;
    requestCount?: number;
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public imageContentType?: string,
        public image?: any,
        public nombre?: string,
        public description?: string,
        public codigo?: string,
        public available?: number,
        public priceBeauty?: number,
        public priceClient?: number,
        public packaging?: string,
        public productCaroucel?: IProductCarousel,
        public productSale?: IProductSale
    ) {}
}

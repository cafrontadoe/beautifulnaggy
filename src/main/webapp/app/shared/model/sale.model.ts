import { Moment } from 'moment';
import { IUserClient } from 'app/shared/model/user-client.model';
import { IProductSale } from 'app/shared/model/product-sale.model';

export interface ISale {
    id?: number;
    creationDate?: Moment;
    total?: number;
    description?: string;
    managementDate?: Moment;
    totalCost?: number;
    iva?: number;
    discount?: number;
    userClient?: IUserClient;
    productSales?: IProductSale[];
}

export class Sale implements ISale {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public total?: number,
        public description?: string,
        public managementDate?: Moment,
        public totalCost?: number,
        public iva?: number,
        public discount?: number,
        public userClient?: IUserClient,
        public productSales?: IProductSale[]
    ) {}
}

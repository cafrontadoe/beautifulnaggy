import { Moment } from 'moment';
import { IProductSale } from 'app/shared/model/product-sale.model';
import { IUserClient } from 'app/shared/model/user-client.model';

export interface ISale {
    id?: number;
    creationDate?: Moment;
    total?: string;
    description?: string;
    managementDate?: Moment;
    totalCost?: number;
    iva?: number;
    discount?: number;
    productSale?: IProductSale;
    userClients?: IUserClient[];
}

export class Sale implements ISale {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public total?: string,
        public description?: string,
        public managementDate?: Moment,
        public totalCost?: number,
        public iva?: number,
        public discount?: number,
        public productSale?: IProductSale,
        public userClients?: IUserClient[]
    ) {}
}

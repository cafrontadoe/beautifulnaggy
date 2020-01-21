import { ITypeDoc } from 'app/shared/model/type-doc.model';
import { ISale } from 'app/shared/model/sale.model';

export interface IUserClient {
    id?: number;
    name?: string;
    lastName?: string;
    email?: string;
    documentNumber?: string;
    celphone?: string;
    address?: string;
    typeDoc?: ITypeDoc;
    sale?: ISale;
}

export class UserClient implements IUserClient {
    constructor(
        public id?: number,
        public name?: string,
        public lastName?: string,
        public email?: string,
        public documentNumber?: string,
        public celphone?: string,
        public address?: string,
        public typeDoc?: ITypeDoc,
        public sale?: ISale
    ) {}
}

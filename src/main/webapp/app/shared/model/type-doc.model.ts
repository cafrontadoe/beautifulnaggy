import { IUserClient } from 'app/shared/model/user-client.model';

export interface ITypeDoc {
    id?: number;
    description?: string;
    userClient?: IUserClient;
}

export class TypeDoc implements ITypeDoc {
    constructor(public id?: number, public description?: string, public userClient?: IUserClient) {}
}

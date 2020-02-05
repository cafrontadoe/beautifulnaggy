import { IUserClient } from 'app/shared/model/user-client.model';

export interface ITypeDoc {
    id?: number;
    description?: string;
    userClients?: IUserClient[];
}

export class TypeDoc implements ITypeDoc {
    constructor(public id?: number, public description?: string, public userClients?: IUserClient[]) {}
}

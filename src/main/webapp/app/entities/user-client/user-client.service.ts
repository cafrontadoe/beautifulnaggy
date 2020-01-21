import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserClient } from 'app/shared/model/user-client.model';

type EntityResponseType = HttpResponse<IUserClient>;
type EntityArrayResponseType = HttpResponse<IUserClient[]>;

@Injectable({ providedIn: 'root' })
export class UserClientService {
    public resourceUrl = SERVER_API_URL + 'api/user-clients';

    constructor(protected http: HttpClient) {}

    create(userClient: IUserClient): Observable<EntityResponseType> {
        return this.http.post<IUserClient>(this.resourceUrl, userClient, { observe: 'response' });
    }

    update(userClient: IUserClient): Observable<EntityResponseType> {
        return this.http.put<IUserClient>(this.resourceUrl, userClient, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserClient>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserClient[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

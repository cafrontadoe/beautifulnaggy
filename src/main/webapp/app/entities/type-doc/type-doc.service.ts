import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITypeDoc } from 'app/shared/model/type-doc.model';

type EntityResponseType = HttpResponse<ITypeDoc>;
type EntityArrayResponseType = HttpResponse<ITypeDoc[]>;

@Injectable({ providedIn: 'root' })
export class TypeDocService {
    public resourceUrl = SERVER_API_URL + 'api/type-docs';

    constructor(protected http: HttpClient) {}

    create(typeDoc: ITypeDoc): Observable<EntityResponseType> {
        return this.http.post<ITypeDoc>(this.resourceUrl, typeDoc, { observe: 'response' });
    }

    update(typeDoc: ITypeDoc): Observable<EntityResponseType> {
        return this.http.put<ITypeDoc>(this.resourceUrl, typeDoc, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITypeDoc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITypeDoc[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

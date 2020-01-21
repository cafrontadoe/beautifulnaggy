import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISale } from 'app/shared/model/sale.model';

type EntityResponseType = HttpResponse<ISale>;
type EntityArrayResponseType = HttpResponse<ISale[]>;

@Injectable({ providedIn: 'root' })
export class SaleService {
    public resourceUrl = SERVER_API_URL + 'api/sales';

    constructor(protected http: HttpClient) {}

    create(sale: ISale): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sale);
        return this.http
            .post<ISale>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(sale: ISale): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sale);
        return this.http
            .put<ISale>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISale>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISale[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(sale: ISale): ISale {
        const copy: ISale = Object.assign({}, sale, {
            creationDate: sale.creationDate != null && sale.creationDate.isValid() ? sale.creationDate.toJSON() : null,
            managementDate: sale.managementDate != null && sale.managementDate.isValid() ? sale.managementDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
            res.body.managementDate = res.body.managementDate != null ? moment(res.body.managementDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((sale: ISale) => {
                sale.creationDate = sale.creationDate != null ? moment(sale.creationDate) : null;
                sale.managementDate = sale.managementDate != null ? moment(sale.managementDate) : null;
            });
        }
        return res;
    }
}

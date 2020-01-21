import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductSale } from 'app/shared/model/product-sale.model';

type EntityResponseType = HttpResponse<IProductSale>;
type EntityArrayResponseType = HttpResponse<IProductSale[]>;

@Injectable({ providedIn: 'root' })
export class ProductSaleService {
    public resourceUrl = SERVER_API_URL + 'api/product-sales';

    constructor(protected http: HttpClient) {}

    create(productSale: IProductSale): Observable<EntityResponseType> {
        return this.http.post<IProductSale>(this.resourceUrl, productSale, { observe: 'response' });
    }

    update(productSale: IProductSale): Observable<EntityResponseType> {
        return this.http.put<IProductSale>(this.resourceUrl, productSale, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductSale>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductSale[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

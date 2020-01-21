import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductCarousel } from 'app/shared/model/product-carousel.model';

type EntityResponseType = HttpResponse<IProductCarousel>;
type EntityArrayResponseType = HttpResponse<IProductCarousel[]>;

@Injectable({ providedIn: 'root' })
export class ProductCarouselService {
    public resourceUrl = SERVER_API_URL + 'api/product-carousels';

    constructor(protected http: HttpClient) {}

    create(productCarousel: IProductCarousel): Observable<EntityResponseType> {
        return this.http.post<IProductCarousel>(this.resourceUrl, productCarousel, { observe: 'response' });
    }

    update(productCarousel: IProductCarousel): Observable<EntityResponseType> {
        return this.http.put<IProductCarousel>(this.resourceUrl, productCarousel, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductCarousel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductCarousel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

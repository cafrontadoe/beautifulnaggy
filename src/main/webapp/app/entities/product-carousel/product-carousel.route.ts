import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductCarousel } from 'app/shared/model/product-carousel.model';
import { ProductCarouselService } from './product-carousel.service';
import { ProductCarouselComponent } from './product-carousel.component';
import { ProductCarouselDetailComponent } from './product-carousel-detail.component';
import { ProductCarouselUpdateComponent } from './product-carousel-update.component';
import { ProductCarouselDeletePopupComponent } from './product-carousel-delete-dialog.component';
import { IProductCarousel } from 'app/shared/model/product-carousel.model';

@Injectable({ providedIn: 'root' })
export class ProductCarouselResolve implements Resolve<IProductCarousel> {
    constructor(private service: ProductCarouselService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductCarousel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductCarousel>) => response.ok),
                map((productCarousel: HttpResponse<ProductCarousel>) => productCarousel.body)
            );
        }
        return of(new ProductCarousel());
    }
}

export const productCarouselRoute: Routes = [
    {
        path: '',
        component: ProductCarouselComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductCarousels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductCarouselDetailComponent,
        resolve: {
            productCarousel: ProductCarouselResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductCarousels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductCarouselUpdateComponent,
        resolve: {
            productCarousel: ProductCarouselResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductCarousels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductCarouselUpdateComponent,
        resolve: {
            productCarousel: ProductCarouselResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductCarousels'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productCarouselPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProductCarouselDeletePopupComponent,
        resolve: {
            productCarousel: ProductCarouselResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductCarousels'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

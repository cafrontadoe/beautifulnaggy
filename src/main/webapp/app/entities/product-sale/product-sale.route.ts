import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductSale } from 'app/shared/model/product-sale.model';
import { ProductSaleService } from './product-sale.service';
import { ProductSaleComponent } from './product-sale.component';
import { ProductSaleDetailComponent } from './product-sale-detail.component';
import { ProductSaleUpdateComponent } from './product-sale-update.component';
import { ProductSaleDeletePopupComponent } from './product-sale-delete-dialog.component';
import { IProductSale } from 'app/shared/model/product-sale.model';

@Injectable({ providedIn: 'root' })
export class ProductSaleResolve implements Resolve<IProductSale> {
    constructor(private service: ProductSaleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductSale> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductSale>) => response.ok),
                map((productSale: HttpResponse<ProductSale>) => productSale.body)
            );
        }
        return of(new ProductSale());
    }
}

export const productSaleRoute: Routes = [
    {
        path: '',
        component: ProductSaleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductSales'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductSaleDetailComponent,
        resolve: {
            productSale: ProductSaleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductSales'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductSaleUpdateComponent,
        resolve: {
            productSale: ProductSaleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductSales'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductSaleUpdateComponent,
        resolve: {
            productSale: ProductSaleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductSales'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productSalePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProductSaleDeletePopupComponent,
        resolve: {
            productSale: ProductSaleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductSales'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

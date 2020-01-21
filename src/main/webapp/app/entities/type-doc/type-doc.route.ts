import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TypeDoc } from 'app/shared/model/type-doc.model';
import { TypeDocService } from './type-doc.service';
import { TypeDocComponent } from './type-doc.component';
import { TypeDocDetailComponent } from './type-doc-detail.component';
import { TypeDocUpdateComponent } from './type-doc-update.component';
import { TypeDocDeletePopupComponent } from './type-doc-delete-dialog.component';
import { ITypeDoc } from 'app/shared/model/type-doc.model';

@Injectable({ providedIn: 'root' })
export class TypeDocResolve implements Resolve<ITypeDoc> {
    constructor(private service: TypeDocService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITypeDoc> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TypeDoc>) => response.ok),
                map((typeDoc: HttpResponse<TypeDoc>) => typeDoc.body)
            );
        }
        return of(new TypeDoc());
    }
}

export const typeDocRoute: Routes = [
    {
        path: '',
        component: TypeDocComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TypeDocs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TypeDocDetailComponent,
        resolve: {
            typeDoc: TypeDocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TypeDocs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TypeDocUpdateComponent,
        resolve: {
            typeDoc: TypeDocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TypeDocs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TypeDocUpdateComponent,
        resolve: {
            typeDoc: TypeDocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TypeDocs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const typeDocPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TypeDocDeletePopupComponent,
        resolve: {
            typeDoc: TypeDocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TypeDocs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

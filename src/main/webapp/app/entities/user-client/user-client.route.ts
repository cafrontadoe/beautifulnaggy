import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserClient } from 'app/shared/model/user-client.model';
import { UserClientService } from './user-client.service';
import { UserClientComponent } from './user-client.component';
import { UserClientDetailComponent } from './user-client-detail.component';
import { UserClientUpdateComponent } from './user-client-update.component';
import { UserClientDeletePopupComponent } from './user-client-delete-dialog.component';
import { IUserClient } from 'app/shared/model/user-client.model';

@Injectable({ providedIn: 'root' })
export class UserClientResolve implements Resolve<IUserClient> {
    constructor(private service: UserClientService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserClient> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UserClient>) => response.ok),
                map((userClient: HttpResponse<UserClient>) => userClient.body)
            );
        }
        return of(new UserClient());
    }
}

export const userClientRoute: Routes = [
    {
        path: '',
        component: UserClientComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserClients'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UserClientDetailComponent,
        resolve: {
            userClient: UserClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserClients'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UserClientUpdateComponent,
        resolve: {
            userClient: UserClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserClients'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UserClientUpdateComponent,
        resolve: {
            userClient: UserClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserClients'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userClientPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UserClientDeletePopupComponent,
        resolve: {
            userClient: UserClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserClients'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

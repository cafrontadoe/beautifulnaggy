import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserClient } from 'app/shared/model/user-client.model';
import { AccountService } from 'app/core';
import { UserClientService } from './user-client.service';

@Component({
    selector: 'jhi-user-client',
    templateUrl: './user-client.component.html'
})
export class UserClientComponent implements OnInit, OnDestroy {
    userClients: IUserClient[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected userClientService: UserClientService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.userClientService
            .query()
            .pipe(
                filter((res: HttpResponse<IUserClient[]>) => res.ok),
                map((res: HttpResponse<IUserClient[]>) => res.body)
            )
            .subscribe(
                (res: IUserClient[]) => {
                    this.userClients = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserClients();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserClient) {
        return item.id;
    }

    registerChangeInUserClients() {
        this.eventSubscriber = this.eventManager.subscribe('userClientListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

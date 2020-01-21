import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITypeDoc } from 'app/shared/model/type-doc.model';
import { AccountService } from 'app/core';
import { TypeDocService } from './type-doc.service';

@Component({
    selector: 'jhi-type-doc',
    templateUrl: './type-doc.component.html'
})
export class TypeDocComponent implements OnInit, OnDestroy {
    typeDocs: ITypeDoc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected typeDocService: TypeDocService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.typeDocService
            .query()
            .pipe(
                filter((res: HttpResponse<ITypeDoc[]>) => res.ok),
                map((res: HttpResponse<ITypeDoc[]>) => res.body)
            )
            .subscribe(
                (res: ITypeDoc[]) => {
                    this.typeDocs = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTypeDocs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITypeDoc) {
        return item.id;
    }

    registerChangeInTypeDocs() {
        this.eventSubscriber = this.eventManager.subscribe('typeDocListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

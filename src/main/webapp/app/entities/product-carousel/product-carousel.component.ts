import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProductCarousel } from 'app/shared/model/product-carousel.model';
import { AccountService } from 'app/core';
import { ProductCarouselService } from './product-carousel.service';

@Component({
    selector: 'jhi-product-carousel',
    templateUrl: './product-carousel.component.html'
})
export class ProductCarouselComponent implements OnInit, OnDestroy {
    productCarousels: IProductCarousel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected productCarouselService: ProductCarouselService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.productCarouselService
            .query()
            .pipe(
                filter((res: HttpResponse<IProductCarousel[]>) => res.ok),
                map((res: HttpResponse<IProductCarousel[]>) => res.body)
            )
            .subscribe(
                (res: IProductCarousel[]) => {
                    this.productCarousels = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductCarousels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductCarousel) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInProductCarousels() {
        this.eventSubscriber = this.eventManager.subscribe('productCarouselListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

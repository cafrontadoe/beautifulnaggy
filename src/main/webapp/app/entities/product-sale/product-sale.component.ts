import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductSale } from 'app/shared/model/product-sale.model';
import { AccountService } from 'app/core';
import { ProductSaleService } from './product-sale.service';

@Component({
    selector: 'jhi-product-sale',
    templateUrl: './product-sale.component.html'
})
export class ProductSaleComponent implements OnInit, OnDestroy {
    productSales: IProductSale[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected productSaleService: ProductSaleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.productSaleService
            .query()
            .pipe(
                filter((res: HttpResponse<IProductSale[]>) => res.ok),
                map((res: HttpResponse<IProductSale[]>) => res.body)
            )
            .subscribe(
                (res: IProductSale[]) => {
                    this.productSales = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductSales();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductSale) {
        return item.id;
    }

    registerChangeInProductSales() {
        this.eventSubscriber = this.eventManager.subscribe('productSaleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

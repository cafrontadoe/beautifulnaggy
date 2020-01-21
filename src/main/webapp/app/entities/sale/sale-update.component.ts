import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISale } from 'app/shared/model/sale.model';
import { SaleService } from './sale.service';
import { IProductSale } from 'app/shared/model/product-sale.model';
import { ProductSaleService } from 'app/entities/product-sale';

@Component({
    selector: 'jhi-sale-update',
    templateUrl: './sale-update.component.html'
})
export class SaleUpdateComponent implements OnInit {
    sale: ISale;
    isSaving: boolean;

    productsales: IProductSale[];
    creationDate: string;
    managementDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected saleService: SaleService,
        protected productSaleService: ProductSaleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sale }) => {
            this.sale = sale;
            this.creationDate = this.sale.creationDate != null ? this.sale.creationDate.format(DATE_TIME_FORMAT) : null;
            this.managementDate = this.sale.managementDate != null ? this.sale.managementDate.format(DATE_TIME_FORMAT) : null;
        });
        this.productSaleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProductSale[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProductSale[]>) => response.body)
            )
            .subscribe((res: IProductSale[]) => (this.productsales = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.sale.creationDate = this.creationDate != null ? moment(this.creationDate, DATE_TIME_FORMAT) : null;
        this.sale.managementDate = this.managementDate != null ? moment(this.managementDate, DATE_TIME_FORMAT) : null;
        if (this.sale.id !== undefined) {
            this.subscribeToSaveResponse(this.saleService.update(this.sale));
        } else {
            this.subscribeToSaveResponse(this.saleService.create(this.sale));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISale>>) {
        result.subscribe((res: HttpResponse<ISale>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProductSaleById(index: number, item: IProductSale) {
        return item.id;
    }
}

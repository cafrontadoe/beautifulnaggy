import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductSale } from 'app/shared/model/product-sale.model';
import { ProductSaleService } from './product-sale.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';

@Component({
    selector: 'jhi-product-sale-update',
    templateUrl: './product-sale-update.component.html'
})
export class ProductSaleUpdateComponent implements OnInit {
    productSale: IProductSale;
    isSaving: boolean;

    products: IProduct[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected productSaleService: ProductSaleService,
        protected productService: ProductService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productSale }) => {
            this.productSale = productSale;
        });
        this.productService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProduct[]>) => response.body)
            )
            .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productSale.id !== undefined) {
            this.subscribeToSaveResponse(this.productSaleService.update(this.productSale));
        } else {
            this.subscribeToSaveResponse(this.productSaleService.create(this.productSale));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductSale>>) {
        result.subscribe((res: HttpResponse<IProductSale>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProductById(index: number, item: IProduct) {
        return item.id;
    }
}

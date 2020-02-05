import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IProductSale } from 'app/shared/model/product-sale.model';
import { ProductSaleService } from 'app/entities/product-sale';
import { IProductCarousel } from 'app/shared/model/product-carousel.model';
import { ProductCarouselService } from 'app/entities/product-carousel';

@Component({
    selector: 'jhi-product-update',
    templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
    product: IProduct;
    isSaving: boolean;

    productsales: IProductSale[];

    productcarousels: IProductCarousel[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected productService: ProductService,
        protected productSaleService: ProductSaleService,
        protected productCarouselService: ProductCarouselService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ product }) => {
            this.product = product;
        });
        this.productSaleService
            .query({ filter: 'product-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IProductSale[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProductSale[]>) => response.body)
            )
            .subscribe(
                (res: IProductSale[]) => {
                    if (!this.product.productSale || !this.product.productSale.id) {
                        this.productsales = res;
                    } else {
                        this.productSaleService
                            .find(this.product.productSale.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IProductSale>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IProductSale>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IProductSale) => (this.productsales = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.productCarouselService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProductCarousel[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProductCarousel[]>) => response.body)
            )
            .subscribe((res: IProductCarousel[]) => (this.productcarousels = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(this.productService.create(this.product));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
        result.subscribe((res: HttpResponse<IProduct>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProductCarouselById(index: number, item: IProductCarousel) {
        return item.id;
    }
}

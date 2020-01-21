import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiDataUtils } from 'ng-jhipster';
import { IProductCarousel } from 'app/shared/model/product-carousel.model';
import { ProductCarouselService } from './product-carousel.service';

@Component({
    selector: 'jhi-product-carousel-update',
    templateUrl: './product-carousel-update.component.html'
})
export class ProductCarouselUpdateComponent implements OnInit {
    productCarousel: IProductCarousel;
    isSaving: boolean;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected productCarouselService: ProductCarouselService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productCarousel }) => {
            this.productCarousel = productCarousel;
        });
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
        if (this.productCarousel.id !== undefined) {
            this.subscribeToSaveResponse(this.productCarouselService.update(this.productCarousel));
        } else {
            this.subscribeToSaveResponse(this.productCarouselService.create(this.productCarousel));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductCarousel>>) {
        result.subscribe((res: HttpResponse<IProductCarousel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

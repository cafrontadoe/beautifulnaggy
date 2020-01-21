import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProductCarousel } from 'app/shared/model/product-carousel.model';

@Component({
    selector: 'jhi-product-carousel-detail',
    templateUrl: './product-carousel-detail.component.html'
})
export class ProductCarouselDetailComponent implements OnInit {
    productCarousel: IProductCarousel;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}

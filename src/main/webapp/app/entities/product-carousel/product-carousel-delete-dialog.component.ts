import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductCarousel } from 'app/shared/model/product-carousel.model';
import { ProductCarouselService } from './product-carousel.service';

@Component({
    selector: 'jhi-product-carousel-delete-dialog',
    templateUrl: './product-carousel-delete-dialog.component.html'
})
export class ProductCarouselDeleteDialogComponent {
    productCarousel: IProductCarousel;

    constructor(
        protected productCarouselService: ProductCarouselService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productCarouselService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productCarouselListModification',
                content: 'Deleted an productCarousel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-carousel-delete-popup',
    template: ''
})
export class ProductCarouselDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productCarousel }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductCarouselDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productCarousel = productCarousel;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/product-carousel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/product-carousel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

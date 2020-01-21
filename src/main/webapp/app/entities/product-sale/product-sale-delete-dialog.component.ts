import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductSale } from 'app/shared/model/product-sale.model';
import { ProductSaleService } from './product-sale.service';

@Component({
    selector: 'jhi-product-sale-delete-dialog',
    templateUrl: './product-sale-delete-dialog.component.html'
})
export class ProductSaleDeleteDialogComponent {
    productSale: IProductSale;

    constructor(
        protected productSaleService: ProductSaleService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productSaleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productSaleListModification',
                content: 'Deleted an productSale'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-sale-delete-popup',
    template: ''
})
export class ProductSaleDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productSale }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductSaleDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productSale = productSale;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/product-sale', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/product-sale', { outlets: { popup: null } }]);
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

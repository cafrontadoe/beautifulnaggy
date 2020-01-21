/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { ProductSaleDeleteDialogComponent } from 'app/entities/product-sale/product-sale-delete-dialog.component';
import { ProductSaleService } from 'app/entities/product-sale/product-sale.service';

describe('Component Tests', () => {
    describe('ProductSale Management Delete Component', () => {
        let comp: ProductSaleDeleteDialogComponent;
        let fixture: ComponentFixture<ProductSaleDeleteDialogComponent>;
        let service: ProductSaleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [ProductSaleDeleteDialogComponent]
            })
                .overrideTemplate(ProductSaleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductSaleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductSaleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { ProductCarouselDeleteDialogComponent } from 'app/entities/product-carousel/product-carousel-delete-dialog.component';
import { ProductCarouselService } from 'app/entities/product-carousel/product-carousel.service';

describe('Component Tests', () => {
    describe('ProductCarousel Management Delete Component', () => {
        let comp: ProductCarouselDeleteDialogComponent;
        let fixture: ComponentFixture<ProductCarouselDeleteDialogComponent>;
        let service: ProductCarouselService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [ProductCarouselDeleteDialogComponent]
            })
                .overrideTemplate(ProductCarouselDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductCarouselDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCarouselService);
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

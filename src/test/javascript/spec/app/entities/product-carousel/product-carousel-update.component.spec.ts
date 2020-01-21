/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { ProductCarouselUpdateComponent } from 'app/entities/product-carousel/product-carousel-update.component';
import { ProductCarouselService } from 'app/entities/product-carousel/product-carousel.service';
import { ProductCarousel } from 'app/shared/model/product-carousel.model';

describe('Component Tests', () => {
    describe('ProductCarousel Management Update Component', () => {
        let comp: ProductCarouselUpdateComponent;
        let fixture: ComponentFixture<ProductCarouselUpdateComponent>;
        let service: ProductCarouselService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [ProductCarouselUpdateComponent]
            })
                .overrideTemplate(ProductCarouselUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductCarouselUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCarouselService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductCarousel(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productCarousel = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductCarousel();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productCarousel = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});

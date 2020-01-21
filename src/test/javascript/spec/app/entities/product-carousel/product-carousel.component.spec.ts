/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { ProductCarouselComponent } from 'app/entities/product-carousel/product-carousel.component';
import { ProductCarouselService } from 'app/entities/product-carousel/product-carousel.service';
import { ProductCarousel } from 'app/shared/model/product-carousel.model';

describe('Component Tests', () => {
    describe('ProductCarousel Management Component', () => {
        let comp: ProductCarouselComponent;
        let fixture: ComponentFixture<ProductCarouselComponent>;
        let service: ProductCarouselService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [ProductCarouselComponent],
                providers: []
            })
                .overrideTemplate(ProductCarouselComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductCarouselComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCarouselService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProductCarousel(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.productCarousels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

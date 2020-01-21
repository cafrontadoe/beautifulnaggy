/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { ProductCarouselDetailComponent } from 'app/entities/product-carousel/product-carousel-detail.component';
import { ProductCarousel } from 'app/shared/model/product-carousel.model';

describe('Component Tests', () => {
    describe('ProductCarousel Management Detail Component', () => {
        let comp: ProductCarouselDetailComponent;
        let fixture: ComponentFixture<ProductCarouselDetailComponent>;
        const route = ({ data: of({ productCarousel: new ProductCarousel(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [ProductCarouselDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductCarouselDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductCarouselDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productCarousel).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

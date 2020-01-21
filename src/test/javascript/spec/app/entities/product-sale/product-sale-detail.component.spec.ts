/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { ProductSaleDetailComponent } from 'app/entities/product-sale/product-sale-detail.component';
import { ProductSale } from 'app/shared/model/product-sale.model';

describe('Component Tests', () => {
    describe('ProductSale Management Detail Component', () => {
        let comp: ProductSaleDetailComponent;
        let fixture: ComponentFixture<ProductSaleDetailComponent>;
        const route = ({ data: of({ productSale: new ProductSale(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [ProductSaleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductSaleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductSaleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productSale).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { ProductSaleComponent } from 'app/entities/product-sale/product-sale.component';
import { ProductSaleService } from 'app/entities/product-sale/product-sale.service';
import { ProductSale } from 'app/shared/model/product-sale.model';

describe('Component Tests', () => {
    describe('ProductSale Management Component', () => {
        let comp: ProductSaleComponent;
        let fixture: ComponentFixture<ProductSaleComponent>;
        let service: ProductSaleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [ProductSaleComponent],
                providers: []
            })
                .overrideTemplate(ProductSaleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductSaleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductSaleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProductSale(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.productSales[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

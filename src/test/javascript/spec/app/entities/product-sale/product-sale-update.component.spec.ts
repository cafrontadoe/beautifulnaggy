/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { ProductSaleUpdateComponent } from 'app/entities/product-sale/product-sale-update.component';
import { ProductSaleService } from 'app/entities/product-sale/product-sale.service';
import { ProductSale } from 'app/shared/model/product-sale.model';

describe('Component Tests', () => {
    describe('ProductSale Management Update Component', () => {
        let comp: ProductSaleUpdateComponent;
        let fixture: ComponentFixture<ProductSaleUpdateComponent>;
        let service: ProductSaleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [ProductSaleUpdateComponent]
            })
                .overrideTemplate(ProductSaleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductSaleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductSaleService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductSale(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productSale = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductSale();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productSale = entity;
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

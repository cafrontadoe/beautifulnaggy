/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { TypeDocUpdateComponent } from 'app/entities/type-doc/type-doc-update.component';
import { TypeDocService } from 'app/entities/type-doc/type-doc.service';
import { TypeDoc } from 'app/shared/model/type-doc.model';

describe('Component Tests', () => {
    describe('TypeDoc Management Update Component', () => {
        let comp: TypeDocUpdateComponent;
        let fixture: ComponentFixture<TypeDocUpdateComponent>;
        let service: TypeDocService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [TypeDocUpdateComponent]
            })
                .overrideTemplate(TypeDocUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypeDocUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeDocService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TypeDoc(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.typeDoc = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TypeDoc();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.typeDoc = entity;
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

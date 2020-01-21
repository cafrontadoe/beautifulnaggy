/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { TypeDocComponent } from 'app/entities/type-doc/type-doc.component';
import { TypeDocService } from 'app/entities/type-doc/type-doc.service';
import { TypeDoc } from 'app/shared/model/type-doc.model';

describe('Component Tests', () => {
    describe('TypeDoc Management Component', () => {
        let comp: TypeDocComponent;
        let fixture: ComponentFixture<TypeDocComponent>;
        let service: TypeDocService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [TypeDocComponent],
                providers: []
            })
                .overrideTemplate(TypeDocComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypeDocComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeDocService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TypeDoc(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.typeDocs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

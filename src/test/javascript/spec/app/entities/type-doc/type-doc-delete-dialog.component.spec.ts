/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { TypeDocDeleteDialogComponent } from 'app/entities/type-doc/type-doc-delete-dialog.component';
import { TypeDocService } from 'app/entities/type-doc/type-doc.service';

describe('Component Tests', () => {
    describe('TypeDoc Management Delete Component', () => {
        let comp: TypeDocDeleteDialogComponent;
        let fixture: ComponentFixture<TypeDocDeleteDialogComponent>;
        let service: TypeDocService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [TypeDocDeleteDialogComponent]
            })
                .overrideTemplate(TypeDocDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypeDocDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeDocService);
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

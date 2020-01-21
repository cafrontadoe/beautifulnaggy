/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { UserClientUpdateComponent } from 'app/entities/user-client/user-client-update.component';
import { UserClientService } from 'app/entities/user-client/user-client.service';
import { UserClient } from 'app/shared/model/user-client.model';

describe('Component Tests', () => {
    describe('UserClient Management Update Component', () => {
        let comp: UserClientUpdateComponent;
        let fixture: ComponentFixture<UserClientUpdateComponent>;
        let service: UserClientService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [UserClientUpdateComponent]
            })
                .overrideTemplate(UserClientUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserClientUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserClientService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new UserClient(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.userClient = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new UserClient();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.userClient = entity;
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

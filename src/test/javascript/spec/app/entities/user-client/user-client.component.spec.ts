/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { UserClientComponent } from 'app/entities/user-client/user-client.component';
import { UserClientService } from 'app/entities/user-client/user-client.service';
import { UserClient } from 'app/shared/model/user-client.model';

describe('Component Tests', () => {
    describe('UserClient Management Component', () => {
        let comp: UserClientComponent;
        let fixture: ComponentFixture<UserClientComponent>;
        let service: UserClientService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [UserClientComponent],
                providers: []
            })
                .overrideTemplate(UserClientComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserClientComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserClientService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserClient(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userClients[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

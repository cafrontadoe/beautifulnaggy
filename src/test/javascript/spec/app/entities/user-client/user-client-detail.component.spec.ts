/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BeautifulNaggyTestModule } from '../../../test.module';
import { UserClientDetailComponent } from 'app/entities/user-client/user-client-detail.component';
import { UserClient } from 'app/shared/model/user-client.model';

describe('Component Tests', () => {
    describe('UserClient Management Detail Component', () => {
        let comp: UserClientDetailComponent;
        let fixture: ComponentFixture<UserClientDetailComponent>;
        const route = ({ data: of({ userClient: new UserClient(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BeautifulNaggyTestModule],
                declarations: [UserClientDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserClientDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserClientDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userClient).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

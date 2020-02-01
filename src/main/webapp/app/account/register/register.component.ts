import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';
import { LoginModalService } from 'app/core';
import { Register } from './register.service';
import { ITypeDoc } from 'app/shared/model/type-doc.model';
import { IUserClient } from 'app/shared/model/user-client.model';
import { TypeDocService } from 'app/entities/type-doc/type-doc.service';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserClientService } from 'app/entities/user-client/user-client.service';

@Component({
    selector: 'jhi-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;

    // busisness fields to user save
    userClient: IUserClient = {};
    isSaving: boolean;

    typedocs: ITypeDoc[];

    constructor(
        private loginModalService: LoginModalService,
        private registerService: Register,
        private elementRef: ElementRef,
        private renderer: Renderer,
        protected typeDocService: TypeDocService,
        protected userClientService: UserClientService
    ) {}

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
        this.getTypeListDocument();
    }

    getTypeListDocument() {
        this.typeDocService
            .query({})
            .pipe(
                filter((mayBeOk: HttpResponse<ITypeDoc[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITypeDoc[]>) => response.body)
            )
            .subscribe((res: ITypeDoc[]) => {
                this.typedocs = res;
                console.log('===========>   this.typedocs');
                console.log(this.typedocs);
            });
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.registerAccount.email = this.registerAccount.login;
            this.userClient.email = this.registerAccount.login;
            this.registerJhipsterUser();
            this.registerBusisnessUser();
        }
    }

    registerJhipsterUser() {
        this.doNotMatch = null;
        this.error = null;
        this.errorUserExists = null;
        this.errorEmailExists = null;
        this.registerAccount.langKey = 'en';

        this.registerService.save(this.registerAccount).subscribe(
            () => {
                this.success = true;
            },
            response => this.processError(response)
        );
    }

    registerBusisnessUser() {
        this.subscribeToSaveResponse(this.userClientService.create(this.userClient));
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserClient>>) {
        result.subscribe(
            (res: HttpResponse<IUserClient>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => console.log('error al registrar')
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        // this.previousState();
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}

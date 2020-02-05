import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserClient } from 'app/shared/model/user-client.model';
import { UserClientService } from './user-client.service';
import { ITypeDoc } from 'app/shared/model/type-doc.model';
import { TypeDocService } from 'app/entities/type-doc';

@Component({
    selector: 'jhi-user-client-update',
    templateUrl: './user-client-update.component.html'
})
export class UserClientUpdateComponent implements OnInit {
    userClient: IUserClient;
    isSaving: boolean;

    typedocs: ITypeDoc[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected userClientService: UserClientService,
        protected typeDocService: TypeDocService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userClient }) => {
            this.userClient = userClient;
        });
        this.typeDocService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITypeDoc[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITypeDoc[]>) => response.body)
            )
            .subscribe((res: ITypeDoc[]) => (this.typedocs = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userClient.id !== undefined) {
            this.subscribeToSaveResponse(this.userClientService.update(this.userClient));
        } else {
            this.subscribeToSaveResponse(this.userClientService.create(this.userClient));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserClient>>) {
        result.subscribe((res: HttpResponse<IUserClient>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTypeDocById(index: number, item: ITypeDoc) {
        return item.id;
    }
}

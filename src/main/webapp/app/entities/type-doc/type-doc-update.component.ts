import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITypeDoc } from 'app/shared/model/type-doc.model';
import { TypeDocService } from './type-doc.service';
import { IUserClient } from 'app/shared/model/user-client.model';
import { UserClientService } from 'app/entities/user-client';

@Component({
    selector: 'jhi-type-doc-update',
    templateUrl: './type-doc-update.component.html'
})
export class TypeDocUpdateComponent implements OnInit {
    typeDoc: ITypeDoc;
    isSaving: boolean;

    userclients: IUserClient[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected typeDocService: TypeDocService,
        protected userClientService: UserClientService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ typeDoc }) => {
            this.typeDoc = typeDoc;
        });
        this.userClientService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUserClient[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUserClient[]>) => response.body)
            )
            .subscribe((res: IUserClient[]) => (this.userclients = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.typeDoc.id !== undefined) {
            this.subscribeToSaveResponse(this.typeDocService.update(this.typeDoc));
        } else {
            this.subscribeToSaveResponse(this.typeDocService.create(this.typeDoc));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeDoc>>) {
        result.subscribe((res: HttpResponse<ITypeDoc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserClientById(index: number, item: IUserClient) {
        return item.id;
    }
}

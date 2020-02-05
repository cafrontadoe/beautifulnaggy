import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ITypeDoc } from 'app/shared/model/type-doc.model';
import { TypeDocService } from './type-doc.service';

@Component({
    selector: 'jhi-type-doc-update',
    templateUrl: './type-doc-update.component.html'
})
export class TypeDocUpdateComponent implements OnInit {
    typeDoc: ITypeDoc;
    isSaving: boolean;

    constructor(protected typeDocService: TypeDocService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ typeDoc }) => {
            this.typeDoc = typeDoc;
        });
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
}

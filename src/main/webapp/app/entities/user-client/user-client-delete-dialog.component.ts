import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserClient } from 'app/shared/model/user-client.model';
import { UserClientService } from './user-client.service';

@Component({
    selector: 'jhi-user-client-delete-dialog',
    templateUrl: './user-client-delete-dialog.component.html'
})
export class UserClientDeleteDialogComponent {
    userClient: IUserClient;

    constructor(
        protected userClientService: UserClientService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userClientService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userClientListModification',
                content: 'Deleted an userClient'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-client-delete-popup',
    template: ''
})
export class UserClientDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userClient }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserClientDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.userClient = userClient;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/user-client', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/user-client', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

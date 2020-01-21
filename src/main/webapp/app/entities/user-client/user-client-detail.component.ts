import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserClient } from 'app/shared/model/user-client.model';

@Component({
    selector: 'jhi-user-client-detail',
    templateUrl: './user-client-detail.component.html'
})
export class UserClientDetailComponent implements OnInit {
    userClient: IUserClient;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userClient }) => {
            this.userClient = userClient;
        });
    }

    previousState() {
        window.history.back();
    }
}

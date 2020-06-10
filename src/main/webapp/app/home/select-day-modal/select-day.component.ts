import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-select-day-modal',
    templateUrl: './select-day.component.html'
})
export class SelectDayModalComponent {
    constructor(public activeModal: NgbActiveModal) {}
}

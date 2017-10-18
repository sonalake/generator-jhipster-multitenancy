import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ent } from './ent.model';
import { EntPopupService } from './ent-popup.service';
import { EntService } from './ent.service';

@Component({
    selector: 'jhi-ent-dialog',
    templateUrl: './ent-dialog.component.html'
})
export class EntDialogComponent implements OnInit {

    ent: Ent;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private entService: EntService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entService.update(this.ent));
        } else {
            this.subscribeToSaveResponse(
                this.entService.create(this.ent));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ent>) {
        result.subscribe((res: Ent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Ent) {
        this.eventManager.broadcast({ name: 'entListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
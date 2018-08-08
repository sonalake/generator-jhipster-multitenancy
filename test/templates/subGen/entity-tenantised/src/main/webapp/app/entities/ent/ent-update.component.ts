import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEnt } from 'app/shared/model/ent.model';
import { EntService } from './ent.service';

@Component({
    selector: 'jhi-ent-update',
    templateUrl: './ent-update.component.html'
})
export class EntUpdateComponent implements OnInit {
    private _ent: IEnt;
    isSaving: boolean;

    constructor(private entService: EntService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ent }) => {
            this.ent = ent;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ent.id !== undefined) {
            this.subscribeToSaveResponse(this.entService.update(this.ent));
        } else {
            this.subscribeToSaveResponse(this.entService.create(this.ent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEnt>>) {
        result.subscribe((res: HttpResponse<IEnt>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get ent() {
        return this._ent;
    }

    set ent(ent: IEnt) {
        this._ent = ent;
    }
}

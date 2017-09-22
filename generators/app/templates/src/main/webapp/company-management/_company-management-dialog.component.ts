import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { <%= tenantNameUpperFirst %> } from './<%= tenantNameLowerFirst %>.model';
import { <%= tenantNameUpperFirst %>PopupService } from './<%= tenantNameLowerFirst %>-popup.service';
import { <%= tenantNameUpperFirst %>Service } from './<%= tenantNameLowerFirst %>.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: '<%=jhiPrefix%>-<%= tenantNameLowerFirst %>-mgmt-dialog',
    templateUrl: './<%= tenantNameLowerFirst %>-management-dialog.component.html'
})
export class <%= tenantNameUpperFirst %>MgmtDialogComponent implements OnInit {

    <%= tenantNameLowerFirst %>: <%= tenantNameUpperFirst %>;
    isSaving: boolean;
    isEditing: boolean;
    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private <%= tenantNameLowerFirst %>Service: <%= tenantNameUpperFirst %>Service,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.users = [];
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.<%= tenantNameLowerFirst %>.id !== undefined) {
            this.subscribeToSaveResponse(
                this.<%= tenantNameLowerFirst %>Service.update(this.<%= tenantNameLowerFirst %>));
        } else {
            this.subscribeToSaveResponse(this.<%= tenantNameLowerFirst %>Service.create(this.<%= tenantNameLowerFirst %>));
        }
    }

    private subscribeToSaveResponse(result: Observable<<%= tenantNameUpperFirst %>>) {
        result.subscribe((res: <%= tenantNameUpperFirst %>) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: <%= tenantNameUpperFirst %>) {
        this.eventManager.broadcast({ name: '<%= tenantNameLowerFirst %>ListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: '<%=jhiPrefix%>-<%= tenantNameLowerFirst %>-dialog',
    template: ''
})
export class <%= tenantNameUpperFirst %>DialogComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private <%= tenantNameLowerFirst %>PopupService: <%= tenantNameUpperFirst %>PopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.<%= tenantNameLowerFirst %>PopupService
                    .open(<%= tenantNameUpperFirst %>MgmtDialogComponent as Component, params['id']);
            } else {
                this.<%= tenantNameLowerFirst %>PopupService
                    .open(<%= tenantNameUpperFirst %>MgmtDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

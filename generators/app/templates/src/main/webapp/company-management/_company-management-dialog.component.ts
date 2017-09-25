<%#
 Copyright 2013-2017 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://jhipster.github.io/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { <%= tenantNameUpperFirst %> } from './<%= tenantNameLowerFirst %>.model';
import { <%= tenantNameUpperFirst %>ModalService } from './<%= tenantNameLowerFirst %>-modal.service';
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
        private <%= tenantNameLowerFirst %>ModalService: <%= tenantNameUpperFirst %>ModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.<%= tenantNameLowerFirst %>ModalService
                    .open(<%= tenantNameUpperFirst %>MgmtDialogComponent as Component, params['id']);
            } else {
                this.<%= tenantNameLowerFirst %>ModalService
                    .open(<%= tenantNameUpperFirst %>MgmtDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

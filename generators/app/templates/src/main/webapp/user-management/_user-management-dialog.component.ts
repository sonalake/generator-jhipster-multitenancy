import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserModalService } from './user-modal.service';
import { JhiLanguageHelper, User, UserService, ResponseWrapper } from '../../shared';

import { <%= tenantNameUpperFirst %> } from './../../entities/<%= tenantNameLowerFirst %>/<%= tenantNameLowerFirst %>.model';
import { <%= tenantNameUpperFirst %>Service } from './../../entities/<%= tenantNameLowerFirst %>/<%= tenantNameLowerFirst %>.service';

@Component({
    selector: 'jhi-user-mgmt-dialog',
    templateUrl: './user-management-dialog.component.html'
})
export class UserMgmtDialogComponent implements OnInit {

    user: User;
    languages: any[];
    authorities: any[];
    <%= tenantNameLowerFirst %>Authorities: any[] = [];
    defaultAuthorities: any[] = [];
    isSaving: Boolean;
    <%= tenantNamePlural %>: <%= tenantNameUpperFirst %>[];

    constructor(
        public activeModal: NgbActiveModal,
        private languageHelper: JhiLanguageHelper,
        private userService: UserService,
        private <%= tenantNameLowerFirst %>Service: <%= tenantNameUpperFirst %>Service,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.authorities = [];
        this.userService.authorities().subscribe((authorities) => {
            this.splitAuthorities(authorities);
            this.authorities = this.defaultAuthorities;
        });
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.<%= tenantNameLowerFirst %>Service.query().subscribe(
            (res: ResponseWrapper) => {
                this.<%= tenantNamePlural %> = res.json;
            }
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.userService.create(this.user).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    public on<%= tenantNameUpperFirst %>Change(<%= tenantNameLowerFirst %>) {
        if (<%= tenantNameLowerFirst %>.value === '') {
            this.authorities = this.defaultAuthorities;
        } else {
            this.authorities = this.<%= tenantNameLowerFirst %>Authorities;
        }
    }

    private splitAuthorities(authorities) {
        authorities.forEach((a) => {
            if (a.toUpperCase().indexOf('<%= tenantNameUpperCase %>') === -1) {
                this.defaultAuthorities.push(a);
            } else {
                this.<%= tenantNameLowerFirst %>Authorities.push(a);
            }
        });
    }
}

@Component({
    selector: 'jhi-user-dialog',
    template: ''
})
export class UserDialogComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userModalService: UserModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['login'] ) {
                this.modalRef = this.userModalService.open(UserMgmtDialogComponent as Component, params['login']);
            } else {
                this.modalRef = this.userModalService.open(UserMgmtDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

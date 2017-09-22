import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserModalService } from './user-modal.service';
import { JhiLanguageHelper, User, UserService, ResponseWrapper, Principal } from '../../shared';

import { <%= tenantNameUpperFirst %> } from './../../entities/<%= tenantNameLowerFirst %>/<%= tenantNameLowerFirst %>.model';
import { <%= tenantNameUpperFirst %>Service } from './../../entities/<%= tenantNameLowerFirst %>/<%= tenantNameLowerFirst %>.service';

@Component({
    selector: 'jhi-user-mgmt-dialog',
    templateUrl: './user-management-dialog.component.html'
})
export class UserMgmtDialogComponent implements OnInit {

    currentAccount: any;
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
        private principal: Principal,
        private userService: UserService,
        private <%= tenantNameLowerFirst %>Service: <%= tenantNameUpperFirst %>Service,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.isSaving = false;
        this.authorities = [];
        this.userService.authorities().subscribe((authorities) => {
            this.splitAuthorities(authorities);
            this.on<%= tenantNameUpperFirst %>Change();
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
        if (this.currentAccount.<%= tenantNameLowerFirst %>) {
            this.user.<%= tenantNameLowerFirst %> = this.currentAccount.<%= tenantNameLowerFirst %>;
        }
        if (this.user.id !== null) {
            this.remove<%= tenantNameUpperFirst %>Roles();
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

    public on<%= tenantNameUpperFirst %>Change() {
        if (this.user.<%= tenantNameLowerFirst %> === null) {
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

    // if the user <%= tenantNameLowerFirst %> is set to null, ROLE_<%= tenantNameUpperCase %>_ADMIN and ROLE_<%= tenantNameUpperCase %>_USER are not allowed
    private remove<%= tenantNameUpperFirst %>Roles() {
        if (this.user.<%= tenantNameLowerFirst %> === null) {
            let index;
            if ((index = this.user.authorities.indexOf('ROLE_<%= tenantNameUpperCase %>_ADMIN')) > -1) {
                this.user.authorities.splice(index, 1);
            }
            if ((index = this.user.authorities.indexOf('ROLE_<%= tenantNameUpperCase %>_USER')) > -1) {
                this.user.authorities.splice(index, 1);
            }
        }
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

import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { <%= tenantNameUpperFirst %> } from './<%= tenantNameLowerFirst %>.model';
import { <%= tenantNameUpperFirst %>Service } from './<%= tenantNameLowerFirst %>.service';

@Injectable()
export class <%= tenantNameUpperFirst %>PopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private <%= tenantNameLowerFirst %>Service: <%= tenantNameUpperFirst %>Service
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.<%= tenantNameLowerFirst %>Service.find(id).subscribe((<%= tenantNameLowerFirst %>) => {
                    this.ngbModalRef = this.<%= tenantNameLowerFirst %>ModalRef(component, <%= tenantNameLowerFirst %>);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.<%= tenantNameLowerFirst %>ModalRef(component, new <%= tenantNameUpperFirst %>());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    <%= tenantNameLowerFirst %>ModalRef(component: Component, <%= tenantNameLowerFirst %>: <%= tenantNameUpperFirst %>): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.<%= tenantNameLowerFirst %> = <%= tenantNameLowerFirst %>;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}

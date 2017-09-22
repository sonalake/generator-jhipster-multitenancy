import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { <%= tenantNameUpperFirst %> } from './<%= tenantNameLowerFirst %>.model';
import { <%= tenantNameUpperFirst %>Service } from './<%= tenantNameLowerFirst %>.service';

@Component({
    selector: '<%=jhiPrefix%>-<%= tenantNameLowerFirst %>-mgmt-detail',
    templateUrl: './<%= tenantNameLowerFirst %>-management-detail.component.html'
})
export class <%= tenantNameUpperFirst %>MgmtDetailComponent implements OnInit, OnDestroy {

    <%= tenantNameLowerFirst %>: <%= tenantNameUpperFirst %>;
    private subscription: Subscription;

    constructor(
        private <%= tenantNameLowerFirst %>Service: <%= tenantNameUpperFirst %>Service,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
    }

    load(id) {
        this.<%= tenantNameLowerFirst %>Service.find(id).subscribe((<%= tenantNameLowerFirst %>) => {
            this.<%= tenantNameLowerFirst %> = <%= tenantNameLowerFirst %>;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

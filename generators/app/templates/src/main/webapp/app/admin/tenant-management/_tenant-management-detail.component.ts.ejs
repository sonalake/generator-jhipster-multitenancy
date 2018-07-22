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

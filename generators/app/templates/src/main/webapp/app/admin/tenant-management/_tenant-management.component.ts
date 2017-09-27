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
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { <%= tenantNameUpperFirst %> } from './<%= tenantNameLowerFirst %>.model';
import { <%= tenantNameUpperFirst %>Service } from './<%= tenantNameLowerFirst %>.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: '<%=jhiPrefix%>-<%= tenantNameLowerFirst %>-mgmt',
    templateUrl: './<%= tenantNameLowerFirst %>-management.component.html'
})
export class <%= tenantNameUpperFirst %>MgmtComponent implements OnInit, OnDestroy {
    <%= tenantNamePluralLowerFirst %>: <%= tenantNameUpperFirst %>[];
    currentAccount: any;
    eventSubscriber: Subscription;
    <%_ if (databaseType !== 'cassandra') { _%>
    itemsPerPage: any;
    page: any;
    previousPage: any;
    routeData: any;
    links: any;
    reverse: any;
    predicate: any;
    totalItems: any;
    queryCount: any;
    <%_ } _%>

    constructor(
        private <%= tenantNameLowerFirst %>Service: <%= tenantNameUpperFirst %>Service,
        private parseLinks: JhiParseLinks,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        <%_ if (databaseType !== 'cassandra') { _%>
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        <%_ } _%>
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        <%_ if (databaseType !== 'cassandra') { _%>
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        <%_ } _%>
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeIn<%= tenantNamePluralUpperFirst %>();
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    loadAll() {
        this.<%= tenantNameLowerFirst %>Service.query(<% if (databaseType !== 'cassandra') { %>{
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}<% } %>).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/<%= tenantNameLowerFirst %>-management'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    <%_ if (databaseType !== 'cassandra') { _%>
    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    <%_ } _%>

    trackId(index: number, item: <%= tenantNameUpperFirst %>) {
        return item.id;
    }

    registerChangeIn<%= tenantNamePluralUpperFirst %>() {
        this.eventSubscriber = this.eventManager.subscribe('<%= tenantNameLowerFirst %>ListModification', (response) => this.loadAll());
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.<%= tenantNamePluralLowerFirst %> = data;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

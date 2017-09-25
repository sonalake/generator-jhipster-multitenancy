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
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { <%= tenantNameUpperFirst %>MgmtComponent } from './<%= tenantNameLowerFirst %>-management.component';
import { <%= tenantNameUpperFirst %>MgmtDetailComponent } from './<%= tenantNameLowerFirst %>-management-detail.component';
import { <%= tenantNameUpperFirst %>DialogComponent } from './<%= tenantNameLowerFirst %>-management-dialog.component';
import { <%= tenantNameUpperFirst %>DeleteDialogComponent } from './<%= tenantNameLowerFirst %>-management-delete-dialog.component';
import { <%= tenantNameUpperFirst %>RouteAccessService } from './../../shared';

@Injectable()
export class <%= tenantNameUpperFirst %>ResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const <%= tenantNameLowerFirst %>MgmtRoute: Routes = [
    {
        path: '<%= tenantNameLowerFirst %>-management',
        component: <%= tenantNameUpperFirst %>MgmtComponent,
        resolve: {
            'pagingParams': <%= tenantNameUpperFirst %>ResolvePagingParams
        },
        data: {
            pageTitle: '<%= tenantNameLowerFirst %>Management.home.title'
        },
        canActivate: [<%= tenantNameUpperFirst %>RouteAccessService]
    },
    {
        path: '<%= tenantNameLowerFirst %>-management/:id',
        component: <%= tenantNameUpperFirst %>MgmtDetailComponent,
        data: {
            pageTitle: '<%= tenantNameLowerFirst %>Management.home.title'
        },
        canActivate: [<%= tenantNameUpperFirst %>RouteAccessService]
    }
];

export const <%= tenantNameLowerFirst %>DialogRoute: Routes = [
    {
        path: '<%= tenantNameLowerFirst %>-management-new',
        component: <%= tenantNameUpperFirst %>DialogComponent,
        outlet: 'popup',
        canActivate: [<%= tenantNameUpperFirst %>RouteAccessService]
    },
    {
        path: '<%= tenantNameLowerFirst %>-management/:id/edit',
        component: <%= tenantNameUpperFirst %>DialogComponent,
        outlet: 'popup',
        canActivate: [<%= tenantNameUpperFirst %>RouteAccessService]
    },
    {
        path: '<%= tenantNameLowerFirst %>-management/:id/delete',
        component: <%= tenantNameUpperFirst %>DeleteDialogComponent,
        outlet: 'popup',
        canActivate: [<%= tenantNameUpperFirst %>RouteAccessService]
    }
];

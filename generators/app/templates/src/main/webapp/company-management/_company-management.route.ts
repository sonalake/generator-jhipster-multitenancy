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

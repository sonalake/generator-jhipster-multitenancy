import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooSharedModule } from '../shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
    adminState,
    AuditsComponent,
    UserMgmtComponent,
    UserDialogComponent,
    UserDeleteDialogComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    <%= tenantNameUpperFirst %>MgmtComponent,
    <%= tenantNameUpperFirst %>MgmtDetailComponent,
    <%= tenantNameUpperFirst %>MgmtDialogComponent,
    <%= tenantNameUpperFirst %>DialogComponent,
    <%= tenantNameUpperFirst %>DeleteDialogComponent,
    <%= tenantNameUpperFirst %>MgmtDeleteDialogComponent,
    LogsComponent,
    JhiMetricsMonitoringModalComponent,
    JhiMetricsMonitoringComponent,
    JhiHealthModalComponent,
    JhiHealthCheckComponent,
    JhiConfigurationComponent,
    JhiDocsComponent,
    AuditsService,
    JhiConfigurationService,
    JhiHealthService,
    JhiMetricsService,
    LogsService,
    UserResolvePagingParams,
    <%= tenantNameUpperFirst %>ResolvePagingParams,
    UserResolve,
    UserModalService,
    <%= tenantNameUpperFirst %>Service,
    <%= tenantNameUpperFirst %>PopupService
} from './';

@NgModule({
    imports: [
        FooSharedModule,
        RouterModule.forRoot(adminState, { useHash: true }),
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        AuditsComponent,
        UserMgmtComponent,
        UserDialogComponent,
        UserDeleteDialogComponent,
        UserMgmtDetailComponent,
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        <%= tenantNameUpperFirst %>MgmtComponent,
        <%= tenantNameUpperFirst %>MgmtDetailComponent,
        <%= tenantNameUpperFirst %>MgmtDialogComponent,
        <%= tenantNameUpperFirst %>DialogComponent,
        <%= tenantNameUpperFirst %>DeleteDialogComponent,
        <%= tenantNameUpperFirst %>MgmtDeleteDialogComponent,
        LogsComponent,
        JhiConfigurationComponent,
        JhiHealthCheckComponent,
        JhiHealthModalComponent,
        JhiDocsComponent,
        JhiMetricsMonitoringComponent,
        JhiMetricsMonitoringModalComponent
    ],
    entryComponents: [
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        JhiHealthModalComponent,
        JhiMetricsMonitoringModalComponent,
        <%= tenantNameUpperFirst %>MgmtDialogComponent,
        <%= tenantNameUpperFirst %>MgmtDeleteDialogComponent
    ],
    providers: [
        AuditsService,
        JhiConfigurationService,
        JhiHealthService,
        JhiMetricsService,
        LogsService,
        UserResolvePagingParams,
        UserResolve,
        UserModalService,
        <%= tenantNameUpperFirst %>ResolvePagingParams,
        <%= tenantNameUpperFirst %>Service,
        <%= tenantNameUpperFirst %>PopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FooAdminModule {}

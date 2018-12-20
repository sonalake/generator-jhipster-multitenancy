const appAdminIndexTs = require('./angular/admin-index.ts.js');
const appLayoutsNavbarComponentHtml = require('./angular/navbar.component.html.js');
const appLayoutsNavbarComponentTs = require('./angular/navbar.component.ts.js');
const appAccountServiceTs = require('./angular/account.service.ts.js');
const e2eAdminSpecTs = require('./angular/administration.spec.ts.js');
const userMgmtDialogComponentSpecTs = require('./angular/user-management-dialog.component.spec.ts.js');
const tenantResource = require('./server/_TenantResource.js');
const tenantService = require('./server/_TenantService.js');

module.exports = {
    angular: {
        appAdminIndexTs: appAdminIndexTs.tmpl,
        appLayoutsNavbarComponentHtml: appLayoutsNavbarComponentHtml.tmpl,
        appLayoutsNavbarComponentTs: appLayoutsNavbarComponentTs.tmpl,
        appAccountServiceTs: appAccountServiceTs.tmpl,
        e2eAdminSpecTs: e2eAdminSpecTs.tmpl,
        userMgmtDialogComponentSpecTs: userMgmtDialogComponentSpecTs.tmpl
    },
    server: {
        tenantResource: tenantResource.tmpl,
        tenantService: tenantService.tmpl
    }
};

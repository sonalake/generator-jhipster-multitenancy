const appAdminIndexTs = require('./angular/admin-index.ts.js');
const appLayoutsNavbarComponentHtml = require('./angular/navbar.component.html.js');
const appLayoutsNavbarComponentTs = require('./angular/navbar.component.ts.js');
const appSharedAuthPrincipalServiceTs = require('./angular/principal.service.ts.js');
const e2eAdminSpecTs = require('./angular/administration.spec.ts.js');

module.exports = {
    angular: {
        appAdminIndexTs: appAdminIndexTs.tmpl,
        appLayoutsNavbarComponentHtml: appLayoutsNavbarComponentHtml.tmpl,
        appLayoutsNavbarComponentTs: appLayoutsNavbarComponentTs.tmpl,
        appSharedAuthPrincipalServiceTs: appSharedAuthPrincipalServiceTs.tmpl,
        e2eAdminSpecTs: e2eAdminSpecTs.tmpl
    }
};

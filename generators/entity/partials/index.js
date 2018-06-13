const entityDetailCompHtml = require('./angular/entity-detail.component.html.js');
const entityDialogCompHtml = require('./angular/entity-dialog.component.html.js');
const entityDialogCompTsImports = require('./angular/entity-dialog.component.ts_imports.js');
const entityDialogCompTsOnInit = require('./angular/entity-dialog.component.ts_onInit.js');
const entityDialogCompTsConstr = require('./angular/entity-dialog.component.ts_constructor.js');
const entityDialogCompSpecTs = require('./angular/entity-dialog.component.spec.ts.js');
const tenantMgmtSpecTs = require('./angular/tenant-management.spec.ts.js');
const entitySpecTs1 = require('./angular/entity.spec.ts.1.js');
const entitySpecTs2 = require('./angular/entity.spec.ts.2.js');

module.exports = {
    angular: {
        entityDetailCompHtml: entityDetailCompHtml.tmpl,
        entityDialogCompHtml: entityDialogCompHtml.tmpl,
        entityDialogCompTsImports: entityDialogCompTsImports.tmpl,
        entityDialogCompTsOnInit: entityDialogCompTsOnInit.tmpl,
        entityDialogCompTsConstr: entityDialogCompTsConstr.tmpl,
        entityDialogCompSpecTs: entityDialogCompSpecTs.tmpl,
        tenantMgmtSpecTs: tenantMgmtSpecTs.tmpl,
        entitySpecTs1: entitySpecTs1.tmpl,
        entitySpecTs2: entitySpecTs2.tmpl
    }
};

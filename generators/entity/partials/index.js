const entityDetailCompHtml = require('./angular/entity-detail.component.html.js');
const entityUpdateCompHtml = require('./angular/entity-update.component.html.js');
const entityUpdateCompTsImports = require('./angular/entity-update.component.ts_imports.js');
const entityUpdateCompTsOnInit = require('./angular/entity-update.component.ts_onInit.js');
const entityUpdateCompTsConstr = require('./angular/entity-update.component.ts_constructor.js');
const entityUpdateCompSpecTs = require('./angular/entity-update.component.spec.ts.js');
const tenantMgmtSpecTs = require('./angular/tenant-management.spec.ts.js');
const entitySpecTs1 = require('./angular/entity.spec.ts.1.js');
const entitySpecTs2 = require('./angular/entity.spec.ts.2.js');

module.exports = {
    angular: {
        entityDetailCompHtml: entityDetailCompHtml.tmpl,
        entityUpdateCompHtml: entityUpdateCompHtml.tmpl,
        entityUpdateCompTsImports: entityUpdateCompTsImports.tmpl,
        entityUpdateCompTsOnInit: entityUpdateCompTsOnInit.tmpl,
        entityUpdateCompTsConstr: entityUpdateCompTsConstr.tmpl,
        entityUpdateCompSpecTs: entityUpdateCompSpecTs.tmpl,
        tenantMgmtSpecTs: tenantMgmtSpecTs.tmpl,
        entitySpecTs1: entitySpecTs1.tmpl,
        entitySpecTs2: entitySpecTs2.tmpl
    }
};

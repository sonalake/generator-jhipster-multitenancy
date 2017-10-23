const entityDetailCompHtml = require('./angular/entity-detail.component.html.js');
const entityDialogCompHtml = require('./angular/entity-dialog.component.html.js');
const entityDialogCompTsImports = require('./angular/entity-dialog.component.ts_imports.js');
const entityDialogCompTsOnInit = require('./angular/entity-dialog.component.ts_onInit.js');
const entityDialogCompTsConstr = require('./angular/entity-dialog.component.ts_constructor.js');

module.exports = {
    angular: {
        entityDetailCompHtml: entityDetailCompHtml.tmpl,
        entityDialogCompHtml: entityDialogCompHtml.tmpl,
        entityDialogCompTsImports: entityDialogCompTsImports.tmpl,
        entityDialogCompTsOnInit: entityDialogCompTsOnInit.tmpl,
        entityDialogCompTsConstr: entityDialogCompTsConstr.tmpl
    }
};

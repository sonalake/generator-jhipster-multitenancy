const mtUtils = require('../multitenancy-utils');

const angularTemplates = [
    'entity.model.ts',
    'entity.component.html',
    'entity-detail.component.html',
    'entity-update.component.html',
    'entity-update.component.ts'
] 

const angularTestTemplates = [
    'tenant-management.spec.ts',
] 

module.exports = {
    angular: {
        templates: function (context) {
            return mtUtils.requireTemplates('./entity-client/partials/angular/', angularTemplates, context);
        },
        testTemplates: function (context) {
            return mtUtils.requireTemplates('./entity-client/partials/angular/', angularTestTemplates, context);
        },
    }
};

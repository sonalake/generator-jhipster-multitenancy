const mtUtils = require('../multitenancy-utils');

const entityTenantAwareTemplates = [
    'entity.component.html',
    'entity-detail.component.html',
    'entity-update.component.html',
    'entity-update.component.ts',
    'entity-detail.component.ts'
];

const tenantTemplates = ['navbar.component.html', '_tenant.route.ts'];

module.exports = {
    entityTenantAwareTemplates(context) {
        return mtUtils.requireTemplates('./entity-client/partials/angular/', entityTenantAwareTemplates, context);
    },
    tenantTemplates(context) {
        return mtUtils.requireTemplates('./entity-client/partials/angular/', tenantTemplates, context);
    }
};

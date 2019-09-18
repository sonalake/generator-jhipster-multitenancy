const mtUtils = require('../multitenancy-utils');

const entityTenantAwareTemplates = [
    'entity.component.html',
    'entity-detail.component.html',
    'entity-update.component.html',
    'entity-update.component.ts'
]

const tenantTemplates = [
    'navbar.component.html',
    '_tenant.route.ts'
]

module.exports = {
    angular: {
        entityTenantAwareTemplatescontext {
            return mtUtils.requireTemplates('./entity-client/partials/angular/', entityTenantAwareTemplates, context);
        },
        tenantTemplatescontext {
            return mtUtils.requireTemplates('./entity-client/partials/angular/', tenantTemplates, context);
        }
    }
};

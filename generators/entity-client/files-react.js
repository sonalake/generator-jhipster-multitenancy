const mtUtils = require('../multitenancy-utils');

const tenantTemplates = ['entities.tsx', 'admin.tsx'];
const entityTenantAwareTemplates = ['entity-update.tsx', 'entity.tsx'];

module.exports = {
    tenantTemplates(context) {
        return mtUtils.requireTemplates('./entity-client/partials/react/', tenantTemplates, context);
    },
    entityTenantAwareTemplates(context) {
        return mtUtils.requireTemplates('./entity-client/partials/react/', entityTenantAwareTemplates, context);
    }
};

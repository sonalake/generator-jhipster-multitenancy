const mtUtils = require('../multitenancy-utils');

const tenantTemplates = ['entities.tsx', 'admin.tsx'];
<<<<<<< HEAD
const entityTenantAwareTemplates = ['entity-update.tsx', 'entity.tsx'];
=======
const entityTenantAwareTemplates = ['entity-detail.tsx', 'entity-update.tsx', 'entity.tsx'];
>>>>>>> 8ced7fa56a30ef4f5be876d6ac9b4b4948f45ce8

module.exports = {
    tenantTemplates(context) {
        return mtUtils.requireTemplates('./entity-client/partials/react/', tenantTemplates, context);
    },
    entityTenantAwareTemplates(context) {
        return mtUtils.requireTemplates('./entity-client/partials/react/', entityTenantAwareTemplates, context);
    }
};

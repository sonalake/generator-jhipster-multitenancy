const mtUtils = require('../multitenancy-utils');

const tenantTemplates = ['entities.tsx', 'admin.tsx'];

module.exports = {
    tenantTemplates: context => mtUtils.requireTemplates('./entity-client/partials/react/', tenantTemplates, context)
};

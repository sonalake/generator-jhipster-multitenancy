const mtUtils = require('../multitenancy-utils');

const reactTemplates = ['entities.tsx', 'admin.tsx'];

module.exports = {
    templates: context => mtUtils.requireTemplates('./entity-client/partials/react/', reactTemplates, context)
};

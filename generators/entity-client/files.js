const mtUtils = require('../multitenancy-utils');

const angularTemplates = [
    'entity.component.html',
    'entity-detail.component.html',
    'entity-update.component.html',
    'entity-update.component.ts'
]

module.exports = {
    angular: {
        templates: function (context) {
            return mtUtils.requireTemplates('./entity-client/partials/angular/', angularTemplates, context);
        }
    }
};

const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const mtUtils = require('../multitenancy-utils');

const angularTemplates = [
    'account.model.ts',
    'account.service.ts',
    'navbar.component.html',
    'navbar.component.ts',
] 


module.exports = {
    writeFiles,
    angular: {
        templates: function (context) {
            return mtUtils.requireTemplates('./client/partials/angular/', angularTemplates, context);
        },
    }
};

function writeFiles() {
    // configs for the template files
    const files = {
        userManagement: [
            {
                path: this.angularDir,
                templates: [
                    { file: 'admin/user-management/user-management.component.html', method: 'processHtml' },
                    { file: 'admin/user-management/user-management-detail.component.html', method: 'processHtml' },
                    { file: 'admin/user-management/user-management-update.component.ts', method: 'processJs' },
                    { file: 'admin/user-management/user-management-update.component.html', method: 'processHtml' },
                ]
            }
        ],
        shared: [
            {
                path: this.angularDir,
                templates: [
                    'core/user/user.model.ts'
                ]
            }
        ]
    };

    // parse the templates and write files to the appropriate locations
    this.writeFilesToDisk(files, this, false);
}

const mtUtils = require('../multitenancy-utils');

const reactTemplates = ['user-management-detail.tsx'];

module.exports = {
    writeFiles,
    templates: context => mtUtils.requireTemplates('./client/partials/react/', reactTemplates, context)
};

function writeFiles() {
    const files = {
        shared: [
            {
                path: this.reactDir,
                templates: [{ file: 'shared/model/user.model.ts', method: 'processJs' }]
            }
        ],
        userManagement: [
            {
                path: this.reactDir,
                templates: [{ file: 'modules/administration/user-management/user-management.tsx', method: 'processJs' }]
            },
            {
                path: this.reactDir,
                templates: [{ file: 'modules/administration/user-management/user-management-update.tsx', method: 'processJs' }]
            },
            {
                path: this.reactDir,
                templates: [{ file: 'modules/administration/user-management/user-management.reducer.ts', method: 'processJs' }]
            }
        ]
    };

    this.writeFilesToDisk(files, this, false, 'react');
}

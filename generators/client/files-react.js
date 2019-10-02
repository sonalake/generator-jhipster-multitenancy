const mtUtils = require('../multitenancy-utils');

const reactTemplates = ['user-management-detail.tsx', 'user-management.tsx'];

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
        ]
    };

    this.writeFilesToDisk(files, this, false, 'react');
}

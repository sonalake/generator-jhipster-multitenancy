const mtUtils = require('../multitenancy-utils');

const tenantTemplates = ['entities.tsx', 'admin.tsx'];

module.exports = {
    writeFiles,
    tenantTemplates: context => mtUtils.requireTemplates('./entity-client/partials/react/', tenantTemplates, context)
};

function writeFiles() {
    const files = {
        entities: [
            {
                path: this.reactDir,
                templates: [{ file: 'entities/blog/blog-update.tsx', method: 'processJs' }]
            }
        ]
    };

    this.writeFilesToDisk(files, this, false, 'react');
}

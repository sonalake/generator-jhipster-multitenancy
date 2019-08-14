const mtUtils = require('../multitenancy-utils');

const entityTenantAwareTemplates = [
    'Entity.java',
] 

const tenantTemplates = [
    '_TenantResource',
    '_TenantService',
    '_Tenant.java',
] 


module.exports = {
    writeFiles,
    partials: {
        entityTenantAwareTemplates: function (context) {
            return mtUtils.requireTemplates('./entity-server/partials/server/', entityTenantAwareTemplates, context);
        },
        tenantTemplates: function (context) {
            return mtUtils.requireTemplates('./entity-server/partials/server/', tenantTemplates, context);
        },
    }
};

function writeFiles() {
    const files = {
            templates:
                [{
                    condition: generator => generator.tenantAware,
                    path: this.SERVER_MAIN_SRC_DIR,
                    templates: [
                        {
                            file: 'package/_EntityAspect.java',
                            renameTo: generator => `${this.packageFolder}/aop/${this.tenantNameLowerFirst}/${this.entityClass}Aspect.java`
                        }
                        ]
                },
                {
                    condition: generator => generator.isTenant,
                    path: this.SERVER_MAIN_SRC_DIR,
                    templates: [
                        {
                            file: 'package/repository/_TenantRepository.java',
                            renameTo: generator => `${this.packageFolder}/repository/${this.tenantNameUpperFirst}Repository.java`
                        }
                        ]
                }],
    };

    // parse the templates and write files to the appropriate locations
    this.writeFilesToDisk(files, this, false);
}

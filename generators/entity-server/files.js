const mtUtils = require('../multitenancy-utils');

const entityTenantAwareTemplates = ['Entity.java'];

const tenantTemplates = ['_TenantResource', '_TenantService', '_Tenant.java'];

module.exports = {
    writeFiles,
    partials: {
        entityTenantAwareTemplates: context =>
            mtUtils.requireTemplates('./entity-server/partials/server/', entityTenantAwareTemplates, context),
        tenantTemplates: context => mtUtils.requireTemplates('./entity-server/partials/server/', tenantTemplates, context)
    }
};

function writeFiles() {
    this.tenantisedEntityServices = `@Before("execution(* ${this.packageName}.service.UserService.*(..))`;
    if (this.configOptions.tenantAwareEntities) {
        this.configOptions.tenantAwareEntities.forEach(tenantAwareEntity => {
            this.tenantisedEntityServices = `${this.tenantisedEntityServices  } || execution(* ${this.packageName}.service.${tenantAwareEntity}Service.*(..))`;
        });
    }
    this.tenantisedEntityServices = `${this.tenantisedEntityServices}")`;
    const files = {
        templates: [
            {
                condition: generator => generator.tenantAware,
                path: this.SERVER_MAIN_SRC_DIR,
                templates: [
                    {
                        file: 'package/_EntityAspect.java',
                        renameTo: `${this.packageFolder}/aop/${this.tenantNameLowerFirst}/${this.entityClass}Aspect.java`
                    }
                ]
            },
            {
                condition: generator => generator.isTenant,
                path: this.SERVER_MAIN_SRC_DIR,
                templates: [
                    {
                        file: 'package/repository/_TenantRepository.java',
                        renameTo: `${this.packageFolder}/repository/${this.tenantNameUpperFirst}Repository.java`
                    }
                ]
            },
            {
                condition: generator => generator.tenantAware,
                path: this.SERVER_MAIN_SRC_DIR,
                templates: [
                    {
                        file: 'package/aop/_tenant/_TenantAspect.java',
                        renameTo: `${this.packageFolder}/aop/${this.tenantNameLowerFirst}/${this.tenantNameUpperFirst}Aspect.java`
                    }
                ]
            }
        ]
    };

    // parse the templates and write files to the appropriate locations
    this.writeFilesToDisk(files, this, false);
}

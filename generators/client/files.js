const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const mtUtils = require('../multitenancy-utils');

const angularTemplates = [
    'account.model.ts',
    'account.service.ts',
    'admin-index.ts',
    'administration.spec.ts',
    'core_index.ts',
    'navbar.component.html',
    'navbar.component.ts',
    'shared_index.ts',
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
        tenantManagement: [
            {
                path: this.angularDir,
                templates: [
                    {
                        file: 'admin/tenant-management/_tenant-management.component.html',
                        method: 'processHtml',
                        template: true,
                        renameTo: generator => `admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management.component.html`
                    },
                    {
                        file: 'admin/tenant-management/_tenant-management-detail.component.html',
                        method: 'processHtml',
                        template: true,
                        renameTo: generator => `admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-detail.component.html`
                    },
                    {
                        file: 'admin/tenant-management/_tenant-management-delete-dialog.component.html',
                        method: 'processHtml',
                        template: true,
                        renameTo: generator => `admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-delete-dialog.component.html`
                    },
                    {
                        file: 'admin/tenant-management/_tenant-management.route.ts',
                        renameTo: generator => `admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management.route.ts`
                    },
                    {
                        file: 'admin/tenant-management/_tenant.model.ts',
                        renameTo: generator => `admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}.model.ts`
                    },
                    {
                        file: 'admin/tenant-management/_tenant-management.component.ts',
                        renameTo: generator => `admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management.component.ts`
                    },
                    {
                        file: 'admin/tenant-management/_tenant-management-delete-dialog.component.ts',
                        renameTo: generator => `admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-delete-dialog.component.ts`
                    },
                    {
                        file: 'admin/tenant-management/_tenant-management-detail.component.ts',
                        renameTo: generator => `admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-detail.component.ts`
                    },
                    {
                        file: 'shared/tenant/_tenant.service.ts',
                        renameTo: generator => `shared/${this.tenantNameLowerFirst}/${this.tenantNameLowerFirst}.service.ts`
                    },
                    {
                        file: 'admin/tenant-management/_tenant-management-update.component.ts',
                        renameTo: generator => `admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-update.component.ts`
                    },
                    {
                        file: 'admin/tenant-management/_tenant-management-update.component.html',
                        renameTo: generator => `admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-update.component.html`
                    }
                ]
            }
        ],
        admin: [
            {
                path: this.angularDir,
                templates: [
                    { file: 'admin/admin.route.ts', method: 'processJs' },
                    'admin/admin.module.ts',
                ]
            }
        ],
        shared: [
            {
                path: this.angularDir,
                templates: [
                    {
                        file: 'core/auth/_tenant-route-access-service.ts',
                        renameTo: generator => `core/auth/${this.tenantNameLowerFirst}-route-access-service.ts`
                    },
                    'shared/user/user.model.ts',
                    'core/user/user.model.ts'
                ]
            }

        ],
        tests: [
            {
                path: this.CLIENT_TEST_SRC_DIR,
                templates: [
                    {
                        file: 'spec/app/admin/_tenant-management-detail.component.spec.ts',
                        renameTo: generator => `spec/app/admin/${this.tenantNameLowerFirst}-management-detail.component.spec.ts`
                    }
                ]
            },
            {
                condition: generator => generator.protractorTests,
                path: this.CLIENT_TEST_SRC_DIR,
                templates: [
                    {
                        file: 'e2e/admin/_tenant-management.spec.ts',
                        renameTo: generator => `e2e/admin/${this.tenantNameLowerFirst}-management.spec.ts`
                    }
                ]
            },
            {
                condition: generator => generator.protractorTests,
                path: this.CLIENT_TEST_SRC_DIR,
                templates: [
                    {
                        file: 'e2e/admin/_tenant-management.page-object.ts',
                        renameTo: generator => `e2e/admin/${this.tenantNameLowerFirst}-management.page-object.ts`
                    }
                ]
            }
        ]
    };

    // parse the templates and write files to the appropriate locations
    this.writeFilesToDisk(files, this, false);
}

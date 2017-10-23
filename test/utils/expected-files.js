const constants = require('../../node_modules/generator-jhipster/generators/generator-constants');

const CLIENT_MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const CLIENT_TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;
const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
const SERVER_TEST_SRC_DIR = constants.SERVER_TEST_SRC_DIR;

const expectedFiles = {

    server: [
        '.jhipster/Company.json',
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/User.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/dto/UserDTO.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/dto/UserDTO.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/vm/ManagedUserVM.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/web/rest/UserResourceIntTest.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/web/rest/AccountResourceIntTest.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/aop/company/CompanyAspect.java`,
    ],
    i18nNew: [
        `${CLIENT_MAIN_SRC_DIR}i18n/en/company-management.json`,
    ],
    companyManagement: [
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company.model.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company.service.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company-modal.service.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company-management.component.html`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company-management.component.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company-management.route.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company-management-delete-dialog.component.html`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company-management-delete-dialog.component.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company-management-detail.component.html`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company-management-detail.component.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company-management-dialog.component.html`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/company-management/company-management-dialog.component.ts`
    ],
    userManagement: [
        `${CLIENT_MAIN_SRC_DIR}app/admin/user-management/user-management-detail.component.html`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/user-management/user-management-dialog.component.html`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/user-management/user-management-dialog.component.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/user-management/user-management.component.html`
    ],
    admin: [
        `${CLIENT_MAIN_SRC_DIR}app/admin/admin.module.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/admin/admin.route.ts`
    ],
    shared: [
        `${CLIENT_MAIN_SRC_DIR}app/shared/auth/company-route-access-service.ts`
    ],
    tests: [
        `${CLIENT_TEST_SRC_DIR}spec/app/admin/company-management-detail.component.spec.ts`,
        `${CLIENT_TEST_SRC_DIR}e2e/admin/company-management.spec.ts`
    ],
    updatedFiles: [
        `${CLIENT_MAIN_SRC_DIR}app/admin/index.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/app.module.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/layouts/navbar/navbar.component.html`,
        `${CLIENT_MAIN_SRC_DIR}app/layouts/navbar/navbar.component.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/shared/auth/principal.service.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/shared/index.ts`,
        `${CLIENT_TEST_SRC_DIR}e2e/admin/administration.spec.ts`,
        `${CLIENT_MAIN_SRC_DIR}i18n/en/global.json`
    ],
    entityFiles: [
        `${CLIENT_MAIN_SRC_DIR}app/entities/ent/ent-dialog.component.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/entities/ent/ent-detail.component.html`,
        `${CLIENT_MAIN_SRC_DIR}app/entities/ent/ent-dialog.component.html`,
        `${CLIENT_MAIN_SRC_DIR}app/entities/ent/ent.model.ts`,
        `${CLIENT_MAIN_SRC_DIR}app/entities/ent/ent.component.html`,
        `${CLIENT_MAIN_SRC_DIR}i18n/en/ent.json`
    ]
};

module.exports = expectedFiles;

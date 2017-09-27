const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require('../../package.json');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const jhipsterUtils = require('generator-jhipster/generators/utils');
const _ = require('lodash');
const mtUtils = require('../multitenancy-utils');

const JhipsterGenerator = generator.extend({});
util.inherits(JhipsterGenerator, BaseGenerator);

module.exports = JhipsterGenerator.extend({
    initializing: {
        // read in the jhipster config and set up vars for use in templates
        readConfig() {
            this.jhipsterAppConfig = this.getJhipsterAppConfig();
            if (!this.jhipsterAppConfig) {
                this.error('Can\'t read .yo-rc.json');
            }
            mtUtils.readConfig(this.jhipsterAppConfig, this);

            this.angularXAppName = this.getAngularXAppName();
            this.jhiPrefixCapitalized = _.upperFirst(this.jhiPrefix);
            this.skipUserManagement = this.options['skip-user-management'] || this.config.get('skipUserManagement');

            // set some appropriate defaults (i.e. what jhipster does)
            if (this.enableTranslation === undefined) {
                this.enableTranslation = true;
            }
            if (this.nativeLanguage === undefined) {
                this.nativeLanguage = 'en';
            }
            if (this.languages === undefined) {
                this.languages = ['en', 'fr'];
            }
            // set primary key type
            if (this.databaseType === 'cassandra' || this.databaseType === 'mongodb') {
                this.pkType = 'String';
            } else {
                this.pkType = 'Long';
            }
        },
        // display the logo and greeting
        displayLogo() {
            this.log('\n');
            this.log(`${chalk.green('        ██╗')}${chalk.red(' ██╗   ██╗ ████████╗ ███████╗   ██████╗ ████████╗ ████████╗ ███████╗')}`);
            this.log(`${chalk.green('        ██║')}${chalk.red(' ██║   ██║ ╚══██╔══╝ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██╔═════╝ ██╔═══██╗')}`);
            this.log(`${chalk.green('        ██║')}${chalk.red(' ████████║    ██║    ███████╔╝ ╚█████╗     ██║    ██████╗   ███████╔╝')}`);
            this.log(`${chalk.green('  ██╗   ██║')}${chalk.red(' ██╔═══██║    ██║    ██╔════╝   ╚═══██╗    ██║    ██╔═══╝   ██╔══██║')}`);
            this.log(`${chalk.green('  ╚██████╔╝')}${chalk.red(' ██║   ██║ ████████╗ ██║       ██████╔╝    ██║    ████████╗ ██║  ╚██╗')}`);
            this.log(`${chalk.green('   ╚═════╝ ')}${chalk.red(' ╚═╝   ╚═╝ ╚═══════╝ ╚═╝       ╚═════╝     ╚═╝    ╚═══════╝ ╚═╝   ╚═╝')}\n`);
            this.log(chalk.white.bold('                               Multitenancy Module\n'));
            this.log(chalk.white('Welcome to the JHipster Multitenancy Generator ') + chalk.yellow(`v${packagejs.version}\n`));
        },
        // check the jhipster version and display an appropriate warning if needed
        checkJhipster() {
            const jhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
            const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
            if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
                this.warning(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
            }
        },
        // checks that the project is compatible with this generator
        validateCompatibility() {
            // validate project has the correct db type
            if (_.toLower(this.databaseType) !== 'sql') {
                this.error('This module currently only supports SQL DB types\n');
            }

            // validate project has the correct angular version
            if (_.toLower(this.clientFramework) !== 'angularx') {
                this.error('This module currently only supports Angular 4+\n');
            }
        }
    },

    prompting() {
        const prompts = [
            {
                name: 'tenantName',
                message: 'What is the alias given tenants in your application?',
                default: 'Company',
                validate: (input) => {
                    if (_.toLower(input) === 'account') {
                        return `${input} is a reserved word.`;
                    }
                    return true;
                }
            }
        ];

        const done = this.async();
        this.prompt(prompts).then((props) => {
            // To access props later use this.props.someOption;
            this.props = props;
            done();
        });
    },

    writing: {
        // sets up all the variables we'll need for the templating
        setUpVariables() {
            // function to use directly template
            this.template = function (source, destination) {
                this.fs.copyTpl(
                    this.templatePath(source),
                    this.destinationPath(destination),
                    this
                );
            };

            // references to the various directories we'll be copying files to
            this.javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
            this.resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
            this.webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
            this.testDir = jhipsterConstants.SERVER_TEST_SRC_DIR + this.packageFolder;
            this.clientTestDir = jhipsterConstants.CLIENT_TEST_SRC_DIR;

            // template variables
            mtUtils.tenantVariables(this.props.tenantName, this);
            this.tenantisedEntitesResources = `@Before(\"execution(* ${this.packageName}.web.rest.UserResource.*(..))\")`;            
            this.mainClass = this.getMainClassName();
            this.changelogDate = this.dateFormatForLiquibase();
        },
        // make the necessary server code changes
        generateServerCode() {
            // copy .json entity file to project (will be sent to the entity generator in the next phase)
            this.template('.jhipster/_Tenant.json', `.jhipster/${this.tenantNameUpperFirst}.json`);

            // update user object and associated tests
            this.template('src/main/java/package/domain/_User.java', `${this.javaDir}domain/User.java`);
            this.template('src/main/java/package/service/dto/_UserDTO.java', `${this.javaDir}service/dto/UserDTO.java`);
            this.template('src/main/java/package/web/rest/vm/_ManagedUserVM.java', `${this.javaDir}web/rest/vm/ManagedUserVM.java`);
            this.template('src/main/java/package/web/rest/_UserResource.java', `${this.javaDir}web/rest/UserResource.java`);
            console.log("version", this.jhipsterAppConfig.jhipsterVersion);
            if(this.jhipsterAppConfig.jhipsterVersion >= '4.8.0') {
                this.template('src/main/java/package/repository/4.8.0_UserRepository.java', `${this.javaDir}repository/UserRepository.java`);
                this.template('src/main/java/package/service/4.8.0_UserService.java', `${this.javaDir}service/UserService.java`);
            }  else {
                this.template('src/main/java/package/repository/4.7.0_UserRepository.java', `${this.javaDir}repository/UserRepository.java`);
                this.template('src/main/java/package/service/4.7.0_UserService.java', `${this.javaDir}service/UserService.java`);
            }

            // integration tests
            this.template('src/test/java/package/web/rest/UserResourceIntTest.java', `${this.testDir}/web/rest/UserResourceIntTest.java`);
            this.template('src/test/java/package/web/rest/AccountResourceIntTest.java', `${this.testDir}/web/rest/AccountResourceIntTest.java`);

            // database changes
            this.template('src/main/resources/config/liquibase/changelog/_user_tenant_constraints.xml', `${this.resourceDir}config/liquibase/changelog/${this.changelogDate}__user_${this.tenantNameUpperFirst}_constraints.xml`);
            this.addChangelogToLiquibase(`${this.changelogDate}__user_${this.tenantNameUpperFirst}_constraints`);

            // copy over aspect
            this.template('src/main/java/package/aop/_tenant/_TenantAspect.java', `${this.javaDir}aop/${this.tenantNameLowerFirst}/${this.tenantNameUpperFirst}Aspect.java`);
        },
        // make the necessary client code changes and adds the tenant UI
        generateClientCode() {
            // User Management Admin
            this.template('src/main/webapp/user-management/_user-management-detail.component.html', `${this.webappDir}app/admin/user-management/user-management-detail.component.html`);
            this.template('src/main/webapp/user-management/_user-management-dialog.component.html', `${this.webappDir}app/admin/user-management/user-management-dialog.component.html`);
            this.template('src/main/webapp/user-management/_user-management-dialog.component.ts', `${this.webappDir}app/admin/user-management/user-management-dialog.component.ts`);
            this.template('src/main/webapp/user-management/_user-management.component.html', `${this.webappDir}app/admin/user-management/user-management.component.html`);

            // Tenant Management Admin
            this.template('src/main/webapp/tenant-management/_tenant-management-delete-dialog.component.html', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-delete-dialog.component.html`);
            this.template('src/main/webapp/tenant-management/_tenant-management-delete-dialog.component.ts', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-delete-dialog.component.ts`);
            this.template('src/main/webapp/tenant-management/_tenant-management-detail.component.html', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-detail.component.html`);
            this.template('src/main/webapp/tenant-management/_tenant-management-detail.component.ts', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-detail.component.ts`);
            this.template('src/main/webapp/tenant-management/_tenant-management-dialog.component.html', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-dialog.component.html`);
            this.template('src/main/webapp/tenant-management/_tenant-management-dialog.component.ts', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-dialog.component.ts`);
            this.template('src/main/webapp/tenant-management/_tenant-management.component.html', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management.component.html`);
            this.template('src/main/webapp/tenant-management/_tenant-management.component.ts', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management.component.ts`);
            this.template('src/main/webapp/tenant-management/_tenant-management.route.ts', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management.route.ts`);
            this.template('src/main/webapp/tenant-management/_tenant-modal.service.ts', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-modal.service.ts`);
            this.template('src/main/webapp/tenant-management/_tenant.service.ts', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}.service.ts`);
            this.template('src/main/webapp/tenant-management/_tenant.model.ts', `${this.webappDir}app/admin/${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}.model.ts`);

            // Admin Files
            this.template('src/main/webapp/_admin.module.ts', `${this.webappDir}app/admin/admin.module.ts`);

            this.template('src/main/webapp/_admin.route.ts', `${this.webappDir}app/admin/admin.route.ts`);
            this.template('src/main/webapp/tenant-management/_tenant-route-access-service.ts', `${this.webappDir}app/shared/auth/${this.tenantNameLowerFirst}-route-access-service.ts`);

            this.rewriteFile(`${this.webappDir}app/admin/index.ts`,
                `export * from './admin.route';`,
                `export * from './${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management.component';
        export * from './${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-detail.component';
        export * from './${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-dialog.component';
        export * from './${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management-delete-dialog.component';
        export * from './${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-modal.service';
        export * from './${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-management.route';
        export * from './${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}.service';
        export * from './${this.tenantNameLowerFirst}-management/${this.tenantNameLowerFirst}-modal.service';`
            );

            // Misc. Files
            this.template('src/main/webapp/user/_user.model.ts', `${this.webappDir}app/shared/user/user.model.ts`);
            this.rewriteFile(`${this.webappDir}app/shared/index.ts`, `export * from './auth/user-route-access-service';`, `export * from './auth/${this.tenantNameLowerFirst}-route-access-service';`);
            this.replaceContent(`${this.webappDir}app/app.module.ts`, `UserRouteAccessService } from './shared';`, `UserRouteAccessService, ${this.tenantNameUpperFirst}RouteAccessService } from './shared';`, 'false');
            this.rewriteFile(`${this.webappDir}app/app.module.ts`, `customHttpProvider(),`, `${this.tenantNameUpperFirst}RouteAccessService,`);

            this.rewriteFile(`${this.webappDir}app/layouts/navbar/navbar.component.html`,
                'jhipster-needle-add-element-to-admin-menu',
                `<li [hidden]="has${this.tenantNameUpperFirst}()">
                        <a class="dropdown-item" routerLink="${this.tenantNameLowerFirst}-management" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.admin.${this.tenantNameLowerFirst}-management">${this.tenantNameUpperFirst} Management</span>
                        </a>
                    </li>`
            );

            this.rewriteFile(`${this.webappDir}app/layouts/navbar/navbar.component.ts`,
                `getImageUrl() {`,
                `has${this.tenantNameUpperFirst}() {
            return this.principal.get${this.tenantNameUpperFirst}() ? true : false;
        }`
            );

            this.rewriteFile(`${this.webappDir}app/shared/auth/principal.service.ts`,
                `getImageUrl(): String {`,
                `get${this.tenantNameUpperFirst}(): String {
        return this.isIdentityResolved() ? this.userIdentity.${this.tenantNameLowerFirst} : null;
    }\n`
            );

            // UI tests
            this.rewriteFile(`${this.clientTestDir}e2e/admin/administration.spec.ts`,
                `it('should load metrics', () => {`,
                `it('should load ${this.tenantNameLowerFirst} management', () => {
        navBarPage.clickOnAdmin("${this.tenantNameLowerFirst}-management");
        const expect1 = /${this.tenantNameLowerFirst}Management.home.title/;
        element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });\n`
            );

            this.template('src/main/webapp/tenant-management/test/_tenant-management-detail.component.spec.ts', `${this.clientTestDir}spec/app/admin/${this.tenantNameLowerFirst}-management-detail.component.spec.ts`);
            this.template('src/main/webapp/tenant-management/test/_tenant-management.spec.ts', `${this.clientTestDir}e2e/admin/${this.tenantNameLowerFirst}-management.spec.ts`);
        },
        // makes the necessary changes to the i18n files and adds files for tenant management
        generateLanguageFiles() {
            this.addTranslationKeyToAllLanguages(`userManagement${this.tenantNameUpperFirst}`, `${this.tenantNameUpperFirst}`, 'addGlobalTranslationKey', this.enableTranslation);
            this.template('src/main/webapp/tenant-management/_tenant-management.json', `${this.webappDir}i18n/en/${this.tenantNameLowerFirst}-management.json`);
            jhipsterUtils.rewriteJSONFile(`${this.webappDir}i18n/en/global.json`, (jsonObj) => {
                jsonObj.global.menu.admin[`${this.tenantNameLowerFirst}-management`] = `${this.tenantNameUpperFirst} Management`;
            }, this);
        },
        // registers sub-generators with the jhipster generator hooks
        registerModuleHooks() {
            try {
                this.registerModule('generator-jhipster-multitenancy', 'entity', 'post', 'entity', '');
            } catch (err) {
                this.log(`${chalk.red.bold('WARN!')} Could not register as a jhipster entity post creation hook...\n`);
            }
        }
    },

    install() {
        // store the tenantName variable in the .yo-rc
        this.config.set('tenantName', this.tenantName);

        // generate backend code using jhipster's entity generator
        this.composeWith('jhipster:entity', {
            regenerate: true,
            'skip-install': true,
            'skip-client': true,
            'skip-server': false,
            'no-fluent-methods': false,
            'skip-user-management': false,
            arguments: [this.tenantName],
        });

        // install dependencies
        const logMsg = `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;
        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            }
        };
        const installConfig = {
            bower: this.clientFramework === 'angular1',
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        if (this.options['skip-install']) {
            this.log(logMsg);
        } else {
            this.installDependencies(installConfig);
        }
    },

    end() {
        this.log(chalk.green('\nTenant entity generated successfully.'));
        this.log(chalk.white.bold('Your application now supports multitenancy.\n'));
    }
});

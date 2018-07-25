const util = require('util');
const chalk = require('../../../../.cache/typescript/2.9/node_modules/chalk');
const generator = require('yeoman-generator');
const packagejs = require('../../package.json');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const _ = require('lodash');
const mtUtils = require('../multitenancy-utils');
const partialFiles = require('./partials');

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
            this.angularAppName = this.getAngularAppName();
            this.cacheManagerIsAvailable = ['ehcache', 'hazelcast', 'infinispan', 'memcached'].includes(this.cacheProvider);
            this.jhiTablePrefix = this.getTableName(this.jhiPrefix);
            this.jhiPrefixCapitalized = _.upperFirst(this.jhiPrefix);
            this.jhiPrefixDashed = _.kebabCase(this.jhiPrefix);
            this.skipUserManagement = this.options['skip-user-management'] || this.config.get('skipUserManagement');
            this.protractorTests = this.testFrameworks.indexOf('protractor') !== -1;

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
        // check the jhipster version and display an appropriate warning if needed
        checkJhipster() {
            const jhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
            const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
            if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
                this.error(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
            }
        },
        // check the jhipster-multitenancy module is already installed
        checkIfInstalled() {
            const multitenancyConfig = this.getJhipsterAppConfig('generator-jhipster-multitenancy');
            if (multitenancyConfig !== false) {
                this.error('\nThis module is already installed.\n');
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
            this.angularDir = jhipsterConstants.ANGULAR_DIR;
            this.testDir = jhipsterConstants.SERVER_TEST_SRC_DIR + this.packageFolder;
            this.clientTestDir = jhipsterConstants.CLIENT_TEST_SRC_DIR;

            // template variables
            mtUtils.tenantVariables(this.props.tenantName, this);
            this.tenantisedEntityServices = `@Before("execution(* ${this.packageName}.service.UserService.*(..))")`;
            this.mainClass = this.getMainClassName();
            this.changelogDate = this.dateFormatForLiquibase();
        },
        // make the necessary server code changes
        generateServerCode() {
            // copy .json entity file to project (will be sent to the entity generator in the next phase)
            this.template('.jhipster/_Tenant.json', `.jhipster/${this.tenantNameUpperFirst}.json`);

            // update user object
            this.template('src/main/java/package/domain/_User.java', `${this.javaDir}domain/User.java`);
            this.template('src/main/java/package/service/dto/_UserDTO.java', `${this.javaDir}service/dto/UserDTO.java`);
            this.template('src/main/java/package/web/rest/vm/_ManagedUserVM.java', `${this.javaDir}web/rest/vm/ManagedUserVM.java`);
            this.template('src/main/java/package/service/_UserService.java', `${this.javaDir}service/UserService.java`);

            // integration tests
            this.template('src/test/java/package/web/rest/_UserResourceIntTest.java', `${this.testDir}/web/rest/UserResourceIntTest.java`);

            // database changes
            this.template('src/main/resources/config/liquibase/changelog/_user_tenant_constraints.xml', `${this.resourceDir}config/liquibase/changelog/${this.changelogDate}__user_${this.tenantNameUpperFirst}_constraints.xml`);
            this.addChangelogToLiquibase(`${this.changelogDate}__user_${this.tenantNameUpperFirst}_constraints`);

            // copy over aspect
            this.template('src/main/java/package/aop/_tenant/_TenantAspect.java', `${this.javaDir}aop/${this.tenantNameLowerFirst}/${this.tenantNameUpperFirst}Aspect.java`);
        },
        // make the necessary client code changes and adds the tenant UI
        generateClientCode() {
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
                        path: this.clientTestDir,
                        templates: [
                            {
                                file: 'spec/app/admin/_tenant-management-detail.component.spec.ts',
                                renameTo: generator => `spec/app/admin/${this.tenantNameLowerFirst}-management-detail.component.spec.ts`
                            }
                        ]
                    },
                    {
                        condition: generator => generator.protractorTests,
                        path: this.clientTestDir,
                        templates: [
                            {
                                file: 'e2e/admin/_tenant-management.spec.ts',
                                renameTo: generator => `e2e/admin/${this.tenantNameLowerFirst}-management.spec.ts`
                            }
                        ]
                    }
                ]
            };

            // parse the templates and write files to the appropriate locations
            this.writeFilesToDisk(files, this, false);

            // Rewrites to existing files
            this.replaceContent(
                `${this.webappDir}app/app.module.ts`,
                'UserRouteAccessService } from \'./shared\';',
                `UserRouteAccessService, ${this.tenantNameUpperFirst}RouteAccessService } from './shared';`,
                'false'
            );
            this.rewriteFile(
                `${this.webappDir}app/core/index.ts`,
                'export * from \'./auth/user-route-access-service\';',
                `export * from './auth/${this.tenantNameLowerFirst}-route-access-service';`
            );
            this.rewriteFile(
                `${this.webappDir}app/admin/index.ts`,
                'export * from \'./admin.route\';',
                partialFiles.angular.appAdminIndexTs(this)
            );
            this.rewriteFile(
                `${this.webappDir}app/layouts/navbar/navbar.component.html`,
                'jhipster-needle-add-element-to-admin-menu',
                partialFiles.angular.appLayoutsNavbarComponentHtml(this)
            );
            this.rewriteFile(
                `${this.webappDir}app/layouts/navbar/navbar.component.ts`,
                'getImageUrl() {',
                partialFiles.angular.appLayoutsNavbarComponentTs(this)
            );
            this.rewriteFile(
                `${this.webappDir}app/core/auth/principal.service.ts`,
                'getImageUrl(): string {',
                partialFiles.angular.appSharedAuthPrincipalServiceTs(this)
            );
            this.rewriteFile(
                `${this.webappDir}app/shared/index.ts`,
                'export * from \'./util/datepicker-adapter\';',
                `export * from './${this.tenantNameLowerFirst}/${this.tenantNameLowerFirst}.service';`
            );

            // Rewriting on tests
            if (this.protractorTests) {
                this.rewriteFile(
                    `${this.clientTestDir}e2e/admin/administration.spec.ts`,
                    'it(\'should load metrics\', () => {',
                    partialFiles.angular.e2eAdminSpecTs(this)
                );
            }
        },
        // makes the necessary changes to the i18n files and adds files for tenant management
        generateLanguageFiles() {
            if (this.enableTranslation) {
                this.addTranslationKeyToAllLanguages(`${this.tenantNameLowerFirst}-management`, `${this.tenantNameUpperFirst} Management`, 'addAdminElementTranslationKey', this.enableTranslation);
                this.addTranslationKeyToAllLanguages(`userManagement${this.tenantNameUpperFirst}`, `${this.tenantNameUpperFirst}`, 'addGlobalTranslationKey', this.enableTranslation);

                // TODO: generate this file for each language
                this.template('src/main/webapp/i18n/en/_tenant-management.json', `${this.webappDir}i18n/en/${this.tenantNameLowerFirst}-management.json`);
            }
        }
    },

    install() {
        // registers sub-generators with the jhipster generator hooks
        try {
            this.registerModule('generator-jhipster-multitenancy', 'entity', 'post', 'entity', '');
        } catch (err) {
            this.log(`${chalk.red.bold('WARN!')} Could not register as a jhipster entity post creation hook...\n`);
        }

        // store the tenantName variable in the .yo-rc
        this.config.set('tenantName', this.tenantName);

        // generate backend code using jhipster's entity generator
        this.composeWith(require.resolve('generator-jhipster/generators/entity'), {
            regenerate: true,
            'skip-install': true,
            'skip-client': true,
            'skip-server': false,
            'no-fluent-methods': false,
            'skip-user-management': false,
            arguments: [this.tenantName],
        });
    },
    end() {
        // update generated files
        this.replaceContent(
            `${this.javaDir}service/${this.tenantNameUpperFirst}Service.java`,
            `return ${this.tenantNameLowerFirst}Repository.findById(id);`,
            partialFiles.server.tenantService(this),
            false
        );

        this.replaceContent(`${this.javaDir}domain/${this.tenantNameUpperFirst}.java`,
        `    @OneToMany(mappedBy = "'${this.tenantNameLowerFirst}'")`,
        `\t@OneToMany(mappedBy = "'${this.tenantNameLowerFirst}'", fetch = FetchType.EAGER)`);

        this.rewriteFile(`${this.javaDir}web/rest/${this.tenantNameUpperFirst}Resource.java`,
            `${this.tenantNameLowerFirst}Service.delete(id);`,
            partialFiles.server.tenantResource(this)
        );

        this.template(`src/main/java/package/repository/_TenantRepository.java`,
        `${this.javaDir}repository/${this.tenantNameUpperFirst}Repository.java`);

        this.log(chalk.green('\nTenant entity generated successfully.'));
        this.log(chalk.green('Your application now supports multitenancy.\n'));
        this.log(chalk.green('To make existing entities tenant aware use: ') + chalk.yellow('yo jhipster-multitenancy:entity Book'));
        this.log(chalk.green('All new entities can be made tenant aware on entity creation using: ') + chalk.yellow('yo jhipster:entity Book\n'));
    }
});

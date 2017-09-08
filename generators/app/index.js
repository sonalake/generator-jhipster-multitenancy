const chalk = require('chalk');
const _ = require('lodash');
const pluralize = require('pluralize');
const generator = require('yeoman-generator');
const packagejs = require('../../package.json');
const util = require('util');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const JhipsterGenerator = generator.extend({});
util.inherits(JhipsterGenerator, BaseGenerator);

// Stores JHipster variables
const jhipsterVar = { moduleName: 'multitenancy' };

// Stores JHipster functions
const jhipsterFunc = {};

module.exports = JhipsterGenerator.extend({

    initializing: {
        compose() {
            this.composeWith('jhipster:modules',
                { jhipsterVar, jhipsterFunc },
                this.options.testmode ? { local: require.resolve('generator-jhipster/generators/generator-base') } : null
            );
        },
        displayLogo() {
            // Have Yeoman greet the user.
            this.log(`Welcome to the ${chalk.bold.yellow('JHipster multitenancy')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
        }
    },
    prompting() {
        const isInstalled = this.config.get('isInstalled');
        const done = this.async();

        if (isInstalled) {
            this.log(chalk.blue('This module is already installed!'));
            process.exit(1);
        }
        if (jhipsterVar.clientFramework !== 'angular2') {
            this.log(chalk.red('Error! The JHipster multitenancy module only works with Angular 4'));
            process.exit(1);
        }
        if (jhipsterVar.databaseType !== 'sql') {
            this.log(chalk.red('Error! The JHipster multitenancy module only works with sql databases'));
            process.exit(1);
        }
        if (jhipsterVar.enableTranslation !== true) {
            this.log(chalk.red('Error! The JHipster multitenancy module only works when translation (i18n) is enabled'));
            process.exit(1);
        }

        const prompts = [
            {
                type: 'input',
                name: 'tenantName',
                message: 'What is the alias given tenants in your application?',
                default: 'Company',
                validate: function (input) {
                    if (_.toLower(input) === "account") {
                        return input + " is a reserved word.";
                    }
                    return true;
                }
            }
        ];

        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;
            done();
        });
    },
    configuring: {
        saveConfig() {
            //                   this.config.set('isInstalled', true);

        }
    },
    writing() {
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        this.baseName = jhipsterVar.baseName;
        this.packageName = jhipsterVar.packageName;
        this.packageFolder = jhipsterVar.packageFolder;
        this.angularAppName = jhipsterVar.angularAppName;
        this.javaAppName = _.upperFirst(this.baseName) + 'App';
        this.clientFramework = jhipsterVar.clientFramework;
        this.clientPackageManager = jhipsterVar.clientPackageManager;
        const javaDir = jhipsterVar.javaDir;
        const testDir = jhipsterConstants.SERVER_TEST_SRC_DIR + this.packageFolder;
        const resourceDir = jhipsterVar.resourceDir;
        const webappDir = jhipsterVar.webappDir;

        /* tenant variables */
        this.tenantName = _.camelCase(this.props.tenantName);
        this.tenantNameUpperCase = _.toUpper(this.tenantName);
        this.tenantNameLowerCase = _.toLower(this.tenantName);        
        this.tenantNameLowerFirst = _.lowerFirst(this.tenantName);
        this.tenantNameUpperFirst = _.upperFirst(this.tenantName);
        this.tenantNameSpinalCased = _.kebabCase(this.tenantNameLowerFirst);
        
        // copy .json entity file to project
        this.copy('.jhipster/_tenant.json', `.jhipster/${this.tenantNameUpperFirst}.json`);
        this.tenantJson = jhipsterFunc.getEntityJson(this.tenantNameUpperFirst);
        // overwrite the placeholder text with the alias set by user
        this.tenantJson.relationships[0].otherEntityRelationshipName = this.tenantNameLowerFirst;
        this.fs.writeJSON(`.jhipster/${this.tenantNameUpperFirst}.json`, this.tenantJson, null, 4);

        // update user object and associated tests
        this.template('src/main/java/package/domain/_User.java', `${javaDir}domain/User.java`);        
        this.template('src/test/java/package/web/rest/_UserResourceIntTest.java', `${testDir}/web/rest/UserResourceIntTest.java`);

        this.changelogDate = jhipsterFunc.dateFormatForLiquibase();
        this.template('src/main/resources/config/liquibase/changelog/_user_tenant_constraints.xml', `${resourceDir}config/liquibase/changelog/${this.changelogDate}__user_${this.tenantNameUpperFirst}_constraints.xml`);
        this.template('src/main/resources/config/liquibase/authorities.csv', `${resourceDir}config/liquibase/authorities.csv`);
        jhipsterFunc.addChangelogToLiquibase(`${this.changelogDate}__user_${this.tenantNameUpperFirst}_constraints`);

        // copy over aspect
        this.template('src/main/java/package/aop/_tenant/_TenantAspect.java', `${javaDir}aop/${this.tenantNameLowerFirst}/${this.tenantNameUpperFirst}Aspect.java`);        
        
        this.regenerateTenant = function (tenantName) {
            this.composeWith('jhipster:entity', {
                regenerate: true,
                'skip-install': true,
                'skip-client': false,
                'skip-server': false,
                'no-fluent-methods': false,
                'skip-user-management': false,
                arguments: [tenantName],
            });
        }
    },
    install() {
        this.regenerateTenant(this.tenantNameLowerFirst);
        let logMsg =
            `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        if (this.clientFramework === 'angular2') {
            logMsg =
                `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install & bower install`)}`;
        }
        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            } else if (this.clientFramework === 'angular2') {
                this.spawnCommand('gulp', ['install']);
            }
        };
        const installConfig = {
            bower: this.clientFramework === 'angular2',
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        this.installDependencies(installConfig);
    },

    end() {
        this.log('End of multitenancy generator');
    }
});

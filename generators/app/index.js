const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require('../../package.json');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const jhipsterUtils = require('./../../node_modules/generator-jhipster/generators/utils');

const _ = require('lodash');
const pluralize = require('pluralize');

const JhipsterGenerator = generator.extend({});
util.inherits(JhipsterGenerator, BaseGenerator);

module.exports = JhipsterGenerator.extend({
    initializing: {
        readConfig() {
            this.jhipsterAppConfig = this.getJhipsterAppConfig();
            if (!this.jhipsterAppConfig) {
                this.error('Can\'t read .yo-rc.json');
            }
        },
        displayLogo() {
            // it's here to show that you can use functions from generator-jhipster
            // this function is in: generator-jhipster/generators/generator-base.js
            this.printJHipsterLogo();

            // Have Yeoman greet the user.
            this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster multitenancy')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
        },
        checkJhipster() {
            const jhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
            const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
            if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
                this.warning(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
            }
        }
    },

    prompting() {
        const prompts = [
            {
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

        const done = this.async();
        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        });
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

        // read config from .yo-rc.json
        this.baseName = this.jhipsterAppConfig.baseName;
        this.packageName = this.jhipsterAppConfig.packageName;
        this.packageFolder = this.jhipsterAppConfig.packageFolder;
        this.clientFramework = this.jhipsterAppConfig.clientFramework;
        this.clientPackageManager = this.jhipsterAppConfig.clientPackageManager;
        this.buildTool = this.jhipsterAppConfig.buildTool;

        // use function in generator-base.js from generator-jhipster
        this.angularAppName = this.getAngularAppName();

        // use constants from generator-constants.js
        const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
        const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
        const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
        const testDir = jhipsterConstants.SERVER_TEST_SRC_DIR + this.packageFolder;
        
        /* tenant variables */
        this.tenantName = _.camelCase(this.props.tenantName);
        this.tenantNameUpperCase = _.toUpper(this.tenantName);
        this.tenantNameLowerCase = _.toLower(this.tenantName);
        this.tenantNameLowerFirst = _.lowerFirst(this.tenantName);
        this.tenantNameUpperFirst = _.upperFirst(this.tenantName);
        this.tenantNameSpinalCased = _.kebabCase(this.tenantNameLowerFirst);
        this.tenantNamePlural = pluralize(this.tenantNameLowerFirst);

        // copy .json entity file to project
        this.copy('.jhipster/_Tenant.json', `.jhipster/${this.tenantNameUpperFirst}.json`);
        this.tenantJson = this.getEntityJson(this.tenantNameUpperFirst);
        // overwrite the placeholder text with the alias set by user
        this.tenantJson.relationships[0].otherEntityRelationshipName = this.tenantNameLowerFirst;
        this.tenantJson.relationships[1].relationshipName = this.tenantNameLowerFirst+"Contact";
        this.tenantJson.entityTableName = this.tenantNameLowerFirst;
        // rewrite the json config file for the tenant
        this.fs.writeJSON(`.jhipster/${this.tenantNameUpperFirst}.json`, this.tenantJson, null, 4);

        // update user object and associated tests
        this.template('src/main/java/package/service/dto/UserDTO.java', `${javaDir}service/dto/UserDTO.java`);
        this.template('src/main/java/package/service/UserService.java', `${javaDir}service/UserService.java`);
        this.template('src/main/java/package/domain/_User.java', `${javaDir}domain/User.java`);
        this.template('src/test/java/package/web/rest/_UserResourceIntTest.java', `${testDir}/web/rest/UserResourceIntTest.java`);

        this.changelogDate = this.dateFormatForLiquibase();
        this.template('src/main/resources/config/liquibase/changelog/_user_tenant_constraints.xml', `${resourceDir}config/liquibase/changelog/${this.changelogDate}__user_${this.tenantNameUpperFirst}_constraints.xml`);
        this.template('src/main/resources/config/liquibase/authorities.csv', `${resourceDir}config/liquibase/authorities.csv`);
        this.addChangelogToLiquibase(`${this.changelogDate}__user_${this.tenantNameUpperFirst}_constraints`);

        // copy over aspect
        this.template('src/main/java/package/aop/_tenant/_TenantAspect.java', `${javaDir}aop/${this.tenantNameLowerFirst}/${this.tenantNameUpperFirst}Aspect.java`);

        //user management UI
        jhipsterUtils.rewriteFile({
            file: `${webappDir}app/admin/user-management/user-management-detail.component.html`,
            needle: '<dt><span jhiTranslate="userManagement.createdBy">Created By</span></dt>',
            splicable: 
        [`<dt><span jhiTranslate="userManagement.${this.tenantNameLowerFirst}">${this.tenantNameUpperFirst}</span></dt>
        <dd>{{user.${this.tenantNameLowerFirst}}}</dd>`
        ]
        }, this);

        jhipsterUtils.rewriteFile({
            file: `${webappDir}app/admin/user-management/user-management-dialog.component.html`,
            needle: '<div class="form-group" *ngIf="languages && languages.length > 0">',
            splicable: [`<div class="form-group" *ngIf="${this.tenantNamePlural} && ${this.tenantNamePlural}.length > 0">
            <label jhiTranslate="userManagement.${this.tenantNameLowerFirst}">${this.tenantNameUpperFirst}</label>
            <select class="form-control" id="${this.tenantNameLowerFirst}" name="${this.tenantNameLowerFirst}" [(ngModel)]="user.${this.tenantNameLowerFirst}" (change)="on${this.tenantNameUpperFirst}Change($event.target)">
                <option></option>
                <option *ngFor="let ${this.tenantNameLowerFirst} of ${this.tenantNamePlural}" [ngValue]="${this.tenantNameLowerFirst}">{{${this.tenantNameLowerFirst}.name}}</option>
            </select>
        </div>`]
        }, this);

        this.template('src/main/webapp/user-management/_user-management-dialog.component.ts', `${webappDir}app/admin/user-management/user-management-dialog.component.ts`);        
        this.template('src/main/webapp/user-management/_user-management.component.html', `${webappDir}app/admin/user-management/user-management.component.html`);     
        this.template('src/main/webapp/user-management/_user.model.ts', `${webappDir}app/shared/user/user.model.ts`);        

        jhipsterUtils.rewriteJSONFile(`${webappDir}i18n/en/user-management.json`, (jsonObj) => {
                jsonObj.userManagement[this.tenantNameLowerCase] = this.tenantNameUpperFirst;
            }, this);

    },

    install() {
        this.composeWith('jhipster:entity', {
            regenerate: true,
            'skip-install': true,
            'skip-client': false,
            'skip-server': false,
            'no-fluent-methods': false,
            'skip-user-management': false,
            arguments: [this.tenantName],
        });

        let logMsg =
            `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        if (this.clientFramework === 'angular1') {
            logMsg =
                `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install & bower install`)}`;
        }
        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            } else if (this.clientFramework === 'angular1') {
                this.spawnCommand('gulp', ['install']);
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
        this.log('End of multitenancy generator');
    }
});

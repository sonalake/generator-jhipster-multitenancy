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
const jhipsterVar = { moduleName: 'multi-tennancy' };

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
            this.log(`Welcome to the ${chalk.bold.yellow('JHipster multi-tennancy')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
        }
    },

    prompting() {
        const done = this.async();

        if (jhipsterVar.clientFramework !== 'angular1') {
            this.log(chalk.red('Error! The JHipster multi-tennancy module only works with AngularJS 1'));
            process.exit(1);
        }
        if (jhipsterVar.databaseType !== 'sql') {
            this.log(chalk.red('Error! The JHipster multi-tennancy module only works with sql databases'));
            process.exit(1);
        }
        if (jhipsterVar.enableTranslation !== true) {
            this.log(chalk.red('Error! The JHipster multi-tennancy module only works when translation (i18n) is enabled'));
            process.exit(1);
        }

        const prompts = [
            {
                type: 'input',
                name: 'tennantName',
                message: 'What is the alias given tennants in your application?',
                default: 'Company',
                validate: function(input) {
                   if(_.toLower(input) === "account"){
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
        this.clientFramework = jhipsterVar.clientFramework;
        this.clientPackageManager = jhipsterVar.clientPackageManager;
        const javaDir = jhipsterVar.javaDir;
        const resourceDir = jhipsterVar.resourceDir;
        const webappDir = jhipsterVar.webappDir;

        /* tennant variables */
        this.tennantName = _.camelCase(this.props.tennantName);
        this.tennantNameLowerFirst = _.lowerFirst(this.tennantName);
        this.tennantNameUpperFirst = _.upperFirst(this.tennantName);
        this.tennantNamePluralLowerFirst = pluralize(_.lowerFirst(this.tennantName));
        this.tennantNamePluralUpperFirst = pluralize(_.upperFirst(this.tennantName));
        this.tennantDbName = _.snakeCase(this.tennantNameLowerFirst);
        this.tennantNameSpinalCased = _.kebabCase(this.tennantNameLowerFirst);
        this.tennantNamePluralSpinalCased = _.kebabCase(this.tennantNamePluralLowerFirst);

        this.template('src/main/java/package/domain/_Tennant.java', `${javaDir}domain/${this.tennantNameUpperFirst}.java`);
        this.template('src/main/java/package/domain/_User.java', `${javaDir}domain/User.java`);
        this.template('src/main/java/package/repository/_TennantRepository.java', `${javaDir}repository/${this.tennantNameUpperFirst}Repository.java`);
        this.template('src/main/java/package/service/_TennantService.java', `${javaDir}service/${this.tennantNameUpperFirst}Service.java`);
        this.template('src/main/java/package/web/rest/_TennantResource.java', `${javaDir}web/rest/${this.tennantNameUpperFirst}Resource.java`);
        this.template('src/main/resources/config/liquibase/_tennant.csv', `${resourceDir}config/liquibase/${this.tennantDbName}.csv`);

        this.changelogDate = jhipsterFunc.dateFormatForLiquibase();
        this.template('src/main/resources/config/liquibase/changelog/_added_entity_Tennant.xml', `${resourceDir}config/liquibase/changelog/${this.changelogDate}_added_entity_${this.tennantNameUpperFirst}.xml`);
        jhipsterFunc.addChangelogToLiquibase(`${this.changelogDate}_added_entity_${this.tennantNameUpperFirst}`);

        this.template('src/main/webapp/scripts/app/tennant/_tennant.controller.js', `${webappDir}app/${this.tennantNameSpinalCased}/${this.tennantNameSpinalCased}.controller.js`);
        this.template('src/main/webapp/scripts/app/tennant/_tennant.service.js', `${webappDir}app/${this.tennantNameSpinalCased}//${this.tennantNameSpinalCased}.service.js`);
        this.template('src/main/webapp/scripts/app/tennant/_tennant.state.js', `${webappDir}app/${this.tennantNameSpinalCased}/${this.tennantNameSpinalCased}.state.js`);
        this.template('src/main/webapp/scripts/app/tennant/_tennant-delete-dialog.controller.js', `${webappDir}app/${this.tennantNameSpinalCased}/${this.tennantNameSpinalCased}-delete-dialog.controller.js`);
        this.template('src/main/webapp/scripts/app/tennant/_tennant-delete-dialog.html', `${webappDir}app/${this.tennantNameSpinalCased}/${this.tennantNameSpinalCased}-delete-dialog.html`);
        this.template('src/main/webapp/scripts/app/tennant/_tennant-detail.controller.js', `${webappDir}app/${this.tennantNameSpinalCased}/${this.tennantNameSpinalCased}-detail.controller.js`);
        this.template('src/main/webapp/scripts/app/tennant/_tennant-detail.html', `${webappDir}app/${this.tennantNameSpinalCased}/${this.tennantNameSpinalCased}-detail.html`);
        this.template('src/main/webapp/scripts/app/tennant/_tennant-dialog.controller.js', `${webappDir}app/${this.tennantNameSpinalCased}/${this.tennantNameSpinalCased}-dialog.controller.js`);
        this.template('src/main/webapp/scripts/app/tennant/_tennant-dialog.html', `${webappDir}app/${this.tennantNameSpinalCased}/${this.tennantNameSpinalCased}-dialog.html`);
        this.template('src/main/webapp/scripts/app/tennant/_tennants.html', `${webappDir}app/${this.tennantNameSpinalCased}/${this.tennantNamePluralSpinalCased}.html`);

        jhipsterFunc.addElementToMenu(this.tennantNameLowerFirst, 'sunglasses', true, this.clientFramework);
        jhipsterFunc.addElementTranslationKey(this.tennantNameLowerFirst, this.tennantNameUpperFirst, 'en');
        this.template('src/main/webapp/i18n/en/_tennant.json', `${webappDir}i18n/en/${this.tennantNameLowerFirst}.json`);
    },

    install() {
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
        this.installDependencies(installConfig);
    },

    end() {
        this.log('End of multi-tennancy generator');
    }
});

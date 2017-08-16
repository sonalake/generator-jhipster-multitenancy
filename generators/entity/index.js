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
const jhipsterVar = { moduleName: 'multitenancy:entity' };

// Stores JHipster functions
const jhipsterFunc = {};

module.exports = JhipsterGenerator.extend({
constructor: function (...args) { // eslint-disable-line object-shorthand
        generator.apply(this, args);

        // This makes `name` a required argument.
        this.argument('name', {
            type: String,
            required: true,
            description: 'Entity name'
        });

        this.name = this.options.name;
        // remove extension if feeding json files
        if (this.name !== undefined) {
            this.name = this.name.replace('.json', '');
        }
    },
    initializing: {
        compose() {
            this.composeWith('jhipster:modules',
                { jhipsterVar, jhipsterFunc },
                this.options.testmode ? { local: require.resolve('generator-jhipster/generators/generator-base') } : null
            );
        },
        displayLogo() {
            // Have Yeoman greet the user.
            this.log(`Welcome to the ${chalk.bold.yellow('JHipster multitenancy:entity')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
        }
    },

    prompting() {
        const done = this.async();

        if (jhipsterVar.clientFramework !== 'angular1') {
            this.log(chalk.red('Error! The JHipster multitenancy module only works with AngularJS 1'));
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

        done();
    },

    writing() {
        this.log('Generating entities.');
            try {
                this.composeWith('jhipster:entity', {
                                            regenerate: true,
                                            'skip-install': true,
                                            'skip-client': false,
                                            'skip-server': false,
                                            'no-fluent-methods': false,
                                            'skip-user-management': false,
                                            arguments: [this.name],
                                        });
            } catch (e) {
                this.debug('Error:', e);
                this.error(`Error while generating entities from parsed JDL\n${e}`);
            }
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
        this.log('End of multitenancy generator');
    }
});

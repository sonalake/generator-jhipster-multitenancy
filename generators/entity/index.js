const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require(__dirname + '/../../package.json');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const JhipsterGenerator = generator.extend({});
util.inherits(JhipsterGenerator, BaseGenerator);

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
    },
    initializing: {
        readConfig() {
            this.jhipsterAppConfig = this.getJhipsterAppConfig();
            if (!this.jhipsterAppConfig) {
                this.error('Can\'t read .yo-rc.json');
            }
        },
        displayLogo() {
            this.log(chalk.white('Running ' + chalk.bold('JHipster Multitenacy:entity') + ' Generator! ' + chalk.yellow('v' + packagejs.version + '\n')));
        },
        validate() {
            if(this.config.get("tenantName") == undefined) {
                this.env.error(chalk.red.bold('ERROR!') + ' Please run the Multitenancy generator first');
            }
        }
    },
    writing: {
        updateFiles() {
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
        },
        editJSON() {
            // if (this.props.continue === 'yes') {
                // if entity does exisit we should have the entity json
                this.entityJson = this.getEntityJson(this.name);

                console.log("json", this.entityJson);
                if(this.entityJson == undefined) {
                     // if not generated it
                    this.log(chalk.yellow('Entity ' +  chalk.bold(this.name) +' doesn\'t exisit. Will generate'));
                    this.composeWith('jhipster:entity', {
                        regenerate: false,
                        'skip-install': true,
                        'skip-client': false,
                        'skip-server': false,
                        'no-fluent-methods': false,
                        'skip-user-management': false,
                        arguments: [this.name],
                    });
                    this.entityJson = this.getEntityJson(this.name);
                    console.log("foo", this.entityJson);
                } else {
                    // if it does add relationship 
                    this.log(chalk.white('Entity ' +  chalk.bold(this.name) +' found. Adding relationship'));
                    this.tenantName = this.config.get("tenantName")
                    this.relationships = this.entityJson.relationships;
                    this.real = {
                        "relationshipName": this.tenantName,
                        "otherEntityName": this.tenantName,
                        "relationshipType": "many-to-one",
                        "relationshipValidateRules": [
                            "required"
                        ],
                        "otherEntityField": "id",
                        "ownerSide": true,
                        "otherEntityRelationshipName": this.name
                    };
                    this.relationships.push(this.real);
                    this.entityJson.relationships = this.relationships;
                    console.log("asdas",this.entityJson);
                    this.fs.writeJSON(`.jhipster/${this.name}.json`, this.entityJson, null, 4);
                }
        },
    },
    install() {
        // regenerate the tenant-ised entity
        this.composeWith('jhipster:entity', {
            regenerate: true,
            'skip-install': true,
            'skip-client': false,
            'skip-server': false,
            'no-fluent-methods': false,
            'skip-user-management': false,
            arguments: [this.name],
        });
    },
    end() {

    }
});

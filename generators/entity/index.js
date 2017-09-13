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

    prompting() {
        const done = this.async();
        this.prompt([
            {
                type: 'list',
                name: 'continue',
                message: 'Do you want to Tenantise an entity?',
                choices: ['yes', 'no']
            },
            {
                // when: 'continue.yes',
                when: (p) => p.continue === 'yes',
                type: 'input',
                name: 'entity',
                message: 'Name the entity you wish to tenantise.'
            }
        ]).then((props) => {
            this.props = props;
            done();
        });
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
        writeFiles() {
            console.log("props", this.props);

            if (this.props.continue === 'yes') {
                // if entity does exisit we should have the entity json
                this.entityJson = this.getEntityJson(this.props.entity);

                console.log("json", this.entityJson);
                if(this.entityJson == undefined) {
                     // if not generated it
                    this.log(chalk.yellow('Entity ' +  chalk.bold(this.props.entity) +' doesn\'t exisit. Will generate'));
                } else {
                    // if it does add relationship 
                    this.log(chalk.white('Entity ' +  chalk.bold(this.props.entity) +' found. Adding relationship'));
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
                        "otherEntityRelationshipName": this.props.entity
                    };
                    this.relationships.push(this.real);
                    this.entityJson.relationships = this.relationships;
                    console.log("asdas",this.entityJson);
                    this.fs.writeJSON(`.jhipster/${this.props.entity}.json`, this.entityJson, null, 4);
                }
               


                // function to use directly template
                this.template = function (source, destination) {
                    this.fs.copyTpl(
                        this.templatePath(source),
                        this.destinationPath(destination),
                        this
                    );
                };
            }
        },
    },

    end() {

    }
});

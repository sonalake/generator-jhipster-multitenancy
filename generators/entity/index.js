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
    constructor: function (...args) {
        generator.apply(this, args);

        this.argument('name', {
            type: String,
            required: false,
            description: 'Entity name'
        });

        this.name = this.options.name;
    },
    prompting() {
        if (this.options.name === undefined) {
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
                this.options.name = props.entity;
                this.options.continue = props.continue;
                done();
            });
        }
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
            if (this.config.get("tenantName") == undefined) {
                this.env.error(chalk.red.bold('ERROR!') + ' Please run the Multitenancy generator first');
            }
        }
    },
    writing: {
        editJSON() {
            if (this.options.name != undefined) {
                // if entity does exisit we should have the entity json
                this.entityJson = this.getEntityJson(this.options.name);

                if (this.entityJson == undefined) {
                    // if not generated it
                    this.error(chalk.yellow('Entity ' + chalk.bold(this.options.name) + ' doesn\'t exisit. Please generate using yo jhipster:entity'));
                } else {
                    // check if entity has relationship already
                    this.entities = this.config.get("tenantisedEntities");
                    if(this.entities != undefined && this.entities.indexOf(this.options.name)) {
                        this.error(chalk.yellow('Entity ' + chalk.bold(this.options.name) + ' already has been tenant-ised'));
                    }

                    // get entity json config 
                    this.tenantName = this.config.get("tenantName")
                    this.relationships = this.entityJson.relationships;

                    // if any relationship exisits already in the entity to the tenant remove it and regenerated
                    for (var i = this.relationships.length-1; i >= 0; i--) {
                        console.log(this.relationships[i]);
                        if(this.relationships[i].otherEntityName == this.tenantName) {
                            console.log("splice");
                            this.relationships.splice(i);
                        }
                    }

                    this.log(chalk.white('Entity ' + chalk.bold(this.options.name) + ' found. Adding relationship'));
                    this.real = {
                        "relationshipName": this.tenantName,
                        "otherEntityName": this.tenantName,
                        "relationshipType": "many-to-one",
                        "relationshipValidateRules": [
                            "required"
                        ],
                        "otherEntityField": "id",
                        "ownerSide": true,
                        "otherEntityRelationshipName": this.options.name
                    };
                    this.relationships.push(this.real);
                    this.entityJson.relationships = this.relationships;
                    this.fs.writeJSON(`.jhipster/${this.options.name}.json`, this.entityJson, null, 4);
                    
                    if(this.entities == undefined) {
                        this.config.set("tenantisedEntities", [this.options.name]);
                    } else {
                        this.entities.push(this.options.name);
                        this.config.set("tenantisedEntities", this.entities);
                    }
                }
            }
        },
    },
    install() {
        if (this.options.name != undefined) {
            // regenerate the tenant-ised entity
            this.composeWith('jhipster:entity', {
                regenerate: true,
                'skip-install': true,
                'skip-client': false,
                'skip-server': false,
                'no-fluent-methods': false,
                'skip-user-management': false,
                arguments: [this.options.name],
            });
        }
    },
    end() {

    }
});

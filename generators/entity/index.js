const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require(__dirname + '/../../package.json');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const jhipsterUtils = require('generator-jhipster/generators/utils');
const _ = require('lodash');
const mtUtils = require('../multitenancy-utils');

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

        this.isValid = true;
        this.skipPrompt = false;

        const tenantName = _.toLower(this.config.get('tenantName'));
        if (_.toLower(this.options.name) === tenantName) {
            this.error('You can\'t select your Tenant entity');
            this.isValid = false;
        } else if (this.options.name) {
            this.name = this.options.name;
        } else if (this.options.name === undefined && this.options.entityConfig) {
            // first check if the entityConfig is for the tenant entity
            if (this.options.entityConfig && _.toLower(this.options.entityConfig.entityClass) === tenantName) {
                // if so, then just ignore the config, and don't run the generator
                this.isValid = false;
            } else {
                this.name = _.toLower(this.options.entityConfig.entityClass);
            }
        }

        if (this.name) {
            // we got a value
            if(!this.options.entityConfig){
                this.skipPrompt = true;
            }

            // check that the name hasn't already been done
            const preTenantisedEntities = this.config.get('tenantisedEntities');
            if (preTenantisedEntities && preTenantisedEntities.indexOf(this.name) >= 0) {
                // entity is already tenantised, show warning and skip generator
                this.log(chalk.green(`Entity ${chalk.bold(this.name)} has been tenantised`));
                this.isValid = false;
            }
        }

        // if we go this far, then we definitely have an entity to update
        this.options.name = this.name;
    },
    initializing: {
        readConfig() {
            this.jhipsterAppConfig = this.getJhipsterAppConfig();
            if (!this.jhipsterAppConfig) {
                this.error('Can\'t read .yo-rc.json');
            }
        },
        displayLogo() {
            if (this.isValid) {
                this.log(`${chalk.white('Running')} ${chalk.bold('JHipster Multitenacy:entity')} ${chalk.white('Generator!')} ${chalk.yellow(`v${packagejs.version}`)}\n`);
            }
        },
        validate() {
            if (this.config.get('tenantName') === undefined) {
                this.env.error(`${chalk.red.bold('ERROR!')} Please run the Multitenancy generator first`);
            }
        }
    },
    prompting() {
        if (this.isValid) {
            const done = this.async();
            this.prompt([
                {
                    when: this.options.name == undefined && this.skipPrompt == false,
                    type: 'confirm',
                    name: 'continue',
                    message: 'Do you want to tenantise an entity?'
                },
                {
                    when: this.options.name != undefined && this.skipPrompt == false,
                    type: 'confirm',
                    name: 'continue',
                    message: 'Do you want to tenantise the entity ' + this.options.name + '?'
                },
                {
                    when: (p) => p.continue === true && this.options.name == undefined,
                    type: 'input',
                    name: 'entity',
                    message: 'Name the entity you wish to tenantise.'
                }
            ]).then((props) => {
                if (this.options.name == undefined) {
                    this.options.name = props.entity;
                }
                if (this.skipPrompt) {
                    this.options.continue = true;
                } else {
                    this.options.continue = props.continue;
                }
                done();
            });
        }
    },
    writing: {
        editJSON() {
            if (this.isValid) {
                if (this.options.continue == true) {
                    // if entity does exisit we should have the entity json
                    this.entityJson = this.getEntityJson(this.options.name);

                    if (this.entityJson == undefined) {
                        // if not generated it
                        this.error(chalk.yellow('Entity ' + chalk.bold(this.options.name) + ' doesn\'t exist. Please generate using yo jhipster:entity ' + this.options.name));
                    } else {
                        // check if entity has relationship already
                        this.entities = this.config.get("tenantisedEntities");
                        if (this.entities != undefined && this.entities.indexOf(_.toLower(this.options.name)) >= 0) {
                            this.isValid = false;
                            this.log(chalk.yellow('Entity ' + chalk.bold(this.options.name) + ' has been tenantised'));
                        }
                        if (this.isValid) {
                            // get entity json config
                            this.tenantName = this.config.get("tenantName")
                            this.relationships = this.entityJson.relationships;
                            // if any relationship exisits already in the entity to the tenant remove it and regenerated
                            for (var i = this.relationships.length - 1; i >= 0; i--) {
                                if (this.relationships[i].otherEntityName == this.tenantName) {
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
                            this.fs.writeJSON(`.jhipster/${_.upperFirst(this.options.name)}.json`, this.entityJson, null, 4);

                            if (this.entities == undefined) {
                                this.tenantisedEntities = [_.toLower(this.options.name)];
                            } else {
                                this.entities.push(_.toLower(this.options.name));
                                this.tenantisedEntities = this.entities;
                            }
                        }
                    }
                } else {
                    this.isValid = false;
                    this.log(chalk.yellow('Exiting sub generator'));
                }
            }
        },
        addEntityToAspect() {
            if (this.isValid) {
                // read app config from .yo-rc.json
                mtUtils.readConfig(this.jhipsterAppConfig, this);
                var foo = `@Before(\"execution(* ${this.packageName}.web.rest.UserResource.*(..))`;
                this.tenantisedEntities.forEach((entity) =>  {
                    addEntity = ` || execution(* ${this.packageName}.web.rest.` + _.upperFirst(entity) + `Resource.*(..))`
                    foo = foo.concat(addEntity);
                });
                foo = foo.concat(`\")`);
                this.tenantisedEntitesResources = foo;
                // replace aspect

                /* tenant variables */
                mtUtils.tenantVariables(this.tenantName, this);
                const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
                this.template('_TenantAspect.java', `${javaDir}aop/${this.tenantNameLowerFirst}/${this.tenantNameUpperFirst}Aspect.java`);
            }
        }
    },
    install() {
        if (this.options.name != undefined && this.isValid) {
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
            this.config.set("tenantisedEntities", this.tenantisedEntities);
        }
    },
    end() {

    }
});

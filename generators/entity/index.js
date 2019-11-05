/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
const mtUtils = require('../multitenancy-utils');

module.exports = class extends EntityGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint multitenancy')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupEntityOptions(this, jhContext, this);

        // current subgen
        this.isTenant = this._.lowerFirst(args[0]) === this._.lowerFirst(this.config.get('tenantName'));

        // pass to entity-* subgen
        this.context.isTenant = this.isTenant;
    }

    get initializing() {
        /**
         * Any method beginning with _ can be reused from the superclass `EntityGenerator`
         *
         * There are multiple ways to customize a phase from JHipster.
         *
         * 1. Let JHipster handle a phase, blueprint doesnt override anything.
         * ```
         *      return super._initializing();
         * ```
         *
         * 2. Override the entire phase, this is when the blueprint takes control of a phase
         * ```
         *      return {
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *          myAnotherCustomInitPhaseStep(){
         *              // Do all your stuff here
         *          }
         *      };
         * ```
         *
         * 3. Partially override a phase, this is when the blueprint gets the phase from JHipster and customizes it.
         * ```
         *      const phaseFromJHipster = super._initializing();
         *      const myCustomPhaseSteps = {
         *          displayLogo() {
         *              // override the displayLogo method from the _initializing phase of JHipster
         *          },
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *      }
         *      return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
         * ```
         */
        const phaseFromJHipster = super._initializing();
        const postCustomPhaseSteps = {
            setUpVariables() {
                this.tenantName = this.config.get('tenantName');
                const context = this.context;

                if (!this.isTenant) {}
            }
        };

        return Object.assign(phaseFromJHipster, postCustomPhaseSteps);
    }

    get prompting() {
        const prompting = super._prompting();
        const myCustomPhaseSteps = {
            askTenantAware() {
                const context = this.context;

                if (this.isTenant) return;

                // tenantAware is already defined
                if (context.fileData !== undefined && context.fileData.tenantAware !== undefined) {
                    return;
                }
                // Check entity for relationship with otherEntityName to be tenant
                // Check relationshipType is not one to many or many to multitenancy
                // Show prompt if that is ok
                let showTenantAwarePrompt = true;
                const prompts = [
                    {
                        when: this.newTenantAware === undefined,
                        type: 'confirm',
                        name: 'tenantAware',
                        message: `Do you want to make ${context.name} tenant aware?`,
                        default: true
                    }
                ];
                const done = this.async();
                const relationships = context.relationships;
                let relationshipType;
                // if any relationship exisits already in the entity to the tenant remove it and regenerate
                for (let i = relationships.length - 1; i >= 0; i--) {
                    const otherEntityName = relationships[i].otherEntityName;
                    relationshipType = relationships[i].relationshipType;
                    if (this._.toLower(otherEntityName) === this._.toLower(this.tenantName)) {
                        if (relationshipType === 'one-to-many' || relationshipType === 'many-to-many') {
                            showTenantAwarePrompt = false;
                        }
                    }
                }
                if (showTenantAwarePrompt) {
                    this.prompt(prompts).then(props => {
                        if (!this.isTenant && props.tenantAware !== undefined) {
                            this.newTenantAware = props.tenantAware;
                        }
                        done();
                    });
                } else {
                    done();
                }
            }
        };
        return Object.assign(prompting, myCustomPhaseSteps);
    }

    get configuring() {
        const myCustomPrePhaseSteps = {
            loadTenantDefinition() {
                const context = this.context;
                this.tenantName = this.config.get('tenantName');

                let tenantAware;
                if (this.newTenantAware === undefined) {
                    tenantAware = context.fileData ? context.fileData.tenantAware : false;
                } else {
                    tenantAware = this.newTenantAware;
                }
                // pass to entity-* subgen
                context.tenantAware = tenantAware;

                /* tenant variables */
                mtUtils.tenantVariables(this.tenantName, this);
            },
            preJson() {
                const context = this.context;

                if (this.isTenant) {
                    // force tenant to be serviceClass
                    this.tenantName = this.config.get('tenantName');
                    const context = this.context;
                    context.service = 'serviceClass';
                    context.pagination = 'pagination';
                    context.changelogDate = this.config.get('tenantChangelogDate');
                }

                if (this.context.tenantAware) {
                    context.service = 'serviceClass';
                    context.dto = 'no';
                    const relationships = context.relationships;
                    let tenantRelationship = false;
                    // if any relationship exisits already in the entity to the tenant remove it and regenerate
                    for (let i = relationships.length - 1; i >= 0; i--) {
                        if (relationships[i].otherEntityName === this.tenantName) {
                            // Instead of removing relationship just don't add relationship below. Set boolean value
                            // relationships.splice(i);
                            tenantRelationship = true;
                        }
                    }

                    this.log(chalk.white(`Entity ${chalk.bold(this.options.name)} found. Adding relationship`));
                    if (!tenantRelationship) {
                        const real = {
                            relationshipName: this._.toLower(this.tenantName),
                            otherEntityName: this._.toLower(this.tenantName),
                            relationshipType: 'many-to-one',
                            otherEntityField: 'name',
                            relationshipValidateRules: 'required',
                            ownerSide: true,
                            otherEntityRelationshipName: this._.toLower(context.name)
                        };
                        relationships.push(real);
                    }

                    if (this.newTenantAware) {
                        this.configOptions.tenantAwareEntities = this.config.get('tenantAwareEntities');
                        if (!this.configOptions.tenantAwareEntities) {
                            this.configOptions.tenantAwareEntities = [];
                        }
                        this.configOptions.tenantAwareEntities.push(context.entityNameCapitalized);
                        this.config.set('tenantAwareEntities', this.configOptions.tenantAwareEntities);
                    }
                }
            }
        };
        const configuring = super._configuring();

        const myCustomPostPhaseSteps = {
            postJson() {
                if (this.isTenant) {
                    // jhipster will override tenant's changelogDate
                    if (!this.context.useConfigurationFile) {
                        this.context.changelogDate = this.config.get('tenantChangelogDate');
                        this.updateEntityConfig(this.context.filename, 'changelogDate', this.context.changelogDate);
                    }
                    return;
                }

                this.log(chalk.white(`Saving ${chalk.bold(this.options.name)} tenantAware`));
                // Super class creates a new file without tenantAware (6.1.2), so add tenantAware to it.
                this.updateEntityConfig(this.context.filename, 'tenantAware', this.context.tenantAware);
            }
        };
        return Object.assign(myCustomPrePhaseSteps, configuring, myCustomPostPhaseSteps);
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._writing();
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._install();
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};

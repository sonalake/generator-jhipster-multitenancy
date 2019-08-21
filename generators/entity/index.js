/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');

const pluralize = require('pluralize');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const mtUtils = require('../multitenancy-utils');

module.exports = class extends EntityGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        this.option('default-tenant-aware', {
            desc: 'Always discover relationship with tenant',
            type: Boolean,
            defaults: false
        });

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint multitenancy')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupEntityOptions(this, jhContext, this);

        // current subgen
        this.isTenant = this._.lowerFirst(args[0]) === this._.lowerFirst(this.config.get("tenantName"));
        this.tenantManagement = this.configOptions.tenantManagement;

        // pass to entity-* subgen
        this.context.isTenant = this.isTenant;
        this.context.tenantManagement = this.configOptions.tenantManagement;
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
                    this.tenantName = this.config.get("tenantName");
                    const context = this.context;

                    if(!this.isTenant) {
                        // if tenantAware is undefined (first pass), then override changelogDate
                        if(context.fileData == undefined || context.fileData.tenantAware == undefined){
                            let nextChangelogDate = this.config.get('nextChangelogDate');
                            if(nextChangelogDate !== undefined){
                                context.changelogDate = '' + (Number(nextChangelogDate) + 1);
                                this.config.set('nextChangelogDate', context.changelogDate);
                            }
                        }
                    }
                },
        }

        return Object.assign(phaseFromJHipster, postCustomPhaseSteps);
    }

    get prompting() {
        const prompting = super._prompting()
        const myCustomPhaseSteps = {
            askTenantAware() {
                const context = this.context;

                if(this.isTenant) return;

                // tenantAware is already defined
                if(context.fileData !== undefined && context.fileData.tenantAware !== undefined){
                    return;
                }

                // look for tenantAware entities
                let relationWithTenant = false;
                if(context.fileData !== undefined && context.fileData.relationships !== undefined){
                    context.relationships.forEach((field) => {
                        if(this._.toLower(field.otherEntityName) === this._.toLower(this.tenantName)){
                            relationWithTenant = true;
                        }
                    });
                }

                // Always use default value
                if(this.options.defaultTenantAware){
                    this.newTenantAware = relationWithTenant;
                }

                const prompts = [
                    {
                        when: this.newTenantAware === undefined,
                        type: 'confirm',
                        name: 'tenantAware',
                        message: `Do you want to make ${context.name} tenant aware?`,
                        default: relationWithTenant
                    }
                    ];
                const done = this.async();
                this.prompt(prompts).then(props => {
                    if(!this.isTenant && props.tenantAware !== undefined){
                        this.newTenantAware = props.tenantAware;
                    }
                    done();
                });
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
                    if (this.newTenantAware === undefined){
                        tenantAware = context.fileData ? context.fileData.tenantAware : false;
                    }else {
                        tenantAware = this.newTenantAware;
                    }
                    // pass to entity-* subgen
                    context.tenantAware = tenantAware;

                    /* tenant variables */
                    mtUtils.tenantVariables(this.tenantName, this);
                },
                preJson() {
                    const context = this.context;

                    if(this.isTenant) {
                        // force tenant to be serviceClass
                        context.service = 'serviceClass';
                        context.changelogDate = this.config.get("tenantChangelogDate");
                        return;
                    }

                    if(this.context.tenantAware){
                        context.service = 'serviceClass';
                        context.dto = 'no';
                        
                        const relationships = context.relationships;
                        // if any relationship exisits already in the entity to the tenant remove it and regenerate
                        for (let i = relationships.length - 1; i >= 0; i--) {
                            if (relationships[i].otherEntityName === this.tenantName) {
                                relationships.splice(i);
                            }
                        }

                        this.log(chalk.white(`Entity ${chalk.bold(this.options.name)} found. Adding relationship`));
                        const real = {
                            relationshipName: this._.toLower(this.tenantName),
                            otherEntityName: this._.toLower(this.tenantName),
                            relationshipType: 'many-to-one',
                            otherEntityField: 'id',
                            relationshipValidateRules: 'required',
                            ownerSide: true,
                            otherEntityRelationshipName: this._.toLower(context.name)
                        };
                        relationships.push(real);
                    }
                },
        }
        const configuring = super._configuring();

        const myCustomPostPhaseSteps = {
                postJson() {
                    if(this.isTenant) {
                        // jhipster will override tenant's changelogDate
                        if(!this.context.useConfigurationFile){
                            this.context.changelogDate = this.config.get('tenantChangelogDate');
                            this.updateEntityConfig(this.context.filename, 'changelogDate', this.context.changelogDate);
                        }
                        return;
                    }

                    if(this.context.tenantAware){
                        this.configOptions.tenantAwareEntities = this.config.get('tenantAwareEntities');
                        if(!this.configOptions.tenantAwareEntities)
                        {
                            this.configOptions.tenantAwareEntities = [];
                        }
                        this.configOptions.tenantAwareEntities.push(this.context.entityClass);
                        this.config.set('tenantAwareEntities',  this.configOptions.tenantAwareEntities);
                    }

                    this.log(chalk.white(`Saving ${chalk.bold(this.options.name)} tenantAware`));
                    // Super class creates a new file without tenantAware (6.1.2), so add tenantAware to it.
                    this.updateEntityConfig(this.context.filename, 'tenantAware', this.context.tenantAware);
                },
        }
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

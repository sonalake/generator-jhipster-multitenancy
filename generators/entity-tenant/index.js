/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');

const pluralize = require('pluralize');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const mtUtils = require('../multitenancy-utils');

module.exports = class extends EntityGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts));
        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupEntityOptions(this, jhContext, this);

        // current subgen
        this.isTenant = this._.lowerFirst(args[0]) === this._.lowerFirst(this.config.get("tenantName"));
        this.tenantManagement = this.configOptions.tenantManagement;
        this.experimentalTenantManagement = this.configOptions.experimentalTenantManagement;

        // pass to entity-* subgen
        this.context.isTenant = this.isTenant;
        this.context.tenantManagement = this.configOptions.tenantManagement;
        this.context.experimentalTenantManagement = this.configOptions.experimentalTenantManagement;
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

                    if(!context.fileData){
                        context.service = 'serviceClass';
                        context.pagination = 'pagination';
                        context.changelogDate = this.config.get("tenantChangelogDate");

                        context.fields = [{
                            fieldName: 'name',
                            fieldType: 'String',
                            fieldValidateRules: [
                                'required'
                                ]
                        }];

                        context.relationships = [{
                            relationshipName: 'users',
                            otherEntityName: 'user',
                            relationshipType: 'one-to-many',
                            otherEntityField: 'login',
                            relationshipValidateRules: 'required',
                            ownerSide: true,
                            otherEntityRelationshipName: this._.toLower(this.tenantName)
                        }];
                    }else{
                        context.service = 'serviceClass';
                        context.pagination = 'pagination';
                        context.changelogDate = this.config.get("tenantChangelogDate");

                        let containsName = false;

                        context.fields.forEach(field => {
                            if(field.fieldName !== undefined && this._.toLower(field.fieldName) === 'name'){
                                containsName = true;
                            }
                        });

                        if(!containsName){
                            context.fields.push({
                                fieldName: 'name',
                                fieldType: 'String',
                                fieldValidateRules: [
                                    'required'
                                    ]
                            });
                        }

                        let containsUsers = false;
                        context.relationships.forEach(relationship => {
                            if(relationship.relationshipName !== undefined && this._.toLower(relationship.relationshipName) === 'users'){
                                containsUsers = true;
                            }
                        });

                        if(!containsUsers){
                            context.relationships.push({
                                relationshipName: 'users',
                                otherEntityName: 'user',
                                relationshipType: 'one-to-many',
                                otherEntityField: 'login',
                                relationshipValidateRules: 'required',
                                ownerSide: true,
                                otherEntityRelationshipName: this._.toLower(this.tenantName)
                            });
                        }
                    }
                },
        }

        return Object.assign(phaseFromJHipster, postCustomPhaseSteps);
    }

    get prompting() {
        return {};
    }

    get configuring() {
        return super._configuring();
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

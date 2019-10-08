/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityClientGenerator = require('generator-jhipster/generators/entity-client');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const mtUtils = require('../multitenancy-utils');
const angularFiles = require('./files-angular');
const reactFiles = require('./files-react');

module.exports = class extends EntityClientGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint multitenancy')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupEntityOptions(this, jhContext, this);
    }

    get initializing() {
        /**
         * Any method beginning with _ can be reused from the superclass `EntityClientGenerator`
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
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._initializing();
    }

    get prompting() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._prompting();
    }

    get configuring() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._configuring();
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        const phaseFromJHipster = super._writing();
        const myCustomPhaseSteps = {
            // sets up all the variables we'll need for the templating
            setUpVariables() {
                this.SERVER_MAIN_SRC_DIR = jhipsterConstants.SERVER_MAIN_SRC_DIR;
                this.webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
                this.reactDir = jhipsterConstants.REACT_DIR;

                // template variables
                mtUtils.tenantVariables(this.config.get('tenantName'), this);
            },
            writeAdditionalFile() {
                if (this.tenantAware) {
                    switch (this.clientFramework) {
                        case 'angularX':
                            return () => {};
                        case 'react':
                            return reactFiles.writeFiles.call(this);
                        default:
                            return () => {};
                    }
                }
            },

            rewriteExistingFiles() {
                if (this.tenantAware) {
                    switch (this.clientFramework) {
                        case 'angularX':
                            mtUtils.processPartialTemplates(angularFiles.entityTenantAwareTemplates(this), this);
                            break;
                        case 'react':
                            break;
                        default:
                            mtUtils.processPartialTemplates(angularFiles.entityTenantAwareTemplates(this), this);
                    }
                } else if (this.isTenant) {
                    switch (this.clientFramework) {
                        case 'angularX':
                            mtUtils.processPartialTemplates(angularFiles.tenantTemplates(this), this);
                            break;
                        case 'react':
                            mtUtils.processPartialTemplates(reactFiles.tenantTemplates(this), this);
                            break;
                        default:
                            mtUtils.processPartialTemplates(angularFiles.tenantTemplates(this), this);
                    }
                }
            }
        };
        return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
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

/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const mtUtils = require('../multitenancy-utils');
const files = require('./files');

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint multitenancy')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        if (jhContext.databaseType === 'cassandra') {
            this.pkType = 'UUID';
        }
    }

    get initializing() {
        /**
         * Any method beginning with _ can be reused from the superclass `ServerGenerator`
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
        const writing = super._writing();

        const setupCustomPhaseSteps = {
                // sets up all the variables we'll need for the templating
                setUpVariables() {
                    this.SERVER_MAIN_SRC_DIR = jhipsterConstants.SERVER_MAIN_SRC_DIR;

                    // template variables
                    mtUtils.tenantVariables(this.config.get('tenantName'), this);
                },
        };

        const writeCustomPhaseSteps = {
                // make the necessary server code changes
                customServerCode() {
                    if(!this.isTenant && !this.tenantAware) return

                    files.writeFiles.call(this);

                    if(this.tenantAware){
                        mtUtils.processPartialTemplates(files.partials.entityTenantAwareTemplates(this), this);

                    }else if(this.isTenant){
                        mtUtils.processPartialTemplates(files.partials.tenantTemplates(this), this);
                    }
                },
        };
        return Object.assign(writing, setupCustomPhaseSteps, writeCustomPhaseSteps);
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

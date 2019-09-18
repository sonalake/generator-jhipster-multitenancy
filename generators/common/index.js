/* eslint-disable consistent-return */
const _ = require('lodash');
const chalk = require('chalk');
const CommonGenerator = require('generator-jhipster/generators/common');

module.exports = class extends CommonGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        this.option('tenant-name', {
            desc: 'Set tenant name',
            type: String,
            defaults: undefined
        });

        this.option('tenant-changelog-date', {
            desc: 'Use liquibase changelog date to reproducible builds',
            type: String,
            defaults: undefined
        });

        this.tenantName = this.options['tenant-name'] || this.config.get('tenantName');
        this.tenantChangelogDate = this.options['tenant-changelog-date'] || this.config.get('tenantChangelogDate');

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint multitenancy')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupServerOptions(this, jhContext);
        jhContext.setupClientOptions(this, jhContext);
    }

    get initializing() {
        /**
         * Any method beginning with _ can be reused from the superclass `CommonGenerator`
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
        const initializing = super._initializing()
        const myCustomPhaseSteps = {
            loadConf() {
                if(this.options['tenant-changelog-date'] !== undefined){
                    this.config.set('nextChangelogDate', this.tenantChangelogDate);
                }else if(this.tenantChangelogDate === undefined){
                    this.tenantChangelogDate = this.dateFormatForLiquibase();
                }
                this.config.set('tenantChangelogDate', this.tenantChangelogDate);
            },
        };
        return Object.assign(initializing, myCustomPhaseSteps);
    }

    get prompting() {
        const prompting = super._prompting()
        const myCustomPhaseSteps = {
            askTenantAware() {
                const prompts = [
                    {
                        when: this.tenantName === undefined,
                        name: 'tenantName',
                        message: 'What is the alias given tenants in your application?',
                        default: 'Company',
                        validate: (input) => {
                            if (_.toLower(input) === 'account') {
                                return `${input} is a reserved word.`;
                            }
                            return true;
                        }
                    }
                ];
                const done = this.async();
                this.prompt(prompts).then(props => {
                    if(props.tenantName){
                        this.tenantName = props.tenantName;
                    }
                    done();
                });
            },
        };
        return Object.assign(prompting, myCustomPhaseSteps);
    }

    get configuring() {
        const configuring = super._configuring()
        const configuringCustomPhaseSteps = {
            saveConf() {
                // Pass to others subgens
                this.config.set('tenantName', this.tenantName);
                this.config.set('tenantChangelogDate', this.tenantChangelogDate);
            },
        };
        // configuringCustomPhaseSteps should be run after configuring, otherwise tenantName will be overridden
        return Object.assign(configuring, configuringCustomPhaseSteps);
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        return super._writing();
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        const install = super._install();
        const myCustomPhaseSteps = {
             generateTenant() {
                 const options = this.options;
                 options.force = true;
                 const configOptions = this.configOptions;

                 this.composeWith(require.resolve('../entity-tenant'), {
                     ...options,
                     configOptions,
                     regenerate: false,
                     'skip-install': false,
                     debug: this.isDebugEnabled,
                     arguments: [this.tenantName]
                 });
             },
        };
        return Object.assign(myCustomPhaseSteps, install);
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};

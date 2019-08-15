/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityI18nGenerator = require('generator-jhipster/generators/entity-i18n');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const mtUtils = require('../multitenancy-utils');

let isTenant;
let tenantManagement;
let experimentalTenantManagement;

module.exports = class extends EntityI18nGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint multitenancy')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        isTenant = this.isTenant;
        tenantManagement = this.tenantManagement;
        experimentalTenantManagement = this.experimentalTenantManagement;
    }

    get initializing() {
        /**
         * Any method beginning with _ can be reused from the superclass `EntityI18nGenerator`
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
        const configuring = super._configuring();

        if (!isTenant) return configuring;

        const myCustomPhaseSteps = {
                configure() {
                    if(isTenant){
                        this.entityTranslationKey = this.entityTranslationKey + 'Management';
                        this.entityTranslationKeyMenu = this.entityTranslationKeyMenu + 'Management';
                    }
                }
        }

        return Object.assign(configuring, myCustomPhaseSteps);
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // TODO copy generated files instead of creating ours
        const writing = super._writing();

        if (!isTenant || !tenantManagement) return writing;

        const myCustomPhaseSteps = {
            writeAdditionalEntries() {
                if (!this.enableTranslation) return;

                this.tenantName = this.config.get('tenantName');

                /* tenant variables */
                mtUtils.tenantVariables(this.tenantName, this);

                this.addTranslationKeyToAllLanguages(`${this.tenantNameLowerFirst}Management`, `${this.tenantNameUpperFirst} Management`, 'addAdminElementTranslationKey', this.enableTranslation);
                this.addTranslationKeyToAllLanguages(`userManagement${this.tenantNameUpperFirst}`, `${this.tenantNameUpperFirst}`, 'addGlobalTranslationKey', this.enableTranslation);

                const languageFiles = {
                        languages: [
                            {
                                condition: generator => generator.enableTranslation,
                                path: jhipsterConstants.CLIENT_MAIN_SRC_DIR,
                                templates: [
                                    {
                                        file: 'i18n/en/_tenant-management.json',
                                        renameTo: generator => `i18n/${this.currentLanguage}/${this.tenantNameLowerFirst}-management.json`
                                    }
                                ]
                            }
                        ]
                }

                this.languages.forEach((language) => {
                    this.currentLanguage = language;
                    this.writeFilesToDisk(languageFiles, this, false);
                });
            },
        };

        if(!experimentalTenantManagement) return myCustomPhaseSteps;

        return Object.assign(writing, myCustomPhaseSteps);
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

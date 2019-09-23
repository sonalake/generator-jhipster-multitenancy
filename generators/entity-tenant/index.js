/* eslint-disable consistent-return */
const EntityGenerator = require('generator-jhipster/generators/entity');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

module.exports = class extends EntityGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts));
        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupEntityOptions(this, jhContext, this);

        // current subgen
        this.isTenant = this._.lowerFirst(args[0]) === this._.lowerFirst(this.config.get('tenantName'));

        // pass to entity-* subgen
        this.context.isTenant = this.isTenant;
        this.context.tenantAware = this.tenantAware;
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
                context.service = 'serviceClass';
                context.pagination = 'pagination';
                context.changelogDate = this.config.get('tenantChangelogDate');

                let containsName = false;

                context.fields.forEach(field => {
                    if (field.fieldName !== undefined && this._.toLower(field.fieldName) === 'name') {
                        containsName = true;
                    }
                });

                if (!containsName) {
                    context.fields.push({
                        fieldName: 'name',
                        fieldType: 'String',
                        fieldValidateRules: ['required']
                    });
                }

                let containsUsers = false;
                context.relationships.forEach(relationship => {
                    if (relationship.relationshipName !== undefined && this._.toLower(relationship.relationshipName) === 'users') {
                        containsUsers = true;
                    }
                });

                if (!containsUsers) {
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
        };

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
        return {
            cleanup() {
                const context = this.context;
                const entityName = context.name;
                if (this.isJhipsterVersionLessThan('5.0.0')) {
                    this.removeFile(`${jhipsterConstants.ANGULAR_DIR}entities/${entityName}/${entityName}.model.ts`);
                }
            },

            composeServer() {
                const context = this.context;
                if (context.skipServer) return;
                const configOptions = this.configOptions;

                this.composeWith(require.resolve('../entity-server'), {
                    context,
                    configOptions,
                    force: context.options.force,
                    debug: context.isDebugEnabled
                });
            },

            composeClient() {
                const context = this.context;
                if (context.skipClient) return;
                const configOptions = this.configOptions;

                this.composeWith(require.resolve('../entity-client'), {
                    context,
                    configOptions,
                    'skip-install': context.options['skip-install'],
                    force: context.options.force,
                    debug: context.isDebugEnabled
                });
            },

            composeI18n() {
                const context = this.context;
                if (context.skipClient) return;
                const configOptions = this.configOptions;
                this.composeWith(require.resolve('generator-jhipster/generators/entity-i18n'), {
                    context,
                    configOptions,
                    'skip-install': context.options['skip-install'],
                    force: context.options.force,
                    debug: context.isDebugEnabled
                });
            }
        };
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

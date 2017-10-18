const _ = require('lodash');
const pluralize = require('pluralize');

/**
 * Utils file to hold methods common to both generator and sub generator
 */
module.exports = {
    readConfig,
    tenantVariables
};

// Expose some of the jhipster config vars for the templates
function readConfig(config, context) {
    Object.keys(config).forEach((key) => {
        context[key] = config[key];
    });
}

// Variations in tenant name
function tenantVariables(tenantName, context) {
    /* tenant variables */
    context.tenantName = _.camelCase(tenantName);
    context.tenantNameUpperCase = _.toUpper(tenantName);
    context.tenantNameLowerCase = _.toLower(tenantName);
    context.tenantNameLowerFirst = _.lowerFirst(tenantName);
    context.tenantNameUpperFirst = _.upperFirst(tenantName);
    context.tenantNameSpinalCased = _.kebabCase(context.tenantNameLowerFirst);
    context.tenantNamePlural = pluralize(context.tenantNameLowerFirst);
    context.tenantNamePluralLowerFirst = pluralize(context.tenantNameLowerFirst);
    context.tenantNamePluralUpperFirst = pluralize(context.tenantNameUpperFirst);
}

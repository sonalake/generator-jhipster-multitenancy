const _ = require('lodash');
const pluralize = require('pluralize');

/**
 * Utils file to hold methods common to both generator and sub generator
 */
module.exports = {
    readConfig,
    tenantVariables,
    processPartialTemplates,
    requireTemplates
};

// Expose some of the jhipster config vars for the templates
function readConfig(config, context) {
    Object.keys(config).forEach(key => {
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

function processPartialTemplates(partialTemplates, context) {
    partialTemplates.forEach(templates => {
        const file = typeof templates.file === 'function' ? templates.file(context) : templates.file;
        templates.tmpls.forEach(item => {
            // ignore if version is not compatible
            if (item.versions && !item.versions.includes(context.jhipsterVersion)) {
                return;
            }
            if (item.disabled) {
                return;
            }
            if (typeof item.condition === 'function') {
                if (!item.condition(context)) {
                    return;
                }
            }
            const target = typeof item.target === 'function' ? item.target(context) : item.target;
            const tmpl = typeof item.tmpl === 'function' ? item.tmpl(context) : item.tmpl;
            if (item.type === 'replaceContent') {
                context.replaceContent(file, target, tmpl, item.regex);
            } else if (item.type === 'rewriteFile') {
                context.rewriteFile(file, target, tmpl);
            }
        });
    });
}

function requireTemplates(prefix, templates, context) {
    const ret = [];
    templates.forEach(file => {
        // Look for specific version
        const template = prefix + file;
        let version = context.config.get('jhipsterVersion');
        while (version !== '' && version !== undefined) {
            try {
                ret.push(require(`${template}.v${version}.js`));
                return;
            } catch (e) {
                version = version.substring(0, version.lastIndexOf('.'));
            }
        }
        try {
            ret.push(require(`${template}.js`));
        } catch (e) {}
    });
    return ret;
}

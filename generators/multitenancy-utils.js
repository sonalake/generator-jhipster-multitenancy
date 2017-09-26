const Generator = require('yeoman-generator');
const chalk = require('chalk');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const packagejs = require('../package.json');
const util = require('util');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const PrivateBase = require('generator-jhipster/generators/generator-base-private');

/**
 * Utils file to hold methods common to both generator and sub generator
 */
module.exports = {
    readConfig
};

// Expose some of the jhipster config vars for the templates
function readConfig(config, context) {
    for (const property in config) {
        context[property] = config[property];
    }
}

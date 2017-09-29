const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const chalk = require('chalk');
const describe = require('mocha').describe;
const it = require('mocha').it;

describe('Multitenancy sub generator', () => {
    describe('Given name argument', () => {
        describe('jhipster-multitenancy module installed', () => {
            it('throws an error as entity doesn\'t exist', () => {
                helpers
                    .run(path.join(__dirname, '../generators/entity'))
                    .inTmpDir((dir) => {
                        fse.copySync(path.join(__dirname, '../test/templates/module-installed'), dir);
                    })
                    .withOptions({
                        testmode: true
                    })
                    .withArguments(['foo'])
                    .on('error', (e) => {
                        const errorMsg = `${e} `;
                        assert.equal(true, errorMsg.indexOf(chalk.yellow(`Entity ${chalk.bold('foo')} doesn't exist. Please generate using yo jhipster:entity foo`)) >= 0);
                    });
            });
        });
    });
});

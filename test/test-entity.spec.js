const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const chalk = require('chalk');
const describe = require('mocha').describe;
const it = require('mocha').it;

const expectedFiles = require('./utils/expected-files');

describe('Multitenancy sub generator', () => {

    describe('jhipster-multitenancy module not installed', () => {
        var errorMsg = '';
        beforeEach((done) => {
            helpers
            .run(path.join(__dirname, '../generators/entity'))
            .inTmpDir((dir) => {
                fse.copySync(path.join(__dirname, '../test/templates/subGen/module-not-installed'), dir);
            })
            .withOptions({
                testmode: true
            })
            .withArguments(['foo'])
            .on('error', (e) => {
                errorMsg = `${e} `;
                done();
            });
        });

        it('throws error as multitenancy module not installed', () => {
            assert.equal(true, errorMsg.indexOf(`${chalk.red.bold('ERROR!')} Please run the Multitenancy generator first`) >= 0);
        });
    });

    describe('jhipster-multitenancy module installed but entity doesn\'t exist', () => {
        var errorMsg = '';
        beforeEach((done) => {
            helpers
            .run(path.join(__dirname, '../generators/entity'))
            .inTmpDir((dir) => {
                fse.copySync(path.join(__dirname, '../test/templates/subGen/module-installed-no-entity'), dir);
            })
            .withOptions({
                testmode: true
            })
            .withArguments(['foo'])
            .on('error', (e) => {
                errorMsg = `${e} `;
                done();
            });
        });
        it('throws an error as entity doesn\'t exist', () => {
            assert.equal(true, errorMsg.indexOf(chalk.yellow(`Entity ${chalk.bold('foo')} doesn't exist. Please generate using yo jhipster:entity foo`)) >= 0);
        });
    });

    describe('Test tenantise entity', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/entity'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/subGen/entity-not-tenantised'), dir);
                })
                .withArguments(['ent'])
                .on('end', done);
        });

        it('updates files', () => {
            //UI
            expectedFiles.entityFiles.forEach((file)=>{
                assert.fileContent(file, /(c|C)ompany/);
            });
        });
    });
});

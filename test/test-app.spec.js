const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const BaseGenerator = require('generator-jhipster/generators/generator-base').prototype;
const describe = require('mocha').describe;
const it = require('mocha').it;
const beforeEach = require('mocha').beforeEach;

const expectedFiles = require('./utils/expected-files');

const checkTenantisedFiles = function () {
    it('generates files', () => {
        // UI
        assert.file(expectedFiles.companyManagement);
        assert.file(expectedFiles.userManagement);
        assert.file(expectedFiles.admin);
        assert.file(expectedFiles.shared);
        assert.file(expectedFiles.tests);
        assert.file(expectedFiles.i18nNew);

        // server
        assert.file(expectedFiles.server);

        // database
        assert.file(`src/main/resources/config/liquibase/changelog/${BaseGenerator.dateFormatForLiquibase()}__user_Company_constraints.xml`);
    });

    it('updates files', () => {
        // UI
        expectedFiles.updatedFiles.forEach((file) => {
            assert.fileContent(file, /(c|C)ompany/);
        });
    });
};

describe('JHipster generator multitenancy', () => {
    describe('Test with Maven and AngularX', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/mainGen/maven-angularx'), dir);
                })
                .on('end', done);
        });

        checkTenantisedFiles();
    });

    describe('Test with hazelcast cache', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/mainGen/hazelcastCache'), dir);
                })
                .on('end', done);
        });
        checkTenantisedFiles();
    });

    describe('Test with no cache', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/mainGen/noCache'), dir);
                })
                .on('end', done);
        });

        checkTenantisedFiles();
    });

    describe('Test with social login enabled', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/mainGen/socialLogin'), dir);
                })
                .on('end', done);
        });

        checkTenantisedFiles();
    });

    describe('Test with Maven and Angularjs', () => {
        let errorMsg = '';
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/mainGen/maven-angularjs'), dir);
                })
                .on('error', (e) => {
                    errorMsg = `${e} `;
                    done();
                });
        });
        it('throws an error when using angularjs', () => {
            assert.equal(true, errorMsg.indexOf('This module currently only supports Angular 4+') >= 0);
        });
    });

    describe('Test with MongoDb', () => {
        let errorMsg = '';
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/mainGen/mongoDb'), dir);
                })
                .on('error', (e) => {
                    errorMsg = `${e} `;
                    done();
                });
        });
        it('throws an error when using mongoDb', () => {
            assert.equal(true, errorMsg.indexOf('This module currently only supports SQL DB types\n') >= 0);
        });
    });

    describe('Test with module already installed', () => {
        let errorMsg = '';
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/mainGen/module-installed'), dir);
                })
                .on('error', (e) => {
                    errorMsg = `${e} `;
                    done();
                });
        });
        it('throws an error if the module is already installed', () => {
            assert.equal(true, errorMsg.indexOf('\nThis module is already installed.\n') >= 0);
        });
    });

    describe('Test with some disabled options', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/mainGen/disabledOptions'), dir);
                })
                .on('end', done);
        });

        it('doesn\'t update i18n files', () => {
            // UI
            assert.noFile(expectedFiles.i18nNew);
            assert.noFile('src/main/webapp/i18n/en/global.json');
        });

        it('doesn\'t create protractor test files', () => {
            // UI
            assert.noFile('src/test/javascript/e2e/admin/company-management.spec.ts');
        });
    });
});

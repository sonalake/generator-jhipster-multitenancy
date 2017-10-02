const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const jhipsterUtils = require('generator-jhipster/generators/utils');
const BaseGenerator = require('generator-jhipster/generators/generator-base').prototype;

const expectedFiles = require('./utils/expected-files');

describe('JHipster generator multitenancy', () => {
    describe('Test with Maven and AngularX', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/maven-angularx'), dir);
                })
                .withOptions({
                    testmode: true
                })
                .on('end', done);
        });

        it('generates files', () => {
            //UI
            assert.file(expectedFiles.companyManagement);
            assert.file(expectedFiles.userManagement);
            assert.file(expectedFiles.admin);
            assert.file(expectedFiles.shared);
            assert.file(expectedFiles.tests);
            assert.file(expectedFiles.i18nNew);

            //server
            assert.file(expectedFiles.server);

            //database
            assert.file('src/main/resources/config/liquibase/changelog/'+BaseGenerator.dateFormatForLiquibase()+'__user_Company_constraints.xml');
        });

        it('updates files', () => {
            //UI
            expectedFiles.updatedFiles.forEach((file)=>{
                assert.fileContent(file, /(c|C)ompany/);
            });
        });
    });

    describe('Test with Gradle and AngularX', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/gradle-angularx'), dir);
                })
                .withOptions({
                    testmode: true
                })
                .on('end', done);
        });

        it('generates files', () => {
            //UI
            assert.file(expectedFiles.companyManagement);
            assert.file(expectedFiles.userManagement);
            assert.file(expectedFiles.admin);
            assert.file(expectedFiles.shared);
            assert.file(expectedFiles.tests);
            assert.file(expectedFiles.i18nNew);

            //server
            assert.file(expectedFiles.server);

            //database
            assert.file('src/main/resources/config/liquibase/changelog/'+BaseGenerator.dateFormatForLiquibase()+'__user_Company_constraints.xml');
        });

        it('updates files', () => {
            //UI
            expectedFiles.updatedFiles.forEach((file)=>{
                assert.fileContent(file, /(c|C)ompany/);
            });
        });
    });

    describe('Test with Maven and Angularjs', () => {
        it('throws an error when using angularjs', () => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/maven-angularjs'), dir);
                })
                .withOptions({
                    testmode: true
                })
                .on('error', (e) => {
                    const errorMsg = `${e} `;
                    assert.equal(true, errorMsg.indexOf('This module currently only supports Angular 4+') >= 0);
                });
        });
    });

    describe('Test with disabled translation', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/i18nDisabled'), dir);
                })
                .withOptions({
                    testmode: true
                })
                .on('end', done);
        });

        it('doesn\'t update i18n files', () => {
            //UI
            assert.noFile(expectedFiles.i18nNew);
            assert.noFile('src/main/webapp/i18n/en/global.json');
        });
    });
});


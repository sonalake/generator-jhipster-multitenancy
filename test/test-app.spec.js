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
                .withPrompts({
                    message: 'simple message to say hello'
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
                .withPrompts({
                    message: 'simple message to say hello'
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
});


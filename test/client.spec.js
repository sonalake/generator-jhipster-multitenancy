const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');

describe('Subgenerator client of multitenancy JHipster blueprint', () => {
    describe('Sample test', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/client')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, './templates/client-template'), dir);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'multitenancy',
                    skipChecks: true
                })
                .withGenerators([
                    [
                        require('../generators/client/index.js'), // eslint-disable-line global-require
                        'jhipster-multitenancy:client',
                        path.join(__dirname, '../generators/client/index.js')
                    ]
                ])
                .on('end', done);
        });
    });
    describe('Validation check for "angularX" client framework', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/client')
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'multitenancy',
                    skipChecks: true
                })
                .withPrompts({
                    baseName: 'sampleMysql',
                    clientFramework: 'angularX',
                    packageName: 'com.mycompany.myapp',
                    applicationType: 'monolith',
                    databaseType: 'sql',
                    devDatabaseType: 'h2Disk',
                    prodDatabaseType: 'mysql',
                    cacheProvider: 'ehcache',
                    authenticationType: 'session',
                    enableTranslation: true,
                    nativeLanguage: 'en',
                    languages: ['fr', 'de'],
                    buildTool: 'maven',
                    rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5'
                })
                .on('end', done);
        });
        it('contains clientFramework with angularx value', () => {
            assert.fileContent('.yo-rc.json', /"clientFramework": "angularX"/);
        });
    });
    describe('Validation check for "React" client framework', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/client')
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'multitenancy',
                    skipChecks: true
                })
                .withPrompts({
                    baseName: 'sampleMysql',
                    clientFramework: 'react',
                    packageName: 'com.mycompany.myapp',
                    applicationType: 'monolith',
                    databaseType: 'sql',
                    devDatabaseType: 'h2Disk',
                    prodDatabaseType: 'mysql',
                    cacheProvider: 'ehcache',
                    authenticationType: 'session',
                    enableTranslation: true,
                    nativeLanguage: 'en',
                    languages: ['fr', 'de'],
                    buildTool: 'maven',
                    rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5'
                })
                .on('end', done);
        });
        it('contains clientFramework with angularx value', () => {
            assert.fileContent('.yo-rc.json', /"clientFramework": "react"/);
        });
    });
});

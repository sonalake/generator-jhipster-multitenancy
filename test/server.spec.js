const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');

describe('Subgenerator server of multitenancy JHipster blueprint', () => {
    describe('Sample test', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/server')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, './templates/default'), dir);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'multitenancy',
                    skipChecks: true
                })
                .withGenerators([
                    [
                        require('../generators/server/index.js'), // eslint-disable-line global-require
                        'jhipster-multitenancy:server',
                        path.join(__dirname, '../generators/server/index.js')
                    ]
                ])
                .on('end', done);
        });
        describe('Validation check for "SQL" database type', () => {
            before(done => {
                helpers
                    .run('generator-jhipster/generators/server')
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/default'), dir);
                    })
                    .withOptions({
                        'from-cli': true,
                        skipInstall: true,
                        blueprint: 'multitenancy',
                        skipChecks: true
                    })
                    .on('end', done);
            });
            it('contains databaseType with sql value', () => {
                assert.fileContent('.yo-rc.json', /"databaseType": "sql"/);
            });
        });
    });
});

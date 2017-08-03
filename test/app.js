/* global describe, beforeEach, it*/

const path = require('path');
const fse = require('fs-extra');
const helpers = require('yeoman-test');

const deps = [
    [helpers.createDummyGenerator(), 'jhipster:modules']
];

describe('JHipster generator fortune', () => {
    describe('simple test', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/default'), dir);
                })
                .withOptions({
                    testmode: true
                })
                .withPrompts({
                    userFortune: 'simple fortune cookie'
                })
                .withGenerators(deps)
                .on('end', done);
        });
    });
});

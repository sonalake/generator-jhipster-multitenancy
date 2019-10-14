const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const dir = 'src/main/webapp/app/';
const entity = 'foo';

describe('Subgenerator entity of multitenancy JHipster blueprint', () => {
    describe('Sample test', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/entity')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, './templates/default'), dir);
                })
                .withGenerators([
                    [
                        require('../generators/entity/index.js'), // eslint-disable-line global-require
                        'jhipster-multitenancy:entity',
                        path.join(__dirname, '../generators/entity/index.js')
                    ]
                ])
                .withArguments([entity])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    dto: 'no',
                    service: 'no',
                    pagination: 'no',
                    tenantAware: 'yes'
                })
                .on('end', done);
        });

        it('it works', () => {
            // Adds your tests here
            assert.textEqual('Write your own tests!', 'Write your own tests!');
        });
    });
});

const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const dir = 'src/main/webapp/app/';
const entity = 'foo';
const tenant = 'company';

describe('Subgenerator entity-client of multitenancy JHipster blueprint', () => {
    describe('React partial update tests', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/entity')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, './templates/React'), dir);
                })
                .withGenerators([
                    [
                        require('../generators/entity/index.js'), // eslint-disable-line global-require
                        'jhipster-multitenancy:entity-client',
                        path.join(__dirname, '../generators/entity-client/index.js')
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

        it('admin.tsx partial rewrite is being done', () => {
            assert.fileContent(`${dir}entities/foo/foo-update.tsx`, `this.props.account.${tenant}`);
        });
    });
});

describe('Subgenerator entity-client of multitenancy JHipster blueprint', () => {
    describe('Angular partial update tests', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/entity')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, './templates/default'), dir);
                })
                .withGenerators([
                    [
                        require('../generators/entity-client/index.js'), // eslint-disable-line global-require
                        'jhipster-multitenancy:entity-client',
                        path.join(__dirname, '../generators/entity-client/index.js')
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

        it('entity-detail.component.html partial rewrite is being done', () => {
            assert.fileContent(`${dir}entities/${entity}/${entity}-detail.component.html`, `<dt *ngIf="${entity}.${tenant}">`);
        });

        it('entity-update.component.html partial rewrite is being done', () => {
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.html`, `<div class="form-group" *ngIf="!currentAccount.${tenant}">`); // eslint-disable-line
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.html`, `<div *ngIf="!currentAccount.${tenant} && editForm.get('${tenant}')`); // eslint-disable-line
        });

        it('entity-update.component.ts partial rewrite is being done', () => {
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.ts`, 'import { AccountService }');
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.ts`, 'currentAccount: any;');
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.ts`, 'this.accountService.identity().then(account => {'); // eslint-disable-line
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.ts`, `if (this.currentAccount.${tenant}) {`);
            // eslint-disable-next-line
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.ts`, `if (this.currentAccount.${tenant}) {
      return;
    }`); // eslint-disable-line
        });

        it('entity.component.html partial rewrite is being done', () => {
            assert.fileContent(`${dir}entities/${entity}/${entity}.component.html`, `<th *ngIf="!currentAccount.${tenant}">`);
        });

        it('entity.component.html partial rewrite is being done', () => {
            assert.fileContent(`${dir}entities/${entity}/${entity}.component.html`, `<td *ngIf="!currentAccount.${tenant}">`);
        });
    });
});

const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const dir = 'src/main/webapp/app/';
const entity = 'foo';
const tenant = 'company';
const tenantUpper = 'Company';

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
                        'jhipster-multitenancy:entity',
                        path.join(__dirname, '../generators/entity/index.js')
                    ],
                    [
                        require('../generators/entity-client/index.js'), // eslint-disable-line global-require
                        'jhipster-multitenancy:entity-client',
                        path.join(__dirname, '../generators/entity-client/index.js')
                    ]
                ])
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'multitenancy',
                    tenantName: 'Company',
                    skipChecks: true
                })
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

        it('entity-update.tsx partial rewrite is being done', () => {
            assert.fileContent(`${dir}entities/foo/foo-update.tsx`, `{!this.props.account.${tenant} ? (
                    <AvInput`);
        });

        it('entity.tsx partial updates are being done', () => {
            assert.fileContent(`${dir}entities/foo/foo.tsx`, `!this.props.account.${tenant} ? <Translate contentKey`);
            assert.fileContent(`${dir}entities/foo/foo.tsx`, '(storeState: IRootState)');
            assert.fileContent(`${dir}entities/foo/foo.tsx`, 'account: storeState.authentication.account');
            assert.fileContent(`${dir}entities/foo/foo.tsx`, `!this.props.account.${tenant} ? (
                      <td>`);
        });

        it('entity-detail.tsx partial update is being done', () => {
            assert.fileContent(`${dir}entities/foo/foo-detail.tsx`, `!this.props.account.${tenant}`);
            assert.fileContent(`${dir}entities/foo/foo-detail.tsx`, '(storeState: IRootState)');
            assert.fileContent(`${dir}entities/foo/foo-detail.tsx`, 'account: storeState.authentication.account');
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
                        require('../generators/entity/index.js'), // eslint-disable-line global-require
                        'jhipster-multitenancy:entity',
                        path.join(__dirname, '../generators/entity/index.js')
                    ],
                    [
                        require('../generators/entity-client/index.js'), // eslint-disable-line global-require
                        'jhipster-multitenancy:entity-client',
                        path.join(__dirname, '../generators/entity-client/index.js')
                    ]
                ])
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'multitenancy',
                    tenantName: 'Company',
                    skipChecks: true
                })
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
            assert.fileContent(`${dir}entities/${entity}/${entity}-detail.component.html`, `<dt *ngIf="currentAccount && !currentAccount.${tenant}">`);
            assert.fileContent(`${dir}entities/${entity}/${entity}-detail.component.html`, `<div *ngIf="currentAccount && !currentAccount.${tenant}">`);
        });

        it('entity-detail.component.ts partial rewrite is being done', () => {
            assert.fileContent(`${dir}entities/${entity}/${entity}-detail.component.ts`, 'import { AccountService }');
            assert.fileContent(`${dir}entities/${entity}/${entity}-detail.component.ts`, 'currentAccount: any;');
            assert.fileContent(`${dir}entities/${entity}/${entity}-detail.component.ts`, 'this.accountService.identity().then(account => {'); // eslint-disable-line
            assert.fileContent(`${dir}entities/${entity}/${entity}-detail.component.ts`, 'protected accountService: AccountService');
        });

        it('entity-update.component.html partial rewrite is being done', () => {
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.html`, `<div class="form-group" *ngIf="!currentAccount.${tenant}">`); // eslint-disable-line
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.html`, `<div *ngIf="!currentAccount.${tenant} && editForm.get('${tenant}')`); // eslint-disable-line
        });

        it('entity-update.component.ts partial rewrite is being done', () => {
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.ts`, 'import { AccountService }');
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.ts`, 'currentAccount: any;');
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.ts`, 'this.accountService.identity().then(account => {'); // eslint-disable-line
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.ts`, `this.currentAccount.${tenant}`);
            // eslint-disable-next-line
            assert.fileContent(`${dir}entities/${entity}/${entity}-update.component.ts`, `return;`); // eslint-disable-line
        });

        it('entity.component.html partial rewrite is being done', () => {
            assert.fileContent(`${dir}entities/${entity}/${entity}.component.html`, `<th *ngIf="!currentAccount.${tenant}">`);
            assert.fileContent(`${dir}entities/${entity}/${entity}.component.html`, `<td *ngIf="!currentAccount.${tenant}">`);
        });
    });
});

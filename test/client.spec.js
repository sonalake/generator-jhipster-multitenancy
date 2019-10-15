const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');

const dir = 'src/main/webapp/app/';
const tenant = 'company';
const tenantNameUpperFirst = 'Company';
const tenantNamePluralLowerFirst = 'companies';

describe('Subgenerator client of multitenancy JHipster blueprint', () => {
    describe('Sample test', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/client')
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
                        require('../generators/client/index.js'), // eslint-disable-line global-require
                        'jhipster-multitenancy:client',
                        path.join(__dirname, '../generators/client/index.js')
                    ]
                ])
                .on('end', done);
        });
        it('contains clientFramework with angularx value', () => {
            assert.fileContent('.yo-rc.json', /"clientFramework": "angularX"/);
        });

        it('account.model.ts partial rewrite is being done', () => {
            assert.fileContent(`${dir}core/user/account.model.ts`, `public ${tenant}: string,`);
        });

        it('account.service.ts partial rewrite is being done', () => {
            assert.fileContent(`${dir}core/auth/account.service.ts`, `this.isIdentityResolved() ? this.userIdentity.${tenant} : null`);
        });

        it('user-management-detail is being overwritten', () => {
            assert.fileContent(`${dir}admin/user-management/user-management-detail.component.html`, `<dd>{{user.${tenant}?.name}}</dd>`);
        });

        it('user-management-update html is being overwritten', () => {
            assert.fileContent(
                `${dir}admin/user-management/user-management-update.component.html`,
                `<div class="form-group" *ngIf="!currentAccount.${tenant} && ${tenantNamePluralLowerFirst} && ${tenantNamePluralLowerFirst}.length > 0">`
            );
        });

        it('user-management-update ts is being overwritten', () => {
            assert.fileContent(
                `${dir}admin/user-management/user-management-update.component.ts`,
                `track${tenantNameUpperFirst}ById(index: number, item: I${tenantNameUpperFirst})`
            );
        });

        it('user-management is being overwritten', () => {
            assert.fileContent(
                `${dir}admin/user-management/user-management.component.html`,
                `<td *ngIf="!currentAccount.${tenant}">{{user.${tenant}?.name}}</td>`
            );
        });

        it('user.model.ts is being overwritten', () => {
            assert.fileContent(`${dir}core/user/user.model.ts`, `public ${tenant}?: ${tenantNameUpperFirst}`);
        });
    });
    describe('Validation check for "React" client framework', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/client')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, './templates/React'), dir);
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
        it('contains clientFramework with react value', () => {
            assert.fileContent('.yo-rc.json', /"clientFramework": "react"/);
        });

        it('user-management-update is being overwritten', () => {
            assert.fileContent(
                `${dir}modules/administration/user-management/user-management-update.tsx`,
                'export class UserManagementUpdate'
            );
        });

        it('user-management is being overwritten', () => {
            assert.fileContent(
                `${dir}modules/administration/user-management/user-management.tsx`,
                `<Translate contentKey="jhipsterApp.${tenant}.detail.title">${tenantNameUpperFirst}</Translate>`
            );
        });

        it('user-management-detail partial rewrite is being done', () => {
            assert.fileContent(
                `${dir}modules/administration/user-management/user-management-detail.tsx`,
                `<dd>{user.${tenant} ? user.${tenant}.name : null}</dd>`
            );
        });

        it('user-management.reducer is being overwritten', () => {
            assert.fileContent(
                `${dir}modules/administration/user-management/user-management.reducer.ts`,
                'payload: axios.put(apiUrl, cleanEntity(user))'
            );
        });
    });
});

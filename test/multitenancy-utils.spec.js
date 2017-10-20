const fs = require('fs');
const assert = require('yeoman-assert');
const mtUtils = require('../generators/multitenancy-utils');
const describe = require('mocha').describe;
const it = require('mocha').it;

describe('Multitenancy Utils Methods', () => {
    describe('readConfig', () => {
        describe('when called', () => {
            it('returns config variables in context', () => {
                assert.file('test/templates/mainGen/maven-angularx/.yo-rc.json');
                fs.readFile('test/templates/mainGen/maven-angularx/.yo-rc.json', 'utf8', function (err, data) {
                    if (err) throw err;
                    const config = JSON.parse(data);
                    mtUtils.readConfig(config, this);
                    // assert frequently used variable are read into context
                    assert.equal(this.jhipsterVersion, '4.8.0');
                    assert.equal(this.packageName, 'com.mycompany.myapp');
                    assert.equal(this.hibernateCache, 'ehcache');
                    assert.equal(this.databaseType, 'sql');
                    assert.equal(this.devDatabaseType, 'h2Disk');
                    assert.equal(this.prodDatabaseType, 'mysql');
                });
            });
        });
    });
    describe('tenantVariables', () => {
        describe('when called', () => {
            it('returns tenant variables in context', () => {
                mtUtils.tenantVariables('company', this);
                assert.textEqual(this.tenantNameUpperCase, 'COMPANY');
                assert.textEqual(this.tenantNameUpperFirst, 'Company');
                assert.textEqual(this.tenantNameLowerCase, 'company');
                assert.textEqual(this.tenantNameLowerFirst, 'company');
                assert.textEqual(this.tenantNameSpinalCased, 'company');
                assert.textEqual(this.tenantNamePlural, 'companies');
                assert.textEqual(this.tenantNamePluralLowerFirst, 'companies');
                assert.textEqual(this.tenantNamePluralUpperFirst, 'Companies');
            });
        });
    });
});

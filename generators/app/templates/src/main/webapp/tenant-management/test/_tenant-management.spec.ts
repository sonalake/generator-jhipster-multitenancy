<%#
 Copyright 2013-2017 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://jhipster.github.io/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('<%= tenantNameUpperFirst %>-management e2e test', () => {

    let navBarPage: NavBarPage;
    let <%= tenantNameLowerFirst %>MgmtDialogPage: <%= tenantNameUpperFirst %>MgmtDialogPage;
    let <%= tenantNameLowerFirst %>MgmtComponentsPage: <%= tenantNameUpperFirst %>MgmtComponentsPage;
    
    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage(true);
        <%= tenantNameLowerFirst %>MgmtComponentsPage = new <%= tenantNameUpperFirst %>MgmtComponentsPage();
        <%= tenantNameLowerFirst %>MgmtDialogPage = new <%= tenantNameUpperFirst %>MgmtDialogPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
        navBarPage.clickOnAdminMenu();
        navBarPage.clickOnAdmin("<%= tenantNameLowerFirst %>-management");
        browser.waitForAngular();
    });

    it('should load create <%= tenantNameLowerFirst %> dialog', () => {
        <%= tenantNameLowerFirst %>MgmtComponentsPage.clickOnCreateButton();
        <%_ if (enableTranslation) { _%>
        expect(<%= tenantNameLowerFirst %>MgmtDialogPage.getModalTitle()).toMatch(/<%= tenantNameLowerFirst %>Management.home.createLabel/);
        <%_ } else { _%>
        expect(<%= entityInstance %>DialogPage.getModalTitle()).toMatch(/Create new <%= tenantNameUpperFirst %>/);
        <%_ } _%>
        <%= tenantNameLowerFirst %>MgmtDialogPage.close();
    });

   it('should create and save <%= tenantNamePluralLowerFirst %>', () => {
        <%= tenantNameLowerFirst %>MgmtComponentsPage.clickOnCreateButton();
        <%= tenantNameLowerFirst %>MgmtDialogPage.setNameInput('new <%= tenantNameLowerFirst %>');
        expect(<%= tenantNameLowerFirst %>MgmtDialogPage.getNameInput()).toMatch('new <%= tenantNameLowerFirst %>');
        <%= tenantNameLowerFirst %>MgmtDialogPage.save();
        expect(<%= tenantNameLowerFirst %>MgmtDialogPage.getSaveButton().isPresent()).toBeFalsy();        
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class <%= tenantNameUpperFirst %>MgmtComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class <%= tenantNameUpperFirst %>MgmtDialogPage {
    modalTitle = element(by.css('.modal-title'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }
    
    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}

import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { EntComponentsPage, EntUpdatePage } from './ent.page-object';

describe('Ent e2e test', () => {
    let navBarPage: NavBarPage;
    let entUpdatePage: EntUpdatePage;
    let entComponentsPage: EntComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Ents', () => {
        navBarPage.goToEntity('ent');
        entComponentsPage = new EntComponentsPage();
        expect(entComponentsPage.getTitle()).toMatch(/jhipsterApp.ent.home.title/);
    });

    it('should load create Ent page', () => {
        entComponentsPage.clickOnCreateButton();
        entUpdatePage = new EntUpdatePage();
        expect(entUpdatePage.getPageTitle()).toMatch(/jhipsterApp.ent.home.createOrEditLabel/);
        entUpdatePage.cancel();
    });

    it('should create and save Ents', () => {
        entComponentsPage.clickOnCreateButton();
        entUpdatePage.setNameInput('name');
        expect(entUpdatePage.getNameInput()).toMatch('name');
        entUpdatePage.save();
        expect(entUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

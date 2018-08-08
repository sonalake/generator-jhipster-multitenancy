const tmpl = (context) => {
    let template = `create${context.tenantNameUpperFirst}() {
        const ${context.tenantNameLowerFirst}MgmtUpdatePage = new ${context.tenantNameUpperFirst}MgmtUpdatePage();
        const navBarPage = new NavBarPage(true);
        navBarPage.clickOnAdminMenu();
        navBarPage.clickOnAdmin('${context.tenantNameLowerFirst}-management');
        browser.waitForAngular();

        this.clickOnCreateButton();
        ${context.tenantNameLowerFirst}MgmtUpdatePage.setNameInput('test');
        ${context.tenantNameLowerFirst}MgmtUpdatePage.save();
    }`;
    return template;
};

module.exports = {
    tmpl
};

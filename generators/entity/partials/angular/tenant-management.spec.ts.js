const tmpl = (context) => {
    let template = `create${context.tenantNameUpperFirst}() {
        const ${context.tenantNameLowerFirst}MgmtDialogPage = new ${context.tenantNameUpperFirst}MgmtDialogPage();
        const navBarPage = new NavBarPage(true);
        navBarPage.clickOnAdminMenu();
        navBarPage.clickOnAdmin('${context.tenantNameLowerFirst}-management');
        browser.waitForAngular();

        this.clickOnCreateButton();
        ${context.tenantNameLowerFirst}MgmtDialogPage.setNameInput('test');
        ${context.tenantNameLowerFirst}MgmtDialogPage.save();
    }`;
    return template;
};

module.exports = {
    tmpl
};

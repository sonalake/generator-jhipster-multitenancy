const tmpl = context => `it('should load ${context.tenantNameLowerFirst} management', () => {
        navBarPage.clickOnAdmin("${context.tenantNameLowerFirst}-management");
        const expect1 = /${context.tenantNameLowerFirst}Management.home.title/;
        element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });\n`;

module.exports = {
    tmpl
};

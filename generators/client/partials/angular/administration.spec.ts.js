const file = (context) => {
    return `${context.CLIENT_TEST_SRC_DIR}e2e/admin/administration.spec.ts`;
};

const tmpls = [
    {
        condition: (context) => context.protractorTests && !context.enableTranslation,
        type: 'rewriteFile',
        target: (context) => {
            return `it(\'should load metrics\', async () => {`;
        },
        tmpl: (context) => {
            return `it('should load ${context.tenantNameLowerFirst} management', async () => {
        await navBarPage.clickOnAdmin('${context.tenantNameLowerFirst}-management');
        const expect1 = /${context.tenantNamePluralUpperFirst}/;
        const value1 = await element(by.id('${context.tenantNameLowerFirst}-management-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });\n`;
        }
    },
    {
        condition: (context) => context.protractorTests && context.enableTranslation,
        type: 'rewriteFile',
        target: (context) => {
            return `it(\'should load metrics\', async () => {`;
        },
        tmpl: (context) => {
            return `it('should load ${context.tenantNameLowerFirst} management', async () => {
        await navBarPage.clickOnAdmin('${context.tenantNameLowerFirst}-management');
        const expect1 = '${context.tenantNameLowerFirst}Management.home.title';
        const value1 = await element(by.id('${context.tenantNameLowerFirst}-management-page-heading')).getAttribute('jhiTranslate');
        expect(value1).to.eq(expect1);
    });\n`;
        }
    },
]

module.exports = {
    file,
    tmpls
};
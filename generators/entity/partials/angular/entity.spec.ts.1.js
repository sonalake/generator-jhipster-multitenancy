const tmpl = (context) => {
    let template = `it('should create and save ${context.options.name}', () => {
        ${context.tenantNameLowerFirst}MgmtComponentsPage = new ${context.tenantNameUpperFirst}MgmtComponentsPage();
        ${context.tenantNameLowerFirst}MgmtComponentsPage.create${context.tenantNameUpperFirst}();

        navBarPage.goToEntity('${context.options.name}');`;
    return template;
};

module.exports = {
    tmpl
};

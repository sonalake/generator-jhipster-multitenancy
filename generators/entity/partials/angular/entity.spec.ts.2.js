const tmpl = (context) => {
    let template = `set${context.tenantNameUpperFirst} = function() {
        this.${context.tenantNameLowerFirst}Select.click();
        this.${context.tenantNameLowerFirst}Select.sendKeys('t');
        this.${context.tenantNameLowerFirst}Select.sendKeys(protractor.Key.ENTER);
    };
`;
    return template;
};

module.exports = {
    tmpl
};

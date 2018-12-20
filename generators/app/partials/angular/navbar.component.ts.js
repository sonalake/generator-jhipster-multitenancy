const tmpl = context => `has${context.tenantNameUpperFirst}() {
        return this.accountService.get${context.tenantNameUpperFirst}() ? true : false;
    }`;

module.exports = {
    tmpl
};

const tmpl = context => `has${context.tenantNameUpperFirst}() {
        return this.principal.get${context.tenantNameUpperFirst}() ? true : false;
    }`;

module.exports = {
    tmpl
};

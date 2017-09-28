const tmpl = context => `get${context.tenantNameUpperFirst}(): String {
        return this.isIdentityResolved() ? this.userIdentity.${context.tenantNameLowerFirst} : null;
    }\n`;

module.exports = {
    tmpl
};

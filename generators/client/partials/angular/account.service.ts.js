const file = context => `${context.webappDir}app/core/auth/account.service.ts`;

const tmpls = [
    {
        type: 'rewriteFile',
        regex: true,
        target: 'getImageUrl(): string {',
        tmpl: context => `get${context.tenantNameUpperFirst}(): String {
    return this.isIdentityResolved() ? this.userIdentity.${context.tenantNameLowerFirst} : null;
  }\n`
    }
];

module.exports = {
    file,
    tmpls
};

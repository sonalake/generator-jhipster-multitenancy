const file = (context) => {
    return `${context.webappDir}app/layouts/navbar/navbar.component.ts`;
};

const tmpls = [
    {
        type: 'rewriteFile',
        target: (context) => {
            return `getImageUrl() {`;
        },
        tmpl: (context) => {
            return `has${context.tenantNameUpperFirst}() {
    return this.accountService.get${context.tenantNameUpperFirst}() ? true : false;
  }
`;
        }
    },
]

module.exports = {
    file,
    tmpls
};
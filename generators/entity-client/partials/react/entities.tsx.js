const file = context => `${context.webappDir}app/shared/layout/menus/entities.tsx`;

const tmpls = [
    {
        type: 'replaceContent',
        regex: true,
        target: context => `<MenuItem ([^}]+) to="/entity/${context.tenantNameLowerFirst}">([^}]+)</MenuItem>`,
        tmpl: context => ''
    }
];

module.exports = {
    file,
    tmpls
};

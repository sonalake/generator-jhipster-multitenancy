const file = context => `${context.webappDir}app/shared/layout/menus/admin.tsx`;
const tmpls = [
    {
        type: 'rewriteFile',
        regex: true,
        target: context => '<MenuItem icon="tachometer-alt" to="/admin/metrics">',
        tmpl: context =>
            `<MenuItem icon="asterisk" to="/entity/${context.tenantNameLowerFirst}">
              <Translate contentKey="${context.baseName}App.${context.tenantNameLowerFirst}.home.title" />
            </MenuItem>`
    }
];

module.exports = {
    file,
    tmpls
};

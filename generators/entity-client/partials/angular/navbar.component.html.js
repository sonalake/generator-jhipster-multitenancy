const file = context => `${context.CLIENT_MAIN_SRC_DIR}app/layouts/navbar/navbar.component.html`;

const tmpls = [
    {
        type: 'replaceContent',
        regex: true,
        target: context => `routerLink="${context.tenantNameLowerFirst}"`,
        tmpl: context => `routerLink="${context.tenantNameLowerFirst}" *jhiHasAnyAuthority="'ROLE_ADMIN'"`
    }
];

module.exports = {
    file,
    tmpls
};

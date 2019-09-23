const file = (context) => {
    return `${context.CLIENT_MAIN_SRC_DIR}app/layouts/navbar/navbar.component.html`;
};

const tmpls = [
    {
        type: 'replaceContent',
        regex: true,
        target: (context) => {
              return `routerLink="${context.tenantNameLowerFirst}"`;
        },
        tmpl: (context) => {
              return `routerLink="${context.tenantNameLowerFirst}" *jhiHasAnyAuthority="'ROLE_ADMIN'"`;
        }
    }
]

module.exports = {
    file,
    tmpls
};

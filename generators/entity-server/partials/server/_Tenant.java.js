const file = context => `${context.SERVER_MAIN_SRC_DIR}${context.packageFolder}/domain/${context.tenantNameUpperFirst}.java`;

const tmpls = [
    {
        type: 'replaceContent',
        regex: false,
        target: context => `@OneToMany(mappedBy = "${context.tenantNameLowerFirst}")`,
        tmpl: context => `@OneToMany(mappedBy = "${context.tenantNameLowerFirst}", fetch = FetchType.EAGER)`
    }
];

module.exports = {
    file,
    tmpls
};

const file = (context) => {
    return `${context.SERVER_MAIN_SRC_DIR}${context.packageFolder}/domain/${context.tenantNameUpperFirst}.java`;
};

const tmpls = [
    {
        type: 'replaceContent',
        regex: false,
        target: (context) => {
            return `@OneToMany(mappedBy = "${context.tenantNameLowerFirst}")`;
        },
        tmpl: (context) => {
            return `@OneToMany(mappedBy = "${context.tenantNameLowerFirst}", fetch = FetchType.EAGER)`;
        }
    },
]

module.exports = {
    file,
    tmpls
};

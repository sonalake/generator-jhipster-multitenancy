const file = (context) => {
    return `${context.CLIENT_MAIN_SRC_DIR}app/shared/model/${context.entityFileName}.model.ts`;
};

const tmpls = [
    {
        type: 'replaceContent',
        target: (context) => {
            return `'app/shared/model/${context.tenantNameLowerFirst}.model'`;
        },
        tmpl: (context) => {
            return `'../../admin/${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}.model'`;
        }
    },
]

module.exports = {
    file,
    tmpls
};

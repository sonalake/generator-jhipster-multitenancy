const file = context => `${context.CLIENT_MAIN_SRC_DIR}app/entities/${context.entityFolderName}/${context.entityFileName}.route.ts`;

const tmpls = [
    {
        // Add ROLE
        type: 'replaceContent',
        regex: true,
        target: "authorities: \\['ROLE_USER'\\]",
        tmpl: "authorities: ['ROLE_ADMIN']"
    }
];

module.exports = {
    file,
    tmpls
};

const file = context => `${context.CLIENT_TEST_SRC_DIR}spec/app/modules/administration/user-management/user-management.reducer.spec.ts`;
const tmpls = [
    {
        type: 'replaceContent',
        target: context => 'createUser()',
        tmpl: context => 'createUser({id:1})'
    }
];

module.exports = {
    file,
    tmpls
};

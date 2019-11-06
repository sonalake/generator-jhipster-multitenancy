const file = context => `${context.webappDir}app/modules/administration/user-management/user-management-detail.tsx`;
const tmpls = [
    {
        type: 'rewriteFile',
        regex: true,
        target: context => '<dt><Translate contentKey="userManagement.createdBy">Created By</Translate></dt>',
        tmpl: context => `<dt>
        <Translate contentKey="jhipsterApp.${context.tenantNameLowerFirst}.detail.title">${context.tenantNameUpperFirst}</Translate>
        </dt>
        <dd>{user.${context.tenantNameLowerFirst} ? user.${context.tenantNameLowerFirst}.id : null}</dd>`
    }
];

module.exports = {
    file,
    tmpls
};

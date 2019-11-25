const file = context => `${context.webappDir}app/entities/${context.entityFolderName}/${context.entityFileName}-detail.tsx`;

const tmpls = [
    {
        type: 'replaceContent',
        regex: true,
        target: context => `<Translate(.*)\n(\\s*)${context.tenantNameUpperFirst}\n(\\s*)</Translate>`, // eslint-disable-next-line
        tmpl: context => `{!this.props.account.${context.tenantNameLowerFirst} ? <Translate contentKey="${context.baseName}App.car.${context.tenantNameLowerFirst}">
        ${context.tenantNameUpperFirst}</Translate> : ''}`
    },
    {
        type: 'replaceContent',
        regex: false,
        target: context => `({ ${context.entityInstance} }: IRootState)`,
        tmpl: context => '(storeState: IRootState)'
    },
    {
        type: 'replaceContent',
        regex: false,
        target: context => `${context.entityInstance}Entity: ${context.entityInstance}.entity`,
        tmpl: context => `account: storeState.authentication.account,
                          ${context.entityInstance}Entity: storeState.${context.entityInstance}.entity`
    }
];

module.exports = {
    file,
    tmpls
};

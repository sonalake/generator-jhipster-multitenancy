const file = context => `${context.webappDir}app/entities/${context.entityFolderName}/${context.entityFileName}.tsx`;

const tmpls = [
    {
        type: 'replaceContent',
        target: context => `<Translate contentKey="${context.baseName}App.${context.entityInstance}.${context.tenantNameLowerFirst}">${context.tenantNameUpperFirst}</Translate>`,
        tmpl: context => `{!this.props.account.${context.tenantNameLowerFirst} ? <Translate contentKey="${context.baseName}App.${context.entityInstance}.${context.tenantNameLowerFirst}">${context.tenantNameUpperFirst}</Translate> : ''}` // eslint-disable-line
    },
    {
        type: 'replaceContent',
        target: context => `({ ${context.entityInstance} }: IRootState)`,
        tmpl: context => '(storeState: IRootState)'
    },
    {
        type: 'replaceContent',
        target: context => `${context.entityInstance}List: ${context.entityInstance}.entities`,
        tmpl: context => `account: storeState.authentication.account,
        ${context.entityInstance}List: storeState.${context.entityInstance}.entities`
    },
    {
        type: 'replaceContent',
        regex: false,
        target: context => `<td>
                          {${context.entityInstance}.${context.tenantNameLowerFirst} ?
                          <Link to={\`${context.tenantNameLowerFirst}/\${${context.entityInstance}.${context.tenantNameLowerFirst}.id}\`}>
                            {${context.entityInstance}.${context.tenantNameLowerFirst}.id}
                          </Link> : ''}
                        </td>`, // eslint-disable-next-line
        tmpl: context => `{!this.props.account.${context.tenantNameLowerFirst} ? <td>{${context.entityInstance}.${context.tenantNameLowerFirst} ? <Link to={\`${context.tenantNameLowerFirst}/\${${context.entityInstance}.${context.tenantNameLowerFirst}.id}\`}>
        {${context.entityInstance}.${context.tenantNameLowerFirst}.id}</Link> : ''}</td> : ''}`
    }
];

module.exports = {
    file,
    tmpls
};

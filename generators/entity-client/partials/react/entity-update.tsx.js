const file = context => `${context.webappDir}app/entities/${context.entityFolderName}/${context.entityFileName}-update.tsx`;

const tmpls = [
    {
        type: 'rewriteFile',
        target: context => 'const entity = {',
        tmpl: context => `const ${context.tenantNameLowerFirst} = this.props.account.${context.tenantNameLowerFirst}`
    },
    {
        type: 'rewriteFile',
        target: context => '...values',
        tmpl: context => `${context.tenantNameLowerFirst},`
    },
    {
        type: 'replaceContent',
        target: context => `this.props.get${context.tenantNamePluralUpperFirst}();`,
        tmpl: context =>
            `
            if (!this.props.account.${context.tenantNameLowerFirst}) {
              this.props.get${context.tenantNamePluralUpperFirst}();
            }`
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => `<AvInput(\\s*)id="${context.entityFileName}-${context.tenantNameLowerFirst}"([^]+)</option>([^]+)</AvInput>`,
        tmpl: context => `{!this.props.account.${context.tenantNameLowerFirst} ? <AvInput
                            id="${context.entityFileName}-${context.tenantNameLowerFirst}"
                            type="select"
                            className="form-control"
                            name="${context.tenantNameLowerFirst}.id"
                            value={isNew ? companies[0] && companies[0].id : ${context.entityInstance}Entity.company.id}
                            required
                          >
                            {${context.tenantNamePluralLowerFirst}
                              ? ${context.tenantNamePluralLowerFirst}.map(otherEntity => (
                                  <option value={otherEntity.id} key={otherEntity.id}>
                                    {otherEntity.name}
                                  </option>
                                ))
                              : null}
                          </AvInput> : ''}`
    },
    {
        type: 'rewriteFile',
        target: context => `${context.entityInstance}Entity: storeState.${context.entityInstance}.entity,`,
        tmpl: context => 'account: storeState.authentication.account,'
    },
    {
      type: 'replaceContent',
      regex: true,
      target: context => `<Label for="${context.entityFileName}-${context.tenantNameLowerFirst}">\n(.*)\n(\\s*)</Label>`,
      tmpl: context => `{!this.props.account.${context.tenantNameLowerFirst} ? <Label for="${context.entityFileName}-${context.tenantNameLowerFirst}">
                    <Translate contentKey="jhipsterApp.${context.entityFileName}.${context.tenantNameLowerFirst}">${context.tenantNameUpperFirst}</Translate>
                  </Label>: ''}`
    }
];

module.exports = {
    file,
    tmpls
};

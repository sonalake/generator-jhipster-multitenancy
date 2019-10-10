const file = context => `${context.webappDir}app/entities/${context.entityFolderName}/${context.entityFileName}-update.tsx`;

const tmpls = [
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
        target: context => `<AvInput\n(\\s*)id="${context.entityFileName}-${context.tenantNameLowerFirst}"\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)(\\s*)(.*)\n(.*)\n(\\s*)</AvInput>`,
        tmpl: context => `{!this.props.account.${context.tenantNameLowerFirst} ? <AvInput
                            id="${context.entityFileName}-${context.tenantNameLowerFirst}"
                            type="select"
                            className="form-control"
                            name="${context.tenantNameLowerFirst}.id"
                            value={isNew ? ${context.tenantNamePluralLowerFirst}[0] && ${context.tenantNamePluralLowerFirst}[0].id : ${context.entityFileName}Entity.${context.tenantNameLowerFirst}.id}
                            required
                          >
                            {${context.tenantNamePluralLowerFirst}
                              ? ${context.tenantNamePluralLowerFirst}.map(otherEntity => (
                                  <option value={otherEntity.id} key={otherEntity.id}>
                                    {otherEntity.name}
                                  </option>
                                ))
                              : null}
                          </AvInput> : <AvInput
                          id="${context.entityFileName}-${context.tenantNameLowerFirst}"
                          type="select"
                          className="form-control"
                          name="${context.tenantNameLowerFirst}.id"
                          value={isNew ? ${context.tenantNamePluralLowerFirst}[0] && ${context.tenantNamePluralLowerFirst}[0].id : ${context.entityFileName}Entity.${context.tenantNameLowerFirst}.id}
                          required>{this.props.account.${context.tenantNameLowerFirst} ? <option value={this.props.account.${context.tenantNameLowerFirst}.id}>{this.props.account.${context.tenantNameLowerFirst}.name} </option> : null}</AvInput>}`
    },
    {
        type: 'rewriteFile',
        target: context => `${context.entityFileName}Entity: storeState.${context.entityFileName}.entity,`,
        tmpl: context => 'account: storeState.authentication.account,'
    }
];

module.exports = {
    file,
    tmpls
};

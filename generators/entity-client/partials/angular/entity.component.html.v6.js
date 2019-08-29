const file = (context) => {
    return `${context.CLIENT_MAIN_SRC_DIR}app/entities/${context.entityFolderName}/${context.entityFileName}.component.html`;
};

const tmpls = [
    {
        type: 'replaceContent',
        regex: true,
        target: (context) => {
            return `<th><span(.*)>${context.tenantNameUpperFirst}</span>`;
        },
        tmpl: (context) => {
            return `<th *ngIf="!currentAccount.${context.tenantNameLowerFirst}"><span$1>${context.tenantNameUpperFirst}</span>`;
        }
    },
    {
        type: 'replaceContent',
        regex: true,
        target: (context) => {
            return `<td>\n(\\s*)(<div \\*ngIf="${context.entityInstance}.${context.tenantNameLowerFirst}">)`;
        },
        tmpl: (context) => {
            return `<td *ngIf="!currentAccount.${context.tenantNameLowerFirst}">\n$1$2`;
        }
    }
]
module.exports = {
    file,
    tmpls
};

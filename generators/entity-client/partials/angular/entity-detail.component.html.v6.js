const file = (context) => {
    return `${context.CLIENT_MAIN_SRC_DIR}app/entities/${context.entityFolderName}/${context.entityFileName}-detail.component.html`;
};

const tmpls = [
    {
        type: 'replaceContent',
        regex: true,
        target: (context) => {
            return `<dt><span(.*)>${context.tenantNameUpperFirst}</span></dt>(\\s*)<dd>`;
        },
        tmpl: (context) => {
            return `<dt *ngIf="${context.entityInstance}.${context.tenantNameLowerFirst}"><span$1>${context.tenantNameUpperFirst}</span></dt>$2<dd>`;
        }
    }
]

module.exports = {
    file,
    tmpls
};

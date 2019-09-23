const file = context =>
    `${context.CLIENT_MAIN_SRC_DIR}app/entities/${context.entityFolderName}/${context.entityFileName}-detail.component.html`;

const tmpls = [
    {
        type: 'replaceContent',
        regex: true,
        target: context => `<dt><span(.*)>${context.tenantNameUpperFirst}</span></dt>(\\s*)<dd>`,
        tmpl: context =>
            `<dt *ngIf="${context.entityInstance}.${context.tenantNameLowerFirst}"><span$1>${context.tenantNameUpperFirst}</span></dt>$2<dd>`
    }
];

module.exports = {
    file,
    tmpls
};

const file = (context) => {
    return `${context.webappDir}app/admin/index.ts`;
};

const tmpls = [
    {
        type: 'rewriteFile',
        target: (context) => {
            return `export * from './admin.route';`;
        },
        tmpl: (context) => {
            return `export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management-detail.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management-update.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management-delete-dialog.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management.route';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}.model';`;
        }
    },
]

module.exports = {
    file,
    tmpls
};

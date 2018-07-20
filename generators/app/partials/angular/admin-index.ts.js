const tmpl = context => `export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management-detail.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management-update.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management-delete-dialog.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management.route';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}.model';
export * from './admin.route';`;

module.exports = {
    tmpl
};

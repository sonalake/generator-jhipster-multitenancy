const tmpl = context => `export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management-detail.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management-dialog.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management-delete-dialog.component';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-modal.service';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-management.route';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}.service';
export * from './${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}-modal.service';`;

module.exports = {
    tmpl
};

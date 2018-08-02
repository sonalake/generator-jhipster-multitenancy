const tmpl = (context) => {
    let template = `<dt><span>${context.tenantNameUpperFirst}</span></dt>
        <dd>
            <div *ngIf="${context.options.entityNameLowerFirst}.${context.tenantNameLowerFirst}">
                <a [routerLink]="['/admin/${context.tenantNameLowerFirst}-management', ${context.options.entityNameLowerFirst}.${context.tenantNameLowerFirst}?.id, 'view']">{{${context.options.entityNameLowerFirst}.${context.tenantNameLowerFirst}?.name}}</a>
            </div>
        </dd>`;
    if (context.enableTranslation) {
    template = `<dt><span jhiTranslate="userManagement${context.tenantNameUpperFirst}">${context.tenantNameUpperFirst}</span></dt>
        <dd>
            <div *ngIf="${context.options.entityNameLowerFirst}.${context.tenantNameLowerFirst}">
                <a [routerLink]="['/admin/${context.tenantNameLowerFirst}-management', ${context.options.entityNameLowerFirst}.${context.tenantNameLowerFirst}?.id, 'view']">{{${context.options.entityNameLowerFirst}.${context.tenantNameLowerFirst}?.name}}</a>
            </div>
        </dd>`;
    }
    return template;
};

module.exports = {
    tmpl
};

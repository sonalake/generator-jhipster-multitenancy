const tmpl = (context) => {
    let template = `<dt><span>${context.tenantNameUpperFirst}</span></dt>
        <dd>
            <div *ngIf="${context.options.name}.${context.tenantNameLowerFirst}">
                <a [routerLink]="['/${context.tenantNameLowerFirst}-management', ${context.options.name}.${context.tenantNameLowerFirst}?.id]">{{${context.options.name}.${context.tenantNameLowerFirst}?.name}}</a>
            </div>
        </dd>`;
    if (context.enableTranslation) {
    template = `<dt><span jhiTranslate="fooApp.${context.options.name}.${context.tenantNameLowerFirst}">${context.tenantNameUpperFirst}</span></dt>
        <dd>
            <div *ngIf="${context.options.name}.${context.tenantNameLowerFirst}">
                <a [routerLink]="['/${context.tenantNameLowerFirst}-management', ${context.options.name}.${context.tenantNameLowerFirst}?.id]">{{${context.options.name}.${context.tenantNameLowerFirst}?.name}}</a>
            </div>
        </dd>`;
    }
    return template;
};

module.exports = {
    tmpl
};

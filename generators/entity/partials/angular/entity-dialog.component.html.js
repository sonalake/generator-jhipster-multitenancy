const tmpl = (context) => {
    let template = `    <div class="form-group" *ngIf="!currentAccount.${context.tenantNameLowerFirst}">
            <label class="form-control-label" for="field_${context.tenantNameLowerFirst}">${context.tenantNameUpperFirst}</label>
            <select class="form-control" id="field_${context.tenantNameLowerFirst}" name="${context.tenantNameLowerFirst}" [(ngModel)]="${context.options.name}.${context.tenantNameLowerFirst}"  required>
                <option *ngIf="!editForm.value.${context.tenantNameLowerFirst}" [ngValue]="null" selected></option>
                <option [ngValue]="${context.tenantNameLowerFirst}Option.id === ${context.options.name}.${context.tenantNameLowerFirst}?.id ? ${context.options.name}.${context.tenantNameLowerFirst} : ${context.tenantNameLowerFirst}Option" *ngFor="let ${context.tenantNameLowerFirst}Option of ${context.tenantNamePluralLowerFirst}; trackBy: track${context.tenantNameUpperFirst}ById">{{${context.tenantNameLowerFirst}Option.name}}</option>
            </select>
        </div>
        <div [hidden]="!(editForm.controls.${context.tenantNameLowerFirst}?.dirty && editForm.controls.${context.tenantNameLowerFirst}?.invalid)">
            <small class="form-text text-danger"
                [hidden]="!editForm.controls.${context.tenantNameLowerFirst}?.errors?.required">
                This field is required.
            </small>
        </div>
    </div>
    <div class="modal-footer">`;
    if (context.enableTranslation) {
        template = `    <div class="form-group" *ngIf="!currentAccount.${context.tenantNameLowerFirst}">
            <label class="form-control-label" jhiTranslate="userManagement${context.tenantNameUpperFirst}" for="field_${context.tenantNameLowerFirst}">${context.tenantNameUpperFirst}</label>
            <select class="form-control" id="field_${context.tenantNameLowerFirst}" name="${context.tenantNameLowerFirst}" [(ngModel)]="${context.options.name}.${context.tenantNameLowerFirst}"  required>
                <option *ngIf="!editForm.value.${context.tenantNameLowerFirst}" [ngValue]="null" selected></option>
                <option [ngValue]="${context.tenantNameLowerFirst}Option.id === ${context.options.name}.${context.tenantNameLowerFirst}?.id ? ${context.options.name}.${context.tenantNameLowerFirst} : ${context.tenantNameLowerFirst}Option" *ngFor="let ${context.tenantNameLowerFirst}Option of ${context.tenantNamePluralLowerFirst}; trackBy: track${context.tenantNameUpperFirst}ById">{{${context.tenantNameLowerFirst}Option.name}}</option>
            </select>
        </div>
        <div [hidden]="!(editForm.controls.${context.tenantNameLowerFirst}?.dirty && editForm.controls.${context.tenantNameLowerFirst}?.invalid)">
            <small class="form-text text-danger"
                [hidden]="!editForm.controls.${context.tenantNameLowerFirst}?.errors?.required" jhiTranslate="entity.validation.required">
                This field is required.
            </small>
        </div>
    </div>
    <div class="modal-footer">`;
    }
    return template;
};

module.exports = {
    tmpl
};

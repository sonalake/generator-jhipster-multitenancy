const tmpl = (context) => {
    let template = `<li [hidden]="has${context.tenantNameUpperFirst}()">
                        <a class="dropdown-item" routerLink="${context.tenantNameLowerFirst}-management" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span>${context.tenantNameUpperFirst} Management</span>
                        </a>
                    </li>`;
    if (context.enableTranslation) {
        template = `<li [hidden]="has${context.tenantNameUpperFirst}()">
                        <a class="dropdown-item" routerLink="${context.tenantNameLowerFirst}-management" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.admin.${context.tenantNameLowerFirst}-management">${context.tenantNameUpperFirst} Management</span>
                        </a>
                    </li>`;
    }
    return template;
};

module.exports = {
    tmpl
};

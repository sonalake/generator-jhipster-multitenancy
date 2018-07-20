const tmpl = (context) => {
    let template = `<li [hidden]="has${context.tenantNameUpperFirst}()">
                        <a class="dropdown-item" routerLink="admin/${context.tenantNameLowerFirst}-management" routerLinkActive="active" (click)="collapseNavbar()">
                            <fa-icon [icon]="'asterisk'" [fixedWidth]="true"></fa-icon>
                            <span>${context.tenantNameUpperFirst} Management</span>
                        </a>
                    </li>`;
    if (context.enableTranslation) {
        template = `<li [hidden]="has${context.tenantNameUpperFirst}()">
                        <a class="dropdown-item" routerLink="admin/${context.tenantNameLowerFirst}-management" routerLinkActive="active" (click)="collapseNavbar()">
                            <fa-icon [icon]="'asterisk'" [fixedWidth]="true"></fa-icon>
                            <span jhiTranslate="global.menu.admin.${context.tenantNameLowerFirst}-management">${context.tenantNameUpperFirst} Management</span>
                        </a>
                    </li>`;
    }
    return template;
};

module.exports = {
    tmpl
};

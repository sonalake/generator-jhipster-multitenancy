const tmpl = context => `<li [hidden]="has${context.tenantNameUpperFirst}()">
                        <a class="dropdown-item" routerLink="${context.tenantNameLowerFirst}-management" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.admin.${context.tenantNameLowerFirst}-management">${context.tenantNameUpperFirst} Management</span>
                        </a>
                    </li>`;

module.exports = {
    tmpl
};

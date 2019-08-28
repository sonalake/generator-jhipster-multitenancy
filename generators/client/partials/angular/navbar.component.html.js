const file = (context) => {
    return `${context.webappDir}app/layouts/navbar/navbar.component.html`;
};

const tmpls = [
    {
        condition: (context) => !context.enableTranslation,
        type: 'rewriteFile',
        target: (context) => {
            return `jhipster-needle-add-element-to-admin-menu`;
        },
        tmpl: (context) => {
            return `<li [hidden]="has${context.tenantNameUpperFirst}()">
                        <a class="dropdown-item" routerLink="${context.tenantNameLowerFirst}" routerLinkActive="active" (click)="collapseNavbar()">
                            <fa-icon icon="asterisk" fixedWidth="true"></fa-icon>
                            <span>${context.tenantNamePluralUpperFirst}</span>
                        </a>
                    </li>`;
        }
    },
    {
        condition: (context) => context.enableTranslation,
        type: 'rewriteFile',
        target: (context) => {
            return `jhipster-needle-add-element-to-admin-menu`;
        },
        tmpl: (context) => {
            return `<li [hidden]="has${context.tenantNameUpperFirst}()">
                        <a class="dropdown-item" routerLink="${context.tenantNameLowerFirst}" routerLinkActive="active" (click)="collapseNavbar()">
                            <fa-icon icon="asterisk" fixedWidth="true"></fa-icon>
                            <span jhiTranslate="jhipsterApp.${context.tenantNameLowerFirst}.home.title">${context.tenantNamePluralUpperFirst}</span>
                        </a>
                    </li>`;
        }
    },
]

module.exports = {
    file,
    tmpls
};

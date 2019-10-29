const file = context => `${context.CLIENT_MAIN_SRC_DIR}app/layouts/navbar/navbar.component.html`;

const tmpls = [
    {
        type: 'replaceContent',
        regex: true,
        target: context => `<li>\n(\\s*)<a(.*)routerLink="${context.tenantNameLowerFirst}"([^]+)Company</span>(\\s*)</a>(\\s*)</li>`,
        tmpl: context => ''
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => `<li>\n(\\s*)<a(.*)routerLink="admin/user-management"([^]+)User(\\s)management</span>(\\s*)</a>(\\s*)</li>`, // eslint-disable-line
        tmpl: context => `<li>
                        <a class="dropdown-item" routerLink="${context.tenantNameLowerFirst}" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="collapseNavbar()">
                            <fa-icon icon="asterisk" fixedWidth="true"></fa-icon>
                            <span jhiTranslate="${context.baseName}App.${context.tenantNameLowerFirst}.home.title">${context.tenantNamePluralLowerFirst}</span>
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" routerLink="admin/user-management" routerLinkActive="active" (click)="collapseNavbar()">
                            <fa-icon icon="user" fixedWidth="true"></fa-icon>
                            <span jhiTranslate="global.menu.admin.userManagement">User management</span>
                        </a>
                    </li>`
    }
];

module.exports = {
    file,
    tmpls
};

const file = context =>
    `${context.CLIENT_MAIN_SRC_DIR}app/entities/${context.entityFolderName}/${context.entityFileName}-update.component.ts`;

const tmpls = [
    {
        // imports
        type: 'rewriteFile',
        target: "import { Observable } from 'rxjs';",
        tmpl: context => "import { AccountService } from 'app/core';"
    },
    {
        type: 'replaceContent',
        regex: true,
        target: '\n(\\s*)isSaving: boolean;',
        tmpl: '\n$1currentAccount: any;\n$1isSaving: boolean;'
    },
    {
        // constructor
        type: 'replaceContent',
        regex: true,
        target: '\n(\\s*)private fb: FormBuilder\n(\\s*)\\) {(\\s*)}',
        tmpl: context => `\n$1private fb: FormBuilder,
$1private accountService: AccountService
$2) {
$1this.accountService.identity().then(account => {
$1$2this.currentAccount = account;
$1});
$2}`
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => `this.updateForm\\(${context.entityInstance}\\);`,
        tmpl: context => `if (this.currentAccount.${context.tenantNameLowerFirst}){
                 \n${context.entityInstance}.${context.tenantNameLowerFirst} = this.currentAccount.${context.tenantNameLowerFirst};
             \n}
             this.updateForm(${context.entityInstance});`
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => `this.${context.tenantNameLowerFirst}Service`,
        tmpl: context => `if (this.currentAccount.${context.tenantNameLowerFirst}) {return;}
           \nthis.${context.tenantNameLowerFirst}Service`
    }
];

module.exports = {
    file,
    tmpls
};

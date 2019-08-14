const file = (context) => {
    return `${context.CLIENT_MAIN_SRC_DIR}app/entities/${context.entityFolderName}/${context.entityFileName}-update.component.ts`;
};

const tmpls = [
    { // imports
        type: 'rewriteFile',
        target: 'import { Observable } from \'rxjs\';',
        tmpl: (context) => {
            return `import { AccountService } from 'app/core';`;
        }
    },
    {
        type: 'replaceContent',
        target: (context) => {
            return `'app/shared/model/${context.tenantNameLowerFirst}.model'`;
        },
        tmpl: (context) => {
            return `'../../admin/${context.tenantNameLowerFirst}-management/${context.tenantNameLowerFirst}.model'`;
        }
    },
    {
        type: 'replaceContent',
        target: (context) => {
            return `'app/entities/${context.tenantNameLowerFirst}'`;
        },
        tmpl: (context) => {
            return `'../../shared/company/${context.tenantNameLowerFirst}.service'`;
        }
    },
    {
        type: 'replaceContent',
        regex: true,
        target: '\n(\\s*)isSaving: boolean;',
        tmpl: '\n$1currentAccount: any;\n$1isSaving: boolean;'
    },
    { // constructor
        type: 'replaceContent',
        regex: true,
        target: '\n(\\s*)private fb: FormBuilder\n(\\s*)\\) {(\\s*)}',
//        target: '\n(\\s*)private fb: FormBuilder\n(\\s*)\\) \\{\\}',
        tmpl: (context) => {
            return `\n$1private fb: FormBuilder,
$1private accountService: AccountService
$2) {
$1this.accountService.identity().then(account => {
$1$2this.currentAccount = account;
$1});
$2}`;
        }
    },
]

module.exports = {
    file,
    tmpls
};

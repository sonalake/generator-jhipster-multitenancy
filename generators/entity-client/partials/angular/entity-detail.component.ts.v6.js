const file = context =>
    `${context.CLIENT_MAIN_SRC_DIR}app/entities/${context.entityFolderName}/${context.entityFileName}-detail.component.ts`;

const tmpls = [
    {
        type: 'rewriteFile',
        regex: true,
        target: context => `import { ActivatedRoute } from '@angular/router';`, // eslint-disable-line
        tmpl: context => "import { AccountService } from 'app/core/auth/account.service';"
    },
    {
        type: 'rewriteFile',
        regex: true,
        target: context => `${context.entityInstance}: I${context.entityClass}`,
        tmpl: context => 'currentAccount: any;'
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => 'protected activatedRoute: ActivatedRoute',
        tmpl: context => `
          protected activatedRoute: ActivatedRoute,
          protected accountService: AccountService
          `
    },
    {
        type: 'rewriteFile',
        regex: true,
        target: context => 'this.activatedRoute.data.subscribe',
        tmpl: context => `this.accountService.identity().then(account => {
      this.currentAccount = account;
    });`
    }
];

module.exports = {
    file,
    tmpls
};

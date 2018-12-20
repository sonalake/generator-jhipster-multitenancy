const tmpl = (context) => {
    const template = `private activatedRoute: ActivatedRoute, private ${context.tenantNameLowerFirst}Service: ${context.tenantNameUpperFirst}Service, private accountService: AccountService) {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
    }`;

    return template;
};

module.exports = {
    tmpl
};

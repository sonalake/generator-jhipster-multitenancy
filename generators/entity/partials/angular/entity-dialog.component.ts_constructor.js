const tmpl = (context) => {
    let template =`private eventManager: JhiEventManager,
        private ${context.tenantNameLowerFirst}Service: ${context.tenantNameUpperFirst}Service,
        private principal: Principal
        ) {
            this.principal.identity().then((account) => {
                this.currentAccount = account;
            });
        }`;

    return template;
};

module.exports = {
    tmpl
};
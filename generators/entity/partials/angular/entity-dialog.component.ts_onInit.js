const tmpl = (context) => {
    let template =`ngOnInit() {
        this.${context.tenantNameLowerFirst}Service.query()
            .subscribe((res: ResponseWrapper) => { this.${context.tenantNamePluralLowerFirst} = res.json; });`;
    
    return template;
};

module.exports = {
    tmpl
};


const tmpl = (context) => {
    let template =`ngOnInit() {
        this.${context.tenantNameLowerFirst}Service.query()
            .subscribe((res: HttpResponse<Company[]>) => { this.${context.tenantNamePluralLowerFirst} = res.body; });`;

    return template;
};

module.exports = {
    tmpl
};


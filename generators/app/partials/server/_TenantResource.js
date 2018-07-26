const tmpl = context => 
`${context.tenantNameUpperFirst} ${context.tenantNameLowerFirst} = ${context.tenantNameLowerFirst}Service.findOne(id).orElse(null);;
        if(${context.tenantNameLowerFirst} == null || !${context.tenantNameLowerFirst}.getUsers().isEmpty()){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "deletefail", "Delete Failed. Please remove users first")).body(null);
        }`;

module.exports = {
    tmpl
};

const tmpl = context => 
`Optional<${context.tenantNameUpperFirst}> ${context.tenantNameLowerFirst} = ${context.tenantNameLowerFirst}Service.findOneAndFetchUsersEagerly(id);
        if(${context.tenantNameLowerFirst}.isPresent() && !${context.tenantNameLowerFirst}.get().getUsers().isEmpty()){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "deletefail", "Delete Failed. Please remove users first")).body(null);
        }`;

module.exports = {
    tmpl
};

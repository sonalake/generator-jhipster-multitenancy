const file = (context) => {
    return `${context.SERVER_MAIN_SRC_DIR}${context.packageFolder}/web/rest/${context.tenantNameUpperFirst}Resource.java`;
};

const tmpls = [
    {
        type: 'rewriteFile',
        target: (context) => {
            return `${context.tenantNameLowerFirst}Service.delete(id);`;
        },
        tmpl: (context) => {
            return `${context.tenantNameUpperFirst} ${context.tenantNameLowerFirst} = ${context.tenantNameLowerFirst}Service.findOne(id).orElse(null);
        if(${context.tenantNameLowerFirst} == null || !${context.tenantNameLowerFirst}.getUsers().isEmpty()){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(applicationName, true, ENTITY_NAME, "deletefail", "Delete Failed. Please remove users first")).build();
        }`;
        }
    },
]

module.exports = {
    file,
    tmpls
};

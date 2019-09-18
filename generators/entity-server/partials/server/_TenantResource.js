const file = context => `${context.SERVER_MAIN_SRC_DIR}${context.packageFolder}/web/rest/${context.tenantNameUpperFirst}Resource.java`;

const tmpls = [
    {
        type: 'rewriteFile',
        target: context => `${context.tenantNameLowerFirst}Service.delete(id);`,
        tmpl: context => `${context.tenantNameUpperFirst} ${context.tenantNameLowerFirst} = ${context.tenantNameLowerFirst}Service.findOne(id).orElse(null);
        if(${context.tenantNameLowerFirst} == null || !${context.tenantNameLowerFirst}.getUsers().isEmpty()){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(applicationName, true, ENTITY_NAME, "deletefail", "Delete Failed. Please remove users first")).build();
        }`
    },
    {
        type: 'rewriteFile',
        target: context => `public class ${context.tenantNameUpperFirst}Resource {`,
        tmpl: context => '@PreAuthorize("hasAnyRole(\\"" + AuthoritiesConstants.ADMIN + "\\")")'
    },
    {
        type: 'rewriteFile',
        target: context => 'import io.github.jhipster.web.util.HeaderUtil;',
        tmpl: context => `import ${context.packageName}.security.AuthoritiesConstants;
import org.springframework.security.access.prepost.PreAuthorize;
`
    }
];

module.exports = {
    file,
    tmpls
};

// Add jpa filter to the entity to remove entries from another tenant
const file = context => `${context.SERVER_MAIN_SRC_DIR}${context.packageFolder}/service/dto/UserDTO.java`;

const tmpls = [
    {
        type: 'replaceContent',
        regex: true,
        target: context => `(import ${context.packageName}\\.domain\\.User;)`,
        tmpl: context => `$1
import ${context.packageName}.domain.${context.tenantNameUpperFirst};`
    },
    {
        type: 'rewriteFile',
        target: context => 'public UserDTO() {',
        tmpl: context => `private ${context.tenantNameUpperFirst} ${context.tenantNameLowerFirst};`
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => `(\n(.*)this\\.authorities = user\\.getAuthorities\\(\\)\\.stream\\(\\)
(.*)\\.map\\(Authority::getName\\)
(.*)collect\\(Collectors.toSet\\(\\)\\);)`,
        tmpl: context => `$1
$2this.${context.tenantNameLowerFirst} = user.get${context.tenantNameUpperFirst}();`
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => `(\n(.*)this\\.authorities = authorities;
(.*)\\})`,
        tmpl: context => `$1

$3public ${context.tenantNameUpperFirst} get${context.tenantNameUpperFirst}() {
$2return ${context.tenantNameLowerFirst};
$3}

$3public void set${context.tenantNameUpperFirst}(${context.tenantNameUpperFirst} ${context.tenantNameLowerFirst}) {
$2this.${context.tenantNameLowerFirst} = ${context.tenantNameLowerFirst};
$3}`
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => '((.*)", authorities=" \\+ authorities \\+)',
        tmpl: context => `$1
$2", ${context.tenantNameLowerFirst}='" + ${context.tenantNameLowerFirst} + '\\'' +`
    }
];

module.exports = {
    file,
    tmpls
};

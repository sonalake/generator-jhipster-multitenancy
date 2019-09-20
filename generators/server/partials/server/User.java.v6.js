// Add jpa filter to the entity to remove entries from another tenant
const file = context => `${context.SERVER_MAIN_SRC_DIR}${context.packageFolder}/domain/User.java`;

const tmpls = [
    {
        type: 'replaceContent',
        regex: true,
        target: context => '(import org\\.hibernate\\.annotations\\.BatchSize;)',
        tmpl: context => `$1
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;`
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => '(public class User)',
        tmpl: context => `@FilterDef(name = "${context.tenantNameUpperCase}_FILTER", parameters = {@ParamDef(name = "${context.tenantNameSpinalCased}Id", type = "long")})
@Filter(name = "${context.tenantNameUpperCase}_FILTER", condition = "${context.tenantNameSpinalCased}_id = :${context.tenantNameSpinalCased}Id")
$1`
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => '((.*)public Long getId)',
        tmpl: context => `$2@ManyToOne
$2private ${context.tenantNameUpperFirst} ${context.tenantNameLowerFirst};

$1`
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => '(@Override\n(.*)public boolean equals\\(Object o\\) \\{\n(.*)if)',
        tmpl: context => `public ${context.tenantNameUpperFirst} get${context.tenantNameUpperFirst}() {
$3return ${context.tenantNameLowerFirst};
$2}

$2public void set${context.tenantNameUpperFirst}(${context.tenantNameUpperFirst} ${context.tenantNameLowerFirst}) {
$3this.${context.tenantNameLowerFirst} = ${context.tenantNameLowerFirst};
$2}

$2$1`
    },
    {
        type: 'replaceContent',
        regex: true,
        target: context => "((.*)\", activationKey='\" \\+ activationKey \\+ '\\\\'' \\+)",
        tmpl: context => `$1
$2", ${context.tenantNameLowerFirst}='" + ${context.tenantNameLowerFirst} + '\\'' +`
    }
];

module.exports = {
    file,
    tmpls
};

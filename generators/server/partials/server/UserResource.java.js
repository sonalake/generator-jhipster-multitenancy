const file = context => `${context.SERVER_MAIN_SRC_DIR}${context.packageFolder}/web/rest/UserResource.java`;

const tmpls = [
    {
        type: 'replaceContent',
        regex: true,
        target: context => '@PreAuthorize\\("hasRole\\(\\\\""',
        // target: context => '@PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")',
        tmpl: context => `@PreAuthorize("hasAnyRole(\\"" + AuthoritiesConstants.ADMIN + ", "`
    }
];

module.exports = {
    file,
    tmpls
};

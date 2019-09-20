const file = context => `${context.SERVER_MAIN_SRC_DIR}${context.packageFolder}/service/${context.tenantNameUpperFirst}Service.java`;

const tmpls = [
    {
        type: 'replaceContent',
        regex: false,
        target: context => `return ${context.tenantNameLowerFirst}Repository.findById(id);`,
        tmpl: context => `return ${context.tenantNameLowerFirst}Repository.findById(id);
    }

    /**
    * Get one ${context.tenantNameLowerFirst} by id including the users.
    *
    * @param id the id of the entity
    * @return the entity
    */
    @Transactional(readOnly = true)
    public Optional<${context.tenantNameUpperFirst}> findOneAndFetchUsersEagerly(Long id) {
        log.debug("Request to get ${context.tenantNameUpperFirst} with users: {}", id);
        return ${context.tenantNameLowerFirst}Repository.findOneAndFetchUsersEagerly(id);`
    }
];

module.exports = {
    file,
    tmpls
};

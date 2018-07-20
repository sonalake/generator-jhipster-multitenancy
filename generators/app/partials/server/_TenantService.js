const tmpl = context => 
`return ${context.tenantNameLowerFirst}Repository.findById(id);
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
        return ${context.tenantNameLowerFirst}Repository.findOneAndFetchUsersEagerly(id);`;

module.exports = {
    tmpl
};

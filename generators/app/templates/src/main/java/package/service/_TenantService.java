package <%=packageName%>.service;

import <%=packageName%>.domain.<%= tenantNameUpperFirst %>;
import <%=packageName%>.repository.<%= tenantNameUpperFirst %>Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing <%= tenantNameUpperFirst %>.
 */
@Service
@Transactional
public class <%= tenantNameUpperFirst %>Service {

    private final Logger log = LoggerFactory.getLogger(<%= tenantNameUpperFirst %>Service.class);

    private final <%= tenantNameUpperFirst %>Repository <%= tenantNameLowerFirst %>Repository;

    public <%= tenantNameUpperFirst %>Service(<%= tenantNameUpperFirst %>Repository <%= tenantNameLowerFirst %>Repository) {
        this.<%= tenantNameLowerFirst %>Repository = <%= tenantNameLowerFirst %>Repository;
    }

    /**
     * Save a <%= tenantNameLowerFirst %>.
     *
     * @param <%= tenantNameLowerFirst %> the entity to save
     * @return the persisted entity
     */
    public <%= tenantNameUpperFirst %> save(<%= tenantNameUpperFirst %> <%= tenantNameLowerFirst %>) {
        log.debug("Request to save <%= tenantNameUpperFirst %> : {}", <%= tenantNameLowerFirst %>);
        return <%= tenantNameLowerFirst %>Repository.save(<%= tenantNameLowerFirst %>);
    }

    /**
     *  Get all the <%= tenantNamePluralLowerFirst %>.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<<%= tenantNameUpperFirst %>> findAll() {
        log.debug("Request to get all <%= tenantNamePluralLowerFirst %>");

        return <%= tenantNameLowerFirst %>Repository.findAll();
    }

    /**
     *  Get one <%= tenantNameLowerFirst %> by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public <%= tenantNameUpperFirst %> findOne(Long id) {
        log.debug("Request to get <%= tenantNameUpperFirst %> : {}", id);
        return <%= tenantNameLowerFirst %>Repository.findOne(id);
    }

    /**
     *  Delete the  <%= tenantNameLowerFirst %> by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete <%= tenantNameUpperFirst %> : {}", id);
        <%= tenantNameLowerFirst %>Repository.delete(id);
    }
}

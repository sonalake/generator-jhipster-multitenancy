package <%=packageName%>.service;

import <%=packageName%>.domain.<%= tennantNameUpperFirst %>;
import <%=packageName%>.repository.<%= tennantNameUpperFirst %>Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing <%= tennantNameUpperFirst %>.
 */
@Service
@Transactional
public class <%= tennantNameUpperFirst %>Service {

    private final Logger log = LoggerFactory.getLogger(<%= tennantNameUpperFirst %>Service.class);

    private final <%= tennantNameUpperFirst %>Repository <%= tennantNameLowerFirst %>Repository;

    public <%= tennantNameUpperFirst %>Service(<%= tennantNameUpperFirst %>Repository <%= tennantNameLowerFirst %>Repository) {
        this.<%= tennantNameLowerFirst %>Repository = <%= tennantNameLowerFirst %>Repository;
    }

    /**
     * Save a <%= tennantNameLowerFirst %>.
     *
     * @param <%= tennantNameLowerFirst %> the entity to save
     * @return the persisted entity
     */
    public <%= tennantNameUpperFirst %> save(<%= tennantNameUpperFirst %> <%= tennantNameLowerFirst %>) {
        log.debug("Request to save <%= tennantNameUpperFirst %> : {}", <%= tennantNameLowerFirst %>);
        return <%= tennantNameLowerFirst %>Repository.save(<%= tennantNameLowerFirst %>);
    }

    /**
     *  Get all the <%= tennantNamePluralLowerFirst %>.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<<%= tennantNameUpperFirst %>> findAll() {
        log.debug("Request to get all <%= tennantNamePluralLowerFirst %>");

        return <%= tennantNameLowerFirst %>Repository.findAll();
    }

    /**
     *  Get one <%= tennantNameLowerFirst %> by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public <%= tennantNameUpperFirst %> findOne(Long id) {
        log.debug("Request to get <%= tennantNameUpperFirst %> : {}", id);
        return <%= tennantNameLowerFirst %>Repository.findOne(id);
    }

    /**
     *  Delete the  <%= tennantNameLowerFirst %> by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete <%= tennantNameUpperFirst %> : {}", id);
        <%= tennantNameLowerFirst %>Repository.delete(id);
    }
}

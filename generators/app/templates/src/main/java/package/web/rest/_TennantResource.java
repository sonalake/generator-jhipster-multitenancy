package <%=packageName%>.web.rest;

import com.codahale.metrics.annotation.Timed;
import <%=packageName%>.domain.<%= tennantNameUpperFirst %>;
import <%=packageName%>.service.<%= tennantNameUpperFirst %>Service;
import <%=packageName%>.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing <%= tennantNameUpperFirst %>.
 */
@RestController
@RequestMapping("/api")
public class <%= tennantNameUpperFirst %>Resource {

    private final Logger log = LoggerFactory.getLogger(<%= tennantNameUpperFirst %>Resource.class);

    private static final String ENTITY_NAME = "<%= tennantNameLowerFirst %>";

    private final <%= tennantNameUpperFirst %>Service <%= tennantNameLowerFirst %>Service;

    public <%= tennantNameUpperFirst %>Resource(<%= tennantNameUpperFirst %>Service <%= tennantNameLowerFirst %>Service) {
        this.<%= tennantNameLowerFirst %>Service = <%= tennantNameLowerFirst %>Service;
    }

    /**
     * POST  /<%= tennantNamePluralLowerFirst %> : Create a new <%= tennantNameLowerFirst %>.
     *
     * @param <%= tennantNameLowerFirst %> the <%= tennantNameLowerFirst %> to create
     * @return the ResponseEntity with status 201 (Created) and with body the new <%= tennantNameLowerFirst %>, or with status 400 (Bad Request) if the <%= tennantNameLowerFirst %> has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/<%= tennantNamePluralLowerFirst %>")
    @Timed
    public ResponseEntity<<%= tennantNameUpperFirst %>> create<%= tennantNameUpperFirst %>(@Valid @RequestBody <%= tennantNameUpperFirst %> <%= tennantNameLowerFirst %>) throws URISyntaxException {
        log.debug("REST request to save <%= tennantNameUpperFirst %> : {}", <%= tennantNameLowerFirst %>);
        if (<%= tennantNameLowerFirst %>.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new <%= tennantNameLowerFirst %> cannot already have an ID")).body(null);
        }
<%= tennantNameUpperFirst %> result = <%= tennantNameLowerFirst %>Service.save(<%= tennantNameLowerFirst %>);
        return ResponseEntity.created(new URI("/api/<%= tennantNamePluralLowerFirst %>/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getName()))
            .body(result);
    }

    /**
     * PUT  /<%= tennantNamePluralLowerFirst %> : Updates an existing <%= tennantNameLowerFirst %>.
     *
     * @param <%= tennantNameLowerFirst %> the <%= tennantNameLowerFirst %> to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated <%= tennantNameLowerFirst %>,
     * or with status 400 (Bad Request) if the <%= tennantNameLowerFirst %> is not valid,
     * or with status 500 (Internal Server Error) if the <%= tennantNameLowerFirst %> couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/<%= tennantNamePluralLowerFirst %>")
    @Timed
    public ResponseEntity<<%= tennantNameUpperFirst %>> update<%= tennantNameUpperFirst %>(@Valid @RequestBody <%= tennantNameUpperFirst %> <%= tennantNameLowerFirst %>) throws URISyntaxException {
        log.debug("REST request to update <%= tennantNameUpperFirst %> : {}", <%= tennantNameLowerFirst %>);
        if (<%= tennantNameLowerFirst %>.getId() == null) {
            return create<%= tennantNameUpperFirst %>(<%= tennantNameLowerFirst %>);
        }
        <%= tennantNameUpperFirst %> result = <%= tennantNameLowerFirst %>Service.save(<%= tennantNameLowerFirst %>);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, <%= tennantNameLowerFirst %>.getName()))
            .body(result);
    }

    /**
     * GET  /<%= tennantNamePluralLowerFirst %> : get all the <%= tennantNamePluralLowerFirst %>.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of <%= tennantNamePluralLowerFirst %> in body
     */
    @GetMapping("/<%= tennantNamePluralLowerFirst %>")
    @Timed
    public List<<%= tennantNameUpperFirst %>> getAll<%= tennantNamePluralUpperFirst %>() {
        log.debug("REST request to get all <%= tennantNamePluralUpperFirst %>");
        return <%= tennantNameLowerFirst %>Service.findAll();
    }

    /**
     * GET  /<%= tennantNamePluralLowerFirst %>/:id : get the "id" <%= tennantNameLowerFirst %>.
     *
     * @param id the id of the <%= tennantNameLowerFirst %> to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the <%= tennantNameLowerFirst %>, or with status 404 (Not Found)
     */
    @GetMapping("/<%= tennantNamePluralLowerFirst %>/{id}")
    @Timed
    public ResponseEntity<<%= tennantNameUpperFirst %>> get<%= tennantNameUpperFirst %>(@PathVariable Long id) {
        log.debug("REST request to get <%= tennantNameUpperFirst %> : {}", id);
        <%= tennantNameUpperFirst %> <%= tennantNameLowerFirst %> = <%= tennantNameLowerFirst %>Service.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(<%= tennantNameLowerFirst %>));
    }

    /**
     * DELETE  /<%= tennantNamePluralLowerFirst %>/:id : delete the "id" <%= tennantNameLowerFirst %>.
     *
     * @param id the id of the <%= tennantNameLowerFirst %> to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/<%= tennantNamePluralLowerFirst %>/{id}")
    @Timed
    public ResponseEntity<Void> delete<%= tennantNameUpperFirst %>(@PathVariable Long id) {
        log.debug("REST request to delete <%= tennantNameUpperFirst %> : {}", id);
        String <%= tennantNameLowerFirst %>Name = <%= tennantNameLowerFirst %>Service.findOne(id).getName();
        <%= tennantNameLowerFirst %>Service.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, <%= tennantNameLowerFirst %>Name)).build();
    }

}

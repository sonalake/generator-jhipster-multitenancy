package <%=packageName%>.web.rest;

import com.codahale.metrics.annotation.Timed;
import <%=packageName%>.domain.<%= tenantNameUpperFirst %>;
import <%=packageName%>.service.<%= tenantNameUpperFirst %>Service;
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
 * REST controller for managing <%= tenantNameUpperFirst %>.
 */
@RestController
@RequestMapping("/api")
public class <%= tenantNameUpperFirst %>Resource {

    private final Logger log = LoggerFactory.getLogger(<%= tenantNameUpperFirst %>Resource.class);

    private static final String ENTITY_NAME = "<%= tenantNameLowerFirst %>";

    private final <%= tenantNameUpperFirst %>Service <%= tenantNameLowerFirst %>Service;

    public <%= tenantNameUpperFirst %>Resource(<%= tenantNameUpperFirst %>Service <%= tenantNameLowerFirst %>Service) {
        this.<%= tenantNameLowerFirst %>Service = <%= tenantNameLowerFirst %>Service;
    }

    /**
     * POST  /<%= tenantNamePluralLowerFirst %> : Create a new <%= tenantNameLowerFirst %>.
     *
     * @param <%= tenantNameLowerFirst %> the <%= tenantNameLowerFirst %> to create
     * @return the ResponseEntity with status 201 (Created) and with body the new <%= tenantNameLowerFirst %>, or with status 400 (Bad Request) if the <%= tenantNameLowerFirst %> has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/<%= tenantNamePluralLowerFirst %>")
    @Timed
    public ResponseEntity<<%= tenantNameUpperFirst %>> create<%= tenantNameUpperFirst %>(@Valid @RequestBody <%= tenantNameUpperFirst %> <%= tenantNameLowerFirst %>) throws URISyntaxException {
        log.debug("REST request to save <%= tenantNameUpperFirst %> : {}", <%= tenantNameLowerFirst %>);
        if (<%= tenantNameLowerFirst %>.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new <%= tenantNameLowerFirst %> cannot already have an ID")).body(null);
        }
<%= tenantNameUpperFirst %> result = <%= tenantNameLowerFirst %>Service.save(<%= tenantNameLowerFirst %>);
        return ResponseEntity.created(new URI("/api/<%= tenantNamePluralLowerFirst %>/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getName()))
            .body(result);
    }

    /**
     * PUT  /<%= tenantNamePluralLowerFirst %> : Updates an existing <%= tenantNameLowerFirst %>.
     *
     * @param <%= tenantNameLowerFirst %> the <%= tenantNameLowerFirst %> to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated <%= tenantNameLowerFirst %>,
     * or with status 400 (Bad Request) if the <%= tenantNameLowerFirst %> is not valid,
     * or with status 500 (Internal Server Error) if the <%= tenantNameLowerFirst %> couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/<%= tenantNamePluralLowerFirst %>")
    @Timed
    public ResponseEntity<<%= tenantNameUpperFirst %>> update<%= tenantNameUpperFirst %>(@Valid @RequestBody <%= tenantNameUpperFirst %> <%= tenantNameLowerFirst %>) throws URISyntaxException {
        log.debug("REST request to update <%= tenantNameUpperFirst %> : {}", <%= tenantNameLowerFirst %>);
        if (<%= tenantNameLowerFirst %>.getId() == null) {
            return create<%= tenantNameUpperFirst %>(<%= tenantNameLowerFirst %>);
        }
        <%= tenantNameUpperFirst %> result = <%= tenantNameLowerFirst %>Service.save(<%= tenantNameLowerFirst %>);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, <%= tenantNameLowerFirst %>.getName()))
            .body(result);
    }

    /**
     * GET  /<%= tenantNamePluralLowerFirst %> : get all the <%= tenantNamePluralLowerFirst %>.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of <%= tenantNamePluralLowerFirst %> in body
     */
    @GetMapping("/<%= tenantNamePluralLowerFirst %>")
    @Timed
    public List<<%= tenantNameUpperFirst %>> getAll<%= tenantNamePluralUpperFirst %>() {
        log.debug("REST request to get all <%= tenantNamePluralUpperFirst %>");
        return <%= tenantNameLowerFirst %>Service.findAll();
    }

    /**
     * GET  /<%= tenantNamePluralLowerFirst %>/:id : get the "id" <%= tenantNameLowerFirst %>.
     *
     * @param id the id of the <%= tenantNameLowerFirst %> to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the <%= tenantNameLowerFirst %>, or with status 404 (Not Found)
     */
    @GetMapping("/<%= tenantNamePluralLowerFirst %>/{id}")
    @Timed
    public ResponseEntity<<%= tenantNameUpperFirst %>> get<%= tenantNameUpperFirst %>(@PathVariable Long id) {
        log.debug("REST request to get <%= tenantNameUpperFirst %> : {}", id);
        <%= tenantNameUpperFirst %> <%= tenantNameLowerFirst %> = <%= tenantNameLowerFirst %>Service.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(<%= tenantNameLowerFirst %>));
    }

    /**
     * DELETE  /<%= tenantNamePluralLowerFirst %>/:id : delete the "id" <%= tenantNameLowerFirst %>.
     *
     * @param id the id of the <%= tenantNameLowerFirst %> to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/<%= tenantNamePluralLowerFirst %>/{id}")
    @Timed
    public ResponseEntity<Void> delete<%= tenantNameUpperFirst %>(@PathVariable Long id) {
        log.debug("REST request to delete <%= tenantNameUpperFirst %> : {}", id);
        String <%= tenantNameLowerFirst %>Name = <%= tenantNameLowerFirst %>Service.findOne(id).getName();
        <%= tenantNameLowerFirst %>Service.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, <%= tenantNameLowerFirst %>Name)).build();
    }

}

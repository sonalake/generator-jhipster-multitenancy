package <%=packageName%>.web.rest;

import <%=packageName%>.<%=javaAppName%>;

import <%=packageName%>.domain.<%= tenantNameUpperFirst %>;
import <%=packageName%>.repository.<%= tenantNameUpperFirst %>Repository;
import <%=packageName%>.service.<%= tenantNameUpperFirst %>Service;
import <%=packageName%>.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the <%= tenantNameUpperFirst %>Resource REST controller.
 *
 * @see <%= tenantNameUpperFirst %>Resource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = <%= javaAppName %>.class)
public class <%= tenantNameUpperFirst %>ResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private <%= tenantNameUpperFirst %>Repository <%= tenantNameLowerFirst %>Repository;

    @Autowired
    private <%= tenantNameUpperFirst %>Service <%= tenantNameLowerFirst %>Service;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc rest<%= tenantNameUpperFirst %>MockMvc;

    private <%= tenantNameUpperFirst %> <%= tenantNameLowerFirst %>;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        <%= tenantNameUpperFirst %>Resource <%= tenantNameLowerFirst %>Resource = new <%= tenantNameUpperFirst %>Resource(<%= tenantNameLowerFirst %>Service);
        this.rest<%= tenantNameUpperFirst %>MockMvc = MockMvcBuilders.standaloneSetup(<%= tenantNameLowerFirst %>Resource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static <%= tenantNameUpperFirst %> createEntity(EntityManager em) {
        <%= tenantNameUpperFirst %> <%= tenantNameLowerFirst %> = new <%= tenantNameUpperFirst %>()
            .name(DEFAULT_NAME);
        em.flush();
        return <%= tenantNameLowerFirst %>;
    }

    @Before
    public void initTest() {
        <%= tenantNameLowerFirst %> = createEntity(em);
    }

    @Test
    @Transactional
    public void create<%= tenantNameUpperFirst %>() throws Exception {
        int databaseSizeBeforeCreate = <%= tenantNameLowerFirst %>Repository.findAll().size();

        // Create the <%= tenantNameUpperFirst %>
        rest<%= tenantNameUpperFirst %>MockMvc.perform(post("/api/<%= tenantNamePluralLowerFirst %>")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(<%= tenantNameLowerFirst %>)))
            .andExpect(status().isCreated());

        // Validate the <%= tenantNameUpperFirst %> in the database
        List<<%= tenantNameUpperFirst %>> <%= tenantNameLowerFirst %>List = <%= tenantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tenantNameLowerFirst %>List).hasSize(databaseSizeBeforeCreate + 1);
        <%= tenantNameUpperFirst %> test<%= tenantNameUpperFirst %> = <%= tenantNameLowerFirst %>List.get(<%= tenantNameLowerFirst %>List.size() - 1);
        assertThat(test<%= tenantNameUpperFirst %>.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void create<%= tenantNameUpperFirst %>WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = <%= tenantNameLowerFirst %>Repository.findAll().size();

        // Create the <%= tenantNameUpperFirst %> with an existing ID
        <%= tenantNameLowerFirst %>.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        rest<%= tenantNameUpperFirst %>MockMvc.perform(post("/api/<%= tenantNamePluralLowerFirst %>")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(<%= tenantNameLowerFirst %>)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<<%= tenantNameUpperFirst %>> <%= tenantNameLowerFirst %>List = <%= tenantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tenantNameLowerFirst %>List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = <%= tenantNameLowerFirst %>Repository.findAll().size();
        // set the field null
        <%= tenantNameLowerFirst %>.setName(null);

        // Create the <%= tenantNameUpperFirst %>, which fails.

        rest<%= tenantNameUpperFirst %>MockMvc.perform(post("/api/<%= tenantNamePluralLowerFirst %>")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(<%= tenantNameLowerFirst %>)))
            .andExpect(status().isBadRequest());

        List<<%= tenantNameUpperFirst %>> <%= tenantNameLowerFirst %>List = <%= tenantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tenantNameLowerFirst %>List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAll<%= tenantNamePluralUpperFirst %>() throws Exception {
        // Initialize the database
        <%= tenantNameLowerFirst %>Repository.saveAndFlush(<%= tenantNameLowerFirst %>);

        // Get all the <%= tenantNameLowerFirst %>List
        rest<%= tenantNameUpperFirst %>MockMvc.perform(get("/api/<%= tenantNamePluralLowerFirst %>?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(<%= tenantNameLowerFirst %>.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void get<%= tenantNameUpperFirst %>() throws Exception {
        // Initialize the database
        <%= tenantNameLowerFirst %>Repository.saveAndFlush(<%= tenantNameLowerFirst %>);

        // Get the <%= tenantNameLowerFirst %>
        rest<%= tenantNameUpperFirst %>MockMvc.perform(get("/api/<%= tenantNamePluralLowerFirst %>/{id}", <%= tenantNameLowerFirst %>.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(<%= tenantNameLowerFirst %>.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExisting<%= tenantNameUpperFirst %>() throws Exception {
        // Get the <%= tenantNameLowerFirst %>
        rest<%= tenantNameUpperFirst %>MockMvc.perform(get("/api/<%= tenantNamePluralLowerFirst %>/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void update<%= tenantNameUpperFirst %>() throws Exception {
        // Initialize the database
        <%= tenantNameLowerFirst %>Service.save(<%= tenantNameLowerFirst %>);

        int databaseSizeBeforeUpdate = <%= tenantNameLowerFirst %>Repository.findAll().size();

        // Update the <%= tenantNameLowerFirst %>
        <%= tenantNameUpperFirst %> updated<%= tenantNameUpperFirst %> = <%= tenantNameLowerFirst %>Repository.findOne(<%= tenantNameLowerFirst %>.getId());
        updated<%= tenantNameUpperFirst %>
            .name(UPDATED_NAME);

        rest<%= tenantNameUpperFirst %>MockMvc.perform(put("/api/<%= tenantNamePluralLowerFirst %>")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updated<%= tenantNameUpperFirst %>)))
            .andExpect(status().isOk());

        // Validate the <%= tenantNameUpperFirst %> in the database
        List<<%= tenantNameUpperFirst %>> <%= tenantNameLowerFirst %>List = <%= tenantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tenantNameLowerFirst %>List).hasSize(databaseSizeBeforeUpdate);
        <%= tenantNameUpperFirst %> test<%= tenantNameUpperFirst %> = <%= tenantNameLowerFirst %>List.get(<%= tenantNameLowerFirst %>List.size() - 1);
        assertThat(test<%= tenantNameUpperFirst %>.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExisting<%= tenantNameUpperFirst %>() throws Exception {
        int databaseSizeBeforeUpdate = <%= tenantNameLowerFirst %>Repository.findAll().size();

        // Create the <%= tenantNameUpperFirst %>

        // If the entity doesn't have an ID, it will be created instead of just being updated
        rest<%= tenantNameUpperFirst %>MockMvc.perform(put("/api/<%= tenantNamePluralLowerFirst %>")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(<%= tenantNameLowerFirst %>)))
            .andExpect(status().isCreated());

        // Validate the <%= tenantNameUpperFirst %> in the database
        List<<%= tenantNameUpperFirst %>> <%= tenantNameLowerFirst %>List = <%= tenantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tenantNameLowerFirst %>List).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void delete<%= tenantNameUpperFirst %>() throws Exception {
        // Initialize the database
        <%= tenantNameLowerFirst %>Service.save(<%= tenantNameLowerFirst %>);

        int databaseSizeBeforeDelete = <%= tenantNameLowerFirst %>Repository.findAll().size();

        // Get the <%= tenantNameLowerFirst %>
        rest<%= tenantNameUpperFirst %>MockMvc.perform(delete("/api/<%= tenantNamePluralLowerFirst %>/{id}", <%= tenantNameLowerFirst %>.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<<%= tenantNameUpperFirst %>> <%= tenantNameLowerFirst %>List = <%= tenantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tenantNameLowerFirst %>List).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(<%= tenantNameUpperFirst %>.class);
    }
}

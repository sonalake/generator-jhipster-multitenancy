package <%=packageName%>.web.rest;

import <%=packageName%>.<%=javaAppName%>;

import <%=packageName%>.domain.<%= tennantNameUpperFirst %>;
import <%=packageName%>.repository.<%= tennantNameUpperFirst %>Repository;
import <%=packageName%>.service.<%= tennantNameUpperFirst %>Service;
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
 * Test class for the <%= tennantNameUpperFirst %>Resource REST controller.
 *
 * @see <%= tennantNameUpperFirst %>Resource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = <%= javaAppName %>.class)
public class <%= tennantNameUpperFirst %>ResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private <%= tennantNameUpperFirst %>Repository <%= tennantNameLowerFirst %>Repository;

    @Autowired
    private <%= tennantNameUpperFirst %>Service <%= tennantNameLowerFirst %>Service;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc rest<%= tennantNameUpperFirst %>MockMvc;

    private <%= tennantNameUpperFirst %> <%= tennantNameLowerFirst %>;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        <%= tennantNameUpperFirst %>Resource <%= tennantNameLowerFirst %>Resource = new <%= tennantNameUpperFirst %>Resource(<%= tennantNameLowerFirst %>Service);
        this.rest<%= tennantNameUpperFirst %>MockMvc = MockMvcBuilders.standaloneSetup(<%= tennantNameLowerFirst %>Resource)
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
    public static <%= tennantNameUpperFirst %> createEntity(EntityManager em) {
        <%= tennantNameUpperFirst %> <%= tennantNameLowerFirst %> = new <%= tennantNameUpperFirst %>()
            .name(DEFAULT_NAME);
        em.flush();
        return <%= tennantNameLowerFirst %>;
    }

    @Before
    public void initTest() {
        <%= tennantNameLowerFirst %> = createEntity(em);
    }

    @Test
    @Transactional
    public void create<%= tennantNameUpperFirst %>() throws Exception {
        int databaseSizeBeforeCreate = <%= tennantNameLowerFirst %>Repository.findAll().size();

        // Create the <%= tennantNameUpperFirst %>
        rest<%= tennantNameUpperFirst %>MockMvc.perform(post("/api/<%= tennantNamePluralLowerFirst %>")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(<%= tennantNameLowerFirst %>)))
            .andExpect(status().isCreated());

        // Validate the <%= tennantNameUpperFirst %> in the database
        List<<%= tennantNameUpperFirst %>> <%= tennantNameLowerFirst %>List = <%= tennantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tennantNameLowerFirst %>List).hasSize(databaseSizeBeforeCreate + 1);
        <%= tennantNameUpperFirst %> test<%= tennantNameUpperFirst %> = <%= tennantNameLowerFirst %>List.get(<%= tennantNameLowerFirst %>List.size() - 1);
        assertThat(test<%= tennantNameUpperFirst %>.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void create<%= tennantNameUpperFirst %>WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = <%= tennantNameLowerFirst %>Repository.findAll().size();

        // Create the <%= tennantNameUpperFirst %> with an existing ID
        <%= tennantNameLowerFirst %>.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        rest<%= tennantNameUpperFirst %>MockMvc.perform(post("/api/<%= tennantNamePluralLowerFirst %>")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(<%= tennantNameLowerFirst %>)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<<%= tennantNameUpperFirst %>> <%= tennantNameLowerFirst %>List = <%= tennantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tennantNameLowerFirst %>List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = <%= tennantNameLowerFirst %>Repository.findAll().size();
        // set the field null
        <%= tennantNameLowerFirst %>.setName(null);

        // Create the <%= tennantNameUpperFirst %>, which fails.

        rest<%= tennantNameUpperFirst %>MockMvc.perform(post("/api/<%= tennantNamePluralLowerFirst %>")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(<%= tennantNameLowerFirst %>)))
            .andExpect(status().isBadRequest());

        List<<%= tennantNameUpperFirst %>> <%= tennantNameLowerFirst %>List = <%= tennantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tennantNameLowerFirst %>List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAll<%= tennantNamePluralUpperFirst %>() throws Exception {
        // Initialize the database
        <%= tennantNameLowerFirst %>Repository.saveAndFlush(<%= tennantNameLowerFirst %>);

        // Get all the <%= tennantNameLowerFirst %>List
        rest<%= tennantNameUpperFirst %>MockMvc.perform(get("/api/<%= tennantNamePluralLowerFirst %>?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(<%= tennantNameLowerFirst %>.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void get<%= tennantNameUpperFirst %>() throws Exception {
        // Initialize the database
        <%= tennantNameLowerFirst %>Repository.saveAndFlush(<%= tennantNameLowerFirst %>);

        // Get the <%= tennantNameLowerFirst %>
        rest<%= tennantNameUpperFirst %>MockMvc.perform(get("/api/<%= tennantNamePluralLowerFirst %>/{id}", <%= tennantNameLowerFirst %>.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(<%= tennantNameLowerFirst %>.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExisting<%= tennantNameUpperFirst %>() throws Exception {
        // Get the <%= tennantNameLowerFirst %>
        rest<%= tennantNameUpperFirst %>MockMvc.perform(get("/api/<%= tennantNamePluralLowerFirst %>/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void update<%= tennantNameUpperFirst %>() throws Exception {
        // Initialize the database
        <%= tennantNameLowerFirst %>Service.save(<%= tennantNameLowerFirst %>);

        int databaseSizeBeforeUpdate = <%= tennantNameLowerFirst %>Repository.findAll().size();

        // Update the <%= tennantNameLowerFirst %>
        <%= tennantNameUpperFirst %> updated<%= tennantNameUpperFirst %> = <%= tennantNameLowerFirst %>Repository.findOne(<%= tennantNameLowerFirst %>.getId());
        updated<%= tennantNameUpperFirst %>
            .name(UPDATED_NAME);

        rest<%= tennantNameUpperFirst %>MockMvc.perform(put("/api/<%= tennantNamePluralLowerFirst %>")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updated<%= tennantNameUpperFirst %>)))
            .andExpect(status().isOk());

        // Validate the <%= tennantNameUpperFirst %> in the database
        List<<%= tennantNameUpperFirst %>> <%= tennantNameLowerFirst %>List = <%= tennantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tennantNameLowerFirst %>List).hasSize(databaseSizeBeforeUpdate);
        <%= tennantNameUpperFirst %> test<%= tennantNameUpperFirst %> = <%= tennantNameLowerFirst %>List.get(<%= tennantNameLowerFirst %>List.size() - 1);
        assertThat(test<%= tennantNameUpperFirst %>.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExisting<%= tennantNameUpperFirst %>() throws Exception {
        int databaseSizeBeforeUpdate = <%= tennantNameLowerFirst %>Repository.findAll().size();

        // Create the <%= tennantNameUpperFirst %>

        // If the entity doesn't have an ID, it will be created instead of just being updated
        rest<%= tennantNameUpperFirst %>MockMvc.perform(put("/api/<%= tennantNamePluralLowerFirst %>")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(<%= tennantNameLowerFirst %>)))
            .andExpect(status().isCreated());

        // Validate the <%= tennantNameUpperFirst %> in the database
        List<<%= tennantNameUpperFirst %>> <%= tennantNameLowerFirst %>List = <%= tennantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tennantNameLowerFirst %>List).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void delete<%= tennantNameUpperFirst %>() throws Exception {
        // Initialize the database
        <%= tennantNameLowerFirst %>Service.save(<%= tennantNameLowerFirst %>);

        int databaseSizeBeforeDelete = <%= tennantNameLowerFirst %>Repository.findAll().size();

        // Get the <%= tennantNameLowerFirst %>
        rest<%= tennantNameUpperFirst %>MockMvc.perform(delete("/api/<%= tennantNamePluralLowerFirst %>/{id}", <%= tennantNameLowerFirst %>.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<<%= tennantNameUpperFirst %>> <%= tennantNameLowerFirst %>List = <%= tennantNameLowerFirst %>Repository.findAll();
        assertThat(<%= tennantNameLowerFirst %>List).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(<%= tennantNameUpperFirst %>.class);
    }
}

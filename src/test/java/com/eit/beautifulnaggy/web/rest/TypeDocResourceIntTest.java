package com.eit.beautifulnaggy.web.rest;

import com.eit.beautifulnaggy.BeautifulNaggyApp;

import com.eit.beautifulnaggy.domain.TypeDoc;
import com.eit.beautifulnaggy.repository.TypeDocRepository;
import com.eit.beautifulnaggy.web.rest.errors.ExceptionTranslator;

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
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.eit.beautifulnaggy.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TypeDocResource REST controller.
 *
 * @see TypeDocResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BeautifulNaggyApp.class)
public class TypeDocResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TypeDocRepository typeDocRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTypeDocMockMvc;

    private TypeDoc typeDoc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TypeDocResource typeDocResource = new TypeDocResource(typeDocRepository);
        this.restTypeDocMockMvc = MockMvcBuilders.standaloneSetup(typeDocResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeDoc createEntity(EntityManager em) {
        TypeDoc typeDoc = new TypeDoc()
            .description(DEFAULT_DESCRIPTION);
        return typeDoc;
    }

    @Before
    public void initTest() {
        typeDoc = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeDoc() throws Exception {
        int databaseSizeBeforeCreate = typeDocRepository.findAll().size();

        // Create the TypeDoc
        restTypeDocMockMvc.perform(post("/api/type-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDoc)))
            .andExpect(status().isCreated());

        // Validate the TypeDoc in the database
        List<TypeDoc> typeDocList = typeDocRepository.findAll();
        assertThat(typeDocList).hasSize(databaseSizeBeforeCreate + 1);
        TypeDoc testTypeDoc = typeDocList.get(typeDocList.size() - 1);
        assertThat(testTypeDoc.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTypeDocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeDocRepository.findAll().size();

        // Create the TypeDoc with an existing ID
        typeDoc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeDocMockMvc.perform(post("/api/type-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDoc)))
            .andExpect(status().isBadRequest());

        // Validate the TypeDoc in the database
        List<TypeDoc> typeDocList = typeDocRepository.findAll();
        assertThat(typeDocList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeDocRepository.findAll().size();
        // set the field null
        typeDoc.setDescription(null);

        // Create the TypeDoc, which fails.

        restTypeDocMockMvc.perform(post("/api/type-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDoc)))
            .andExpect(status().isBadRequest());

        List<TypeDoc> typeDocList = typeDocRepository.findAll();
        assertThat(typeDocList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTypeDocs() throws Exception {
        // Initialize the database
        typeDocRepository.saveAndFlush(typeDoc);

        // Get all the typeDocList
        restTypeDocMockMvc.perform(get("/api/type-docs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeDoc.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getTypeDoc() throws Exception {
        // Initialize the database
        typeDocRepository.saveAndFlush(typeDoc);

        // Get the typeDoc
        restTypeDocMockMvc.perform(get("/api/type-docs/{id}", typeDoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typeDoc.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTypeDoc() throws Exception {
        // Get the typeDoc
        restTypeDocMockMvc.perform(get("/api/type-docs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeDoc() throws Exception {
        // Initialize the database
        typeDocRepository.saveAndFlush(typeDoc);

        int databaseSizeBeforeUpdate = typeDocRepository.findAll().size();

        // Update the typeDoc
        TypeDoc updatedTypeDoc = typeDocRepository.findById(typeDoc.getId()).get();
        // Disconnect from session so that the updates on updatedTypeDoc are not directly saved in db
        em.detach(updatedTypeDoc);
        updatedTypeDoc
            .description(UPDATED_DESCRIPTION);

        restTypeDocMockMvc.perform(put("/api/type-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeDoc)))
            .andExpect(status().isOk());

        // Validate the TypeDoc in the database
        List<TypeDoc> typeDocList = typeDocRepository.findAll();
        assertThat(typeDocList).hasSize(databaseSizeBeforeUpdate);
        TypeDoc testTypeDoc = typeDocList.get(typeDocList.size() - 1);
        assertThat(testTypeDoc.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeDoc() throws Exception {
        int databaseSizeBeforeUpdate = typeDocRepository.findAll().size();

        // Create the TypeDoc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeDocMockMvc.perform(put("/api/type-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDoc)))
            .andExpect(status().isBadRequest());

        // Validate the TypeDoc in the database
        List<TypeDoc> typeDocList = typeDocRepository.findAll();
        assertThat(typeDocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTypeDoc() throws Exception {
        // Initialize the database
        typeDocRepository.saveAndFlush(typeDoc);

        int databaseSizeBeforeDelete = typeDocRepository.findAll().size();

        // Delete the typeDoc
        restTypeDocMockMvc.perform(delete("/api/type-docs/{id}", typeDoc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TypeDoc> typeDocList = typeDocRepository.findAll();
        assertThat(typeDocList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeDoc.class);
        TypeDoc typeDoc1 = new TypeDoc();
        typeDoc1.setId(1L);
        TypeDoc typeDoc2 = new TypeDoc();
        typeDoc2.setId(typeDoc1.getId());
        assertThat(typeDoc1).isEqualTo(typeDoc2);
        typeDoc2.setId(2L);
        assertThat(typeDoc1).isNotEqualTo(typeDoc2);
        typeDoc1.setId(null);
        assertThat(typeDoc1).isNotEqualTo(typeDoc2);
    }
}

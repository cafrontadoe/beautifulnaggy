package com.eit.beautifulnaggy.web.rest;

import com.eit.beautifulnaggy.BeautifulNaggyApp;

import com.eit.beautifulnaggy.domain.UserClient;
import com.eit.beautifulnaggy.repository.UserClientRepository;
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
 * Test class for the UserClientResource REST controller.
 *
 * @see UserClientResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BeautifulNaggyApp.class)
public class UserClientResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_CELPHONE = "AAAAAAAAAA";
    private static final String UPDATED_CELPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private UserClientRepository userClientRepository;

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

    private MockMvc restUserClientMockMvc;

    private UserClient userClient;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserClientResource userClientResource = new UserClientResource(userClientRepository);
        this.restUserClientMockMvc = MockMvcBuilders.standaloneSetup(userClientResource)
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
    public static UserClient createEntity(EntityManager em) {
        UserClient userClient = new UserClient()
            .name(DEFAULT_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .documentNumber(DEFAULT_DOCUMENT_NUMBER)
            .celphone(DEFAULT_CELPHONE)
            .address(DEFAULT_ADDRESS);
        return userClient;
    }

    @Before
    public void initTest() {
        userClient = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserClient() throws Exception {
        int databaseSizeBeforeCreate = userClientRepository.findAll().size();

        // Create the UserClient
        restUserClientMockMvc.perform(post("/api/user-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userClient)))
            .andExpect(status().isCreated());

        // Validate the UserClient in the database
        List<UserClient> userClientList = userClientRepository.findAll();
        assertThat(userClientList).hasSize(databaseSizeBeforeCreate + 1);
        UserClient testUserClient = userClientList.get(userClientList.size() - 1);
        assertThat(testUserClient.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserClient.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testUserClient.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testUserClient.getDocumentNumber()).isEqualTo(DEFAULT_DOCUMENT_NUMBER);
        assertThat(testUserClient.getCelphone()).isEqualTo(DEFAULT_CELPHONE);
        assertThat(testUserClient.getAddress()).isEqualTo(DEFAULT_ADDRESS);
    }

    @Test
    @Transactional
    public void createUserClientWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userClientRepository.findAll().size();

        // Create the UserClient with an existing ID
        userClient.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserClientMockMvc.perform(post("/api/user-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userClient)))
            .andExpect(status().isBadRequest());

        // Validate the UserClient in the database
        List<UserClient> userClientList = userClientRepository.findAll();
        assertThat(userClientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = userClientRepository.findAll().size();
        // set the field null
        userClient.setName(null);

        // Create the UserClient, which fails.

        restUserClientMockMvc.perform(post("/api/user-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userClient)))
            .andExpect(status().isBadRequest());

        List<UserClient> userClientList = userClientRepository.findAll();
        assertThat(userClientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = userClientRepository.findAll().size();
        // set the field null
        userClient.setEmail(null);

        // Create the UserClient, which fails.

        restUserClientMockMvc.perform(post("/api/user-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userClient)))
            .andExpect(status().isBadRequest());

        List<UserClient> userClientList = userClientRepository.findAll();
        assertThat(userClientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCelphoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = userClientRepository.findAll().size();
        // set the field null
        userClient.setCelphone(null);

        // Create the UserClient, which fails.

        restUserClientMockMvc.perform(post("/api/user-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userClient)))
            .andExpect(status().isBadRequest());

        List<UserClient> userClientList = userClientRepository.findAll();
        assertThat(userClientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = userClientRepository.findAll().size();
        // set the field null
        userClient.setAddress(null);

        // Create the UserClient, which fails.

        restUserClientMockMvc.perform(post("/api/user-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userClient)))
            .andExpect(status().isBadRequest());

        List<UserClient> userClientList = userClientRepository.findAll();
        assertThat(userClientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserClients() throws Exception {
        // Initialize the database
        userClientRepository.saveAndFlush(userClient);

        // Get all the userClientList
        restUserClientMockMvc.perform(get("/api/user-clients?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userClient.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].documentNumber").value(hasItem(DEFAULT_DOCUMENT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].celphone").value(hasItem(DEFAULT_CELPHONE.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())));
    }
    
    @Test
    @Transactional
    public void getUserClient() throws Exception {
        // Initialize the database
        userClientRepository.saveAndFlush(userClient);

        // Get the userClient
        restUserClientMockMvc.perform(get("/api/user-clients/{id}", userClient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userClient.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.documentNumber").value(DEFAULT_DOCUMENT_NUMBER.toString()))
            .andExpect(jsonPath("$.celphone").value(DEFAULT_CELPHONE.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserClient() throws Exception {
        // Get the userClient
        restUserClientMockMvc.perform(get("/api/user-clients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserClient() throws Exception {
        // Initialize the database
        userClientRepository.saveAndFlush(userClient);

        int databaseSizeBeforeUpdate = userClientRepository.findAll().size();

        // Update the userClient
        UserClient updatedUserClient = userClientRepository.findById(userClient.getId()).get();
        // Disconnect from session so that the updates on updatedUserClient are not directly saved in db
        em.detach(updatedUserClient);
        updatedUserClient
            .name(UPDATED_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .documentNumber(UPDATED_DOCUMENT_NUMBER)
            .celphone(UPDATED_CELPHONE)
            .address(UPDATED_ADDRESS);

        restUserClientMockMvc.perform(put("/api/user-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserClient)))
            .andExpect(status().isOk());

        // Validate the UserClient in the database
        List<UserClient> userClientList = userClientRepository.findAll();
        assertThat(userClientList).hasSize(databaseSizeBeforeUpdate);
        UserClient testUserClient = userClientList.get(userClientList.size() - 1);
        assertThat(testUserClient.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserClient.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testUserClient.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUserClient.getDocumentNumber()).isEqualTo(UPDATED_DOCUMENT_NUMBER);
        assertThat(testUserClient.getCelphone()).isEqualTo(UPDATED_CELPHONE);
        assertThat(testUserClient.getAddress()).isEqualTo(UPDATED_ADDRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingUserClient() throws Exception {
        int databaseSizeBeforeUpdate = userClientRepository.findAll().size();

        // Create the UserClient

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserClientMockMvc.perform(put("/api/user-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userClient)))
            .andExpect(status().isBadRequest());

        // Validate the UserClient in the database
        List<UserClient> userClientList = userClientRepository.findAll();
        assertThat(userClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserClient() throws Exception {
        // Initialize the database
        userClientRepository.saveAndFlush(userClient);

        int databaseSizeBeforeDelete = userClientRepository.findAll().size();

        // Delete the userClient
        restUserClientMockMvc.perform(delete("/api/user-clients/{id}", userClient.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserClient> userClientList = userClientRepository.findAll();
        assertThat(userClientList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserClient.class);
        UserClient userClient1 = new UserClient();
        userClient1.setId(1L);
        UserClient userClient2 = new UserClient();
        userClient2.setId(userClient1.getId());
        assertThat(userClient1).isEqualTo(userClient2);
        userClient2.setId(2L);
        assertThat(userClient1).isNotEqualTo(userClient2);
        userClient1.setId(null);
        assertThat(userClient1).isNotEqualTo(userClient2);
    }
}

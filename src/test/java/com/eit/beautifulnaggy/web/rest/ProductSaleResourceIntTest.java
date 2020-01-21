package com.eit.beautifulnaggy.web.rest;

import com.eit.beautifulnaggy.BeautifulNaggyApp;

import com.eit.beautifulnaggy.domain.ProductSale;
import com.eit.beautifulnaggy.repository.ProductSaleRepository;
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
 * Test class for the ProductSaleResource REST controller.
 *
 * @see ProductSaleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BeautifulNaggyApp.class)
public class ProductSaleResourceIntTest {

    private static final Integer DEFAULT_COUNT_PRODUCT = 1;
    private static final Integer UPDATED_COUNT_PRODUCT = 2;

    private static final Double DEFAULT_TOTAL_PRODUCT = 1D;
    private static final Double UPDATED_TOTAL_PRODUCT = 2D;

    @Autowired
    private ProductSaleRepository productSaleRepository;

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

    private MockMvc restProductSaleMockMvc;

    private ProductSale productSale;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductSaleResource productSaleResource = new ProductSaleResource(productSaleRepository);
        this.restProductSaleMockMvc = MockMvcBuilders.standaloneSetup(productSaleResource)
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
    public static ProductSale createEntity(EntityManager em) {
        ProductSale productSale = new ProductSale()
            .countProduct(DEFAULT_COUNT_PRODUCT)
            .totalProduct(DEFAULT_TOTAL_PRODUCT);
        return productSale;
    }

    @Before
    public void initTest() {
        productSale = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductSale() throws Exception {
        int databaseSizeBeforeCreate = productSaleRepository.findAll().size();

        // Create the ProductSale
        restProductSaleMockMvc.perform(post("/api/product-sales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSale)))
            .andExpect(status().isCreated());

        // Validate the ProductSale in the database
        List<ProductSale> productSaleList = productSaleRepository.findAll();
        assertThat(productSaleList).hasSize(databaseSizeBeforeCreate + 1);
        ProductSale testProductSale = productSaleList.get(productSaleList.size() - 1);
        assertThat(testProductSale.getCountProduct()).isEqualTo(DEFAULT_COUNT_PRODUCT);
        assertThat(testProductSale.getTotalProduct()).isEqualTo(DEFAULT_TOTAL_PRODUCT);
    }

    @Test
    @Transactional
    public void createProductSaleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productSaleRepository.findAll().size();

        // Create the ProductSale with an existing ID
        productSale.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductSaleMockMvc.perform(post("/api/product-sales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSale)))
            .andExpect(status().isBadRequest());

        // Validate the ProductSale in the database
        List<ProductSale> productSaleList = productSaleRepository.findAll();
        assertThat(productSaleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCountProductIsRequired() throws Exception {
        int databaseSizeBeforeTest = productSaleRepository.findAll().size();
        // set the field null
        productSale.setCountProduct(null);

        // Create the ProductSale, which fails.

        restProductSaleMockMvc.perform(post("/api/product-sales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSale)))
            .andExpect(status().isBadRequest());

        List<ProductSale> productSaleList = productSaleRepository.findAll();
        assertThat(productSaleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalProductIsRequired() throws Exception {
        int databaseSizeBeforeTest = productSaleRepository.findAll().size();
        // set the field null
        productSale.setTotalProduct(null);

        // Create the ProductSale, which fails.

        restProductSaleMockMvc.perform(post("/api/product-sales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSale)))
            .andExpect(status().isBadRequest());

        List<ProductSale> productSaleList = productSaleRepository.findAll();
        assertThat(productSaleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductSales() throws Exception {
        // Initialize the database
        productSaleRepository.saveAndFlush(productSale);

        // Get all the productSaleList
        restProductSaleMockMvc.perform(get("/api/product-sales?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productSale.getId().intValue())))
            .andExpect(jsonPath("$.[*].countProduct").value(hasItem(DEFAULT_COUNT_PRODUCT)))
            .andExpect(jsonPath("$.[*].totalProduct").value(hasItem(DEFAULT_TOTAL_PRODUCT.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getProductSale() throws Exception {
        // Initialize the database
        productSaleRepository.saveAndFlush(productSale);

        // Get the productSale
        restProductSaleMockMvc.perform(get("/api/product-sales/{id}", productSale.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productSale.getId().intValue()))
            .andExpect(jsonPath("$.countProduct").value(DEFAULT_COUNT_PRODUCT))
            .andExpect(jsonPath("$.totalProduct").value(DEFAULT_TOTAL_PRODUCT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProductSale() throws Exception {
        // Get the productSale
        restProductSaleMockMvc.perform(get("/api/product-sales/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductSale() throws Exception {
        // Initialize the database
        productSaleRepository.saveAndFlush(productSale);

        int databaseSizeBeforeUpdate = productSaleRepository.findAll().size();

        // Update the productSale
        ProductSale updatedProductSale = productSaleRepository.findById(productSale.getId()).get();
        // Disconnect from session so that the updates on updatedProductSale are not directly saved in db
        em.detach(updatedProductSale);
        updatedProductSale
            .countProduct(UPDATED_COUNT_PRODUCT)
            .totalProduct(UPDATED_TOTAL_PRODUCT);

        restProductSaleMockMvc.perform(put("/api/product-sales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductSale)))
            .andExpect(status().isOk());

        // Validate the ProductSale in the database
        List<ProductSale> productSaleList = productSaleRepository.findAll();
        assertThat(productSaleList).hasSize(databaseSizeBeforeUpdate);
        ProductSale testProductSale = productSaleList.get(productSaleList.size() - 1);
        assertThat(testProductSale.getCountProduct()).isEqualTo(UPDATED_COUNT_PRODUCT);
        assertThat(testProductSale.getTotalProduct()).isEqualTo(UPDATED_TOTAL_PRODUCT);
    }

    @Test
    @Transactional
    public void updateNonExistingProductSale() throws Exception {
        int databaseSizeBeforeUpdate = productSaleRepository.findAll().size();

        // Create the ProductSale

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductSaleMockMvc.perform(put("/api/product-sales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSale)))
            .andExpect(status().isBadRequest());

        // Validate the ProductSale in the database
        List<ProductSale> productSaleList = productSaleRepository.findAll();
        assertThat(productSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductSale() throws Exception {
        // Initialize the database
        productSaleRepository.saveAndFlush(productSale);

        int databaseSizeBeforeDelete = productSaleRepository.findAll().size();

        // Delete the productSale
        restProductSaleMockMvc.perform(delete("/api/product-sales/{id}", productSale.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductSale> productSaleList = productSaleRepository.findAll();
        assertThat(productSaleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductSale.class);
        ProductSale productSale1 = new ProductSale();
        productSale1.setId(1L);
        ProductSale productSale2 = new ProductSale();
        productSale2.setId(productSale1.getId());
        assertThat(productSale1).isEqualTo(productSale2);
        productSale2.setId(2L);
        assertThat(productSale1).isNotEqualTo(productSale2);
        productSale1.setId(null);
        assertThat(productSale1).isNotEqualTo(productSale2);
    }
}

package com.eit.beautifulnaggy.web.rest;

import com.eit.beautifulnaggy.BeautifulNaggyApp;

import com.eit.beautifulnaggy.domain.ProductCarousel;
import com.eit.beautifulnaggy.repository.ProductCarouselRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.eit.beautifulnaggy.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProductCarouselResource REST controller.
 *
 * @see ProductCarouselResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BeautifulNaggyApp.class)
public class ProductCarouselResourceIntTest {

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private ProductCarouselRepository productCarouselRepository;

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

    private MockMvc restProductCarouselMockMvc;

    private ProductCarousel productCarousel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductCarouselResource productCarouselResource = new ProductCarouselResource(productCarouselRepository);
        this.restProductCarouselMockMvc = MockMvcBuilders.standaloneSetup(productCarouselResource)
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
    public static ProductCarousel createEntity(EntityManager em) {
        ProductCarousel productCarousel = new ProductCarousel()
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        return productCarousel;
    }

    @Before
    public void initTest() {
        productCarousel = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductCarousel() throws Exception {
        int databaseSizeBeforeCreate = productCarouselRepository.findAll().size();

        // Create the ProductCarousel
        restProductCarouselMockMvc.perform(post("/api/product-carousels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCarousel)))
            .andExpect(status().isCreated());

        // Validate the ProductCarousel in the database
        List<ProductCarousel> productCarouselList = productCarouselRepository.findAll();
        assertThat(productCarouselList).hasSize(databaseSizeBeforeCreate + 1);
        ProductCarousel testProductCarousel = productCarouselList.get(productCarouselList.size() - 1);
        assertThat(testProductCarousel.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testProductCarousel.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createProductCarouselWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productCarouselRepository.findAll().size();

        // Create the ProductCarousel with an existing ID
        productCarousel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductCarouselMockMvc.perform(post("/api/product-carousels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCarousel)))
            .andExpect(status().isBadRequest());

        // Validate the ProductCarousel in the database
        List<ProductCarousel> productCarouselList = productCarouselRepository.findAll();
        assertThat(productCarouselList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProductCarousels() throws Exception {
        // Initialize the database
        productCarouselRepository.saveAndFlush(productCarousel);

        // Get all the productCarouselList
        restProductCarouselMockMvc.perform(get("/api/product-carousels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productCarousel.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }
    
    @Test
    @Transactional
    public void getProductCarousel() throws Exception {
        // Initialize the database
        productCarouselRepository.saveAndFlush(productCarousel);

        // Get the productCarousel
        restProductCarouselMockMvc.perform(get("/api/product-carousels/{id}", productCarousel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productCarousel.getId().intValue()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
    }

    @Test
    @Transactional
    public void getNonExistingProductCarousel() throws Exception {
        // Get the productCarousel
        restProductCarouselMockMvc.perform(get("/api/product-carousels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductCarousel() throws Exception {
        // Initialize the database
        productCarouselRepository.saveAndFlush(productCarousel);

        int databaseSizeBeforeUpdate = productCarouselRepository.findAll().size();

        // Update the productCarousel
        ProductCarousel updatedProductCarousel = productCarouselRepository.findById(productCarousel.getId()).get();
        // Disconnect from session so that the updates on updatedProductCarousel are not directly saved in db
        em.detach(updatedProductCarousel);
        updatedProductCarousel
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);

        restProductCarouselMockMvc.perform(put("/api/product-carousels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductCarousel)))
            .andExpect(status().isOk());

        // Validate the ProductCarousel in the database
        List<ProductCarousel> productCarouselList = productCarouselRepository.findAll();
        assertThat(productCarouselList).hasSize(databaseSizeBeforeUpdate);
        ProductCarousel testProductCarousel = productCarouselList.get(productCarouselList.size() - 1);
        assertThat(testProductCarousel.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testProductCarousel.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingProductCarousel() throws Exception {
        int databaseSizeBeforeUpdate = productCarouselRepository.findAll().size();

        // Create the ProductCarousel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductCarouselMockMvc.perform(put("/api/product-carousels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCarousel)))
            .andExpect(status().isBadRequest());

        // Validate the ProductCarousel in the database
        List<ProductCarousel> productCarouselList = productCarouselRepository.findAll();
        assertThat(productCarouselList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductCarousel() throws Exception {
        // Initialize the database
        productCarouselRepository.saveAndFlush(productCarousel);

        int databaseSizeBeforeDelete = productCarouselRepository.findAll().size();

        // Delete the productCarousel
        restProductCarouselMockMvc.perform(delete("/api/product-carousels/{id}", productCarousel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductCarousel> productCarouselList = productCarouselRepository.findAll();
        assertThat(productCarouselList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductCarousel.class);
        ProductCarousel productCarousel1 = new ProductCarousel();
        productCarousel1.setId(1L);
        ProductCarousel productCarousel2 = new ProductCarousel();
        productCarousel2.setId(productCarousel1.getId());
        assertThat(productCarousel1).isEqualTo(productCarousel2);
        productCarousel2.setId(2L);
        assertThat(productCarousel1).isNotEqualTo(productCarousel2);
        productCarousel1.setId(null);
        assertThat(productCarousel1).isNotEqualTo(productCarousel2);
    }
}

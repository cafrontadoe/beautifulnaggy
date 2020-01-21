package com.eit.beautifulnaggy.web.rest;
import com.eit.beautifulnaggy.domain.ProductCarousel;
import com.eit.beautifulnaggy.repository.ProductCarouselRepository;
import com.eit.beautifulnaggy.web.rest.errors.BadRequestAlertException;
import com.eit.beautifulnaggy.web.rest.util.HeaderUtil;
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
 * REST controller for managing ProductCarousel.
 */
@RestController
@RequestMapping("/api")
public class ProductCarouselResource {

    private final Logger log = LoggerFactory.getLogger(ProductCarouselResource.class);

    private static final String ENTITY_NAME = "productCarousel";

    private final ProductCarouselRepository productCarouselRepository;

    public ProductCarouselResource(ProductCarouselRepository productCarouselRepository) {
        this.productCarouselRepository = productCarouselRepository;
    }

    /**
     * POST  /product-carousels : Create a new productCarousel.
     *
     * @param productCarousel the productCarousel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productCarousel, or with status 400 (Bad Request) if the productCarousel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-carousels")
    public ResponseEntity<ProductCarousel> createProductCarousel(@Valid @RequestBody ProductCarousel productCarousel) throws URISyntaxException {
        log.debug("REST request to save ProductCarousel : {}", productCarousel);
        if (productCarousel.getId() != null) {
            throw new BadRequestAlertException("A new productCarousel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductCarousel result = productCarouselRepository.save(productCarousel);
        return ResponseEntity.created(new URI("/api/product-carousels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-carousels : Updates an existing productCarousel.
     *
     * @param productCarousel the productCarousel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productCarousel,
     * or with status 400 (Bad Request) if the productCarousel is not valid,
     * or with status 500 (Internal Server Error) if the productCarousel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-carousels")
    public ResponseEntity<ProductCarousel> updateProductCarousel(@Valid @RequestBody ProductCarousel productCarousel) throws URISyntaxException {
        log.debug("REST request to update ProductCarousel : {}", productCarousel);
        if (productCarousel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductCarousel result = productCarouselRepository.save(productCarousel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productCarousel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-carousels : get all the productCarousels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productCarousels in body
     */
    @GetMapping("/product-carousels")
    public List<ProductCarousel> getAllProductCarousels() {
        log.debug("REST request to get all ProductCarousels");
        return productCarouselRepository.findAll();
    }

    /**
     * GET  /product-carousels/:id : get the "id" productCarousel.
     *
     * @param id the id of the productCarousel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productCarousel, or with status 404 (Not Found)
     */
    @GetMapping("/product-carousels/{id}")
    public ResponseEntity<ProductCarousel> getProductCarousel(@PathVariable Long id) {
        log.debug("REST request to get ProductCarousel : {}", id);
        Optional<ProductCarousel> productCarousel = productCarouselRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productCarousel);
    }

    /**
     * DELETE  /product-carousels/:id : delete the "id" productCarousel.
     *
     * @param id the id of the productCarousel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-carousels/{id}")
    public ResponseEntity<Void> deleteProductCarousel(@PathVariable Long id) {
        log.debug("REST request to delete ProductCarousel : {}", id);
        productCarouselRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

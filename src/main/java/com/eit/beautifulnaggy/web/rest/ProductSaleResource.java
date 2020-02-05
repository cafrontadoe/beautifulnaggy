package com.eit.beautifulnaggy.web.rest;
import com.eit.beautifulnaggy.domain.ProductSale;
import com.eit.beautifulnaggy.repository.ProductSaleRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing ProductSale.
 */
@RestController
@RequestMapping("/api")
public class ProductSaleResource {

    private final Logger log = LoggerFactory.getLogger(ProductSaleResource.class);

    private static final String ENTITY_NAME = "productSale";

    private final ProductSaleRepository productSaleRepository;

    public ProductSaleResource(ProductSaleRepository productSaleRepository) {
        this.productSaleRepository = productSaleRepository;
    }

    /**
     * POST  /product-sales : Create a new productSale.
     *
     * @param productSale the productSale to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productSale, or with status 400 (Bad Request) if the productSale has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-sales")
    public ResponseEntity<ProductSale> createProductSale(@Valid @RequestBody ProductSale productSale) throws URISyntaxException {
        log.debug("REST request to save ProductSale : {}", productSale);
        if (productSale.getId() != null) {
            throw new BadRequestAlertException("A new productSale cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductSale result = productSaleRepository.save(productSale);
        return ResponseEntity.created(new URI("/api/product-sales/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-sales : Updates an existing productSale.
     *
     * @param productSale the productSale to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productSale,
     * or with status 400 (Bad Request) if the productSale is not valid,
     * or with status 500 (Internal Server Error) if the productSale couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-sales")
    public ResponseEntity<ProductSale> updateProductSale(@Valid @RequestBody ProductSale productSale) throws URISyntaxException {
        log.debug("REST request to update ProductSale : {}", productSale);
        if (productSale.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductSale result = productSaleRepository.save(productSale);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productSale.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-sales : get all the productSales.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of productSales in body
     */
    @GetMapping("/product-sales")
    public List<ProductSale> getAllProductSales(@RequestParam(required = false) String filter) {
        if ("product-is-null".equals(filter)) {
            log.debug("REST request to get all ProductSales where product is null");
            return StreamSupport
                .stream(productSaleRepository.findAll().spliterator(), false)
                .filter(productSale -> productSale.getProduct() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ProductSales");
        return productSaleRepository.findAll();
    }

    /**
     * GET  /product-sales/:id : get the "id" productSale.
     *
     * @param id the id of the productSale to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productSale, or with status 404 (Not Found)
     */
    @GetMapping("/product-sales/{id}")
    public ResponseEntity<ProductSale> getProductSale(@PathVariable Long id) {
        log.debug("REST request to get ProductSale : {}", id);
        Optional<ProductSale> productSale = productSaleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productSale);
    }

    /**
     * DELETE  /product-sales/:id : delete the "id" productSale.
     *
     * @param id the id of the productSale to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-sales/{id}")
    public ResponseEntity<Void> deleteProductSale(@PathVariable Long id) {
        log.debug("REST request to delete ProductSale : {}", id);
        productSaleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

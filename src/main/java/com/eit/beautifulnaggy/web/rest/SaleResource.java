package com.eit.beautifulnaggy.web.rest;
import com.eit.beautifulnaggy.domain.Sale;
import com.eit.beautifulnaggy.repository.SaleRepository;
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
 * REST controller for managing Sale.
 */
@RestController
@RequestMapping("/api")
public class SaleResource {

    private final Logger log = LoggerFactory.getLogger(SaleResource.class);

    private static final String ENTITY_NAME = "sale";

    private final SaleRepository saleRepository;

    public SaleResource(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    /**
     * POST  /sales : Create a new sale.
     *
     * @param sale the sale to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sale, or with status 400 (Bad Request) if the sale has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sales")
    public ResponseEntity<Sale> createSale(@Valid @RequestBody Sale sale) throws URISyntaxException {
        log.debug("REST request to save Sale : {}", sale);
        if (sale.getId() != null) {
            throw new BadRequestAlertException("A new sale cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sale result = saleRepository.save(sale);
        return ResponseEntity.created(new URI("/api/sales/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sales : Updates an existing sale.
     *
     * @param sale the sale to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sale,
     * or with status 400 (Bad Request) if the sale is not valid,
     * or with status 500 (Internal Server Error) if the sale couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sales")
    public ResponseEntity<Sale> updateSale(@Valid @RequestBody Sale sale) throws URISyntaxException {
        log.debug("REST request to update Sale : {}", sale);
        if (sale.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sale result = saleRepository.save(sale);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sale.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sales : get all the sales.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sales in body
     */
    @GetMapping("/sales")
    public List<Sale> getAllSales() {
        log.debug("REST request to get all Sales");
        return saleRepository.findAll();
    }

    /**
     * GET  /sales/:id : get the "id" sale.
     *
     * @param id the id of the sale to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sale, or with status 404 (Not Found)
     */
    @GetMapping("/sales/{id}")
    public ResponseEntity<Sale> getSale(@PathVariable Long id) {
        log.debug("REST request to get Sale : {}", id);
        Optional<Sale> sale = saleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sale);
    }

    /**
     * DELETE  /sales/:id : delete the "id" sale.
     *
     * @param id the id of the sale to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sales/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long id) {
        log.debug("REST request to delete Sale : {}", id);
        saleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

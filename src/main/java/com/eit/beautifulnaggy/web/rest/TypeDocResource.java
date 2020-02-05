package com.eit.beautifulnaggy.web.rest;
import com.eit.beautifulnaggy.domain.TypeDoc;
import com.eit.beautifulnaggy.repository.TypeDocRepository;
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
 * REST controller for managing TypeDoc.
 */
@RestController
@RequestMapping("/api")
public class TypeDocResource {

    private final Logger log = LoggerFactory.getLogger(TypeDocResource.class);

    private static final String ENTITY_NAME = "typeDoc";

    private final TypeDocRepository typeDocRepository;

    public TypeDocResource(TypeDocRepository typeDocRepository) {
        this.typeDocRepository = typeDocRepository;
    }

    /**
     * POST  /type-docs : Create a new typeDoc.
     *
     * @param typeDoc the typeDoc to create
     * @return the ResponseEntity with status 201 (Created) and with body the new typeDoc, or with status 400 (Bad Request) if the typeDoc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/type-docs")
    public ResponseEntity<TypeDoc> createTypeDoc(@Valid @RequestBody TypeDoc typeDoc) throws URISyntaxException {
        log.debug("REST request to save TypeDoc : {}", typeDoc);
        if (typeDoc.getId() != null) {
            throw new BadRequestAlertException("A new typeDoc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeDoc result = typeDocRepository.save(typeDoc);
        return ResponseEntity.created(new URI("/api/type-docs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /type-docs : Updates an existing typeDoc.
     *
     * @param typeDoc the typeDoc to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated typeDoc,
     * or with status 400 (Bad Request) if the typeDoc is not valid,
     * or with status 500 (Internal Server Error) if the typeDoc couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/type-docs")
    public ResponseEntity<TypeDoc> updateTypeDoc(@Valid @RequestBody TypeDoc typeDoc) throws URISyntaxException {
        log.debug("REST request to update TypeDoc : {}", typeDoc);
        if (typeDoc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TypeDoc result = typeDocRepository.save(typeDoc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, typeDoc.getId().toString()))
            .body(result);
    }

    /**
     * GET  /type-docs : get all the typeDocs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of typeDocs in body
     */
    @GetMapping("/type-docs")
    public List<TypeDoc> getAllTypeDocs() {
        log.debug("REST request to get all TypeDocs");
        return typeDocRepository.findAll();
    }

    /**
     * GET  /type-docs/:id : get the "id" typeDoc.
     *
     * @param id the id of the typeDoc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the typeDoc, or with status 404 (Not Found)
     */
    @GetMapping("/type-docs/{id}")
    public ResponseEntity<TypeDoc> getTypeDoc(@PathVariable Long id) {
        log.debug("REST request to get TypeDoc : {}", id);
        Optional<TypeDoc> typeDoc = typeDocRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeDoc);
    }

    /**
     * DELETE  /type-docs/:id : delete the "id" typeDoc.
     *
     * @param id the id of the typeDoc to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/type-docs/{id}")
    public ResponseEntity<Void> deleteTypeDoc(@PathVariable Long id) {
        log.debug("REST request to delete TypeDoc : {}", id);
        typeDocRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

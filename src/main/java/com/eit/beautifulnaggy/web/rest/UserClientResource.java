package com.eit.beautifulnaggy.web.rest;
import com.eit.beautifulnaggy.domain.UserClient;
import com.eit.beautifulnaggy.repository.UserClientRepository;
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
 * REST controller for managing UserClient.
 */
@RestController
@RequestMapping("/api")
public class UserClientResource {

    private final Logger log = LoggerFactory.getLogger(UserClientResource.class);

    private static final String ENTITY_NAME = "userClient";

    private final UserClientRepository userClientRepository;

    public UserClientResource(UserClientRepository userClientRepository) {
        this.userClientRepository = userClientRepository;
    }

    /**
     * POST  /user-clients : Create a new userClient.
     *
     * @param userClient the userClient to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userClient, or with status 400 (Bad Request) if the userClient has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-clients")
    public ResponseEntity<UserClient> createUserClient(@Valid @RequestBody UserClient userClient) throws URISyntaxException {
        log.debug("REST request to save UserClient : {}", userClient);
        if (userClient.getId() != null) {
            throw new BadRequestAlertException("A new userClient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserClient result = userClientRepository.save(userClient);
        return ResponseEntity.created(new URI("/api/user-clients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-clients : Updates an existing userClient.
     *
     * @param userClient the userClient to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userClient,
     * or with status 400 (Bad Request) if the userClient is not valid,
     * or with status 500 (Internal Server Error) if the userClient couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-clients")
    public ResponseEntity<UserClient> updateUserClient(@Valid @RequestBody UserClient userClient) throws URISyntaxException {
        log.debug("REST request to update UserClient : {}", userClient);
        if (userClient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserClient result = userClientRepository.save(userClient);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userClient.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-clients : get all the userClients.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userClients in body
     */
    @GetMapping("/user-clients")
    public List<UserClient> getAllUserClients() {
        log.debug("REST request to get all UserClients");
        return userClientRepository.findAll();
    }

    /**
     * GET  /user-clients/:id : get the "id" userClient.
     *
     * @param id the id of the userClient to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userClient, or with status 404 (Not Found)
     */
    @GetMapping("/user-clients/{id}")
    public ResponseEntity<UserClient> getUserClient(@PathVariable Long id) {
        log.debug("REST request to get UserClient : {}", id);
        Optional<UserClient> userClient = userClientRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userClient);
    }

    /**
     * DELETE  /user-clients/:id : delete the "id" userClient.
     *
     * @param id the id of the userClient to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-clients/{id}")
    public ResponseEntity<Void> deleteUserClient(@PathVariable Long id) {
        log.debug("REST request to delete UserClient : {}", id);
        userClientRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

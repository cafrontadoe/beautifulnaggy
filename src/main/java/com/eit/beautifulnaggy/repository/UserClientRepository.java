package com.eit.beautifulnaggy.repository;

import com.eit.beautifulnaggy.domain.UserClient;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserClient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserClientRepository extends JpaRepository<UserClient, Long> {

}

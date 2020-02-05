package com.eit.beautifulnaggy.repository;

import com.eit.beautifulnaggy.domain.UserClient;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.repository.query.Param;



/**
 * Spring Data  repository for the UserClient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserClientRepository extends JpaRepository<UserClient, Long> {

    @Query(
        value = " SELECT * FROM USER_CLIENT u WHERE u.EMAIL = :email ",
        nativeQuery = true)
public List<UserClient> searchUserTrackerByEmail(@Param("email") String email) ;


}

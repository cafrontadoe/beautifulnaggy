package com.eit.beautifulnaggy.repository;

import com.eit.beautifulnaggy.domain.Sale;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


import java.util.List;
import org.springframework.data.repository.query.Param;

   
/**
 * Spring Data  repository for the Sale entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    @Query(
        value = " SELECT S.* FROM USER_CLIENT u, SALE s  WHERE u.EMAIL = :email AND s.USER_CLIENT_ID = u.ID ",
        nativeQuery = true)
public List<Sale> getSaleByEmail(@Param("email") String email) ;


}

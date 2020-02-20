package com.eit.beautifulnaggy.repository;

import java.util.List;

import com.eit.beautifulnaggy.domain.ProductSale;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



/**
 * Spring Data  repository for the ProductSale entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductSaleRepository extends JpaRepository<ProductSale, Long> {


    @Query(
        value = " SELECT p.* FROM PRODUCT_SALE P, SALE s  WHERE p.sale_id = :idSale AND p.sale_id = s.id ",
        nativeQuery = true)
public List<ProductSale> getProductSaleBySale(@Param("idSale") Long idSale) ;


}

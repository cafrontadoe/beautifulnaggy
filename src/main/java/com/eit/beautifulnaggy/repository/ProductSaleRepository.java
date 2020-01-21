package com.eit.beautifulnaggy.repository;

import com.eit.beautifulnaggy.domain.ProductSale;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductSale entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductSaleRepository extends JpaRepository<ProductSale, Long> {

}

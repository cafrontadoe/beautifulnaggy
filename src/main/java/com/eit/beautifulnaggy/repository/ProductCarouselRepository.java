package com.eit.beautifulnaggy.repository;

import com.eit.beautifulnaggy.domain.ProductCarousel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductCarousel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductCarouselRepository extends JpaRepository<ProductCarousel, Long> {

}

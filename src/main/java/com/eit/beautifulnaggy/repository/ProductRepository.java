package com.eit.beautifulnaggy.repository;

import java.util.List;

import com.eit.beautifulnaggy.domain.Product;
import com.eit.beautifulnaggy.domain.Sale;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import org.springframework.data.repository.query.Param;



/**
 * Spring Data  repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {



}

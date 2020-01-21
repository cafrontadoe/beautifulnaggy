package com.eit.beautifulnaggy.repository;

import com.eit.beautifulnaggy.domain.TypeDoc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TypeDoc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeDocRepository extends JpaRepository<TypeDoc, Long> {

}

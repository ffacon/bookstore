package com.worldline.bookstoreine.repository;
import com.worldline.bookstoreine.domain.ProductComment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductComment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductCommentRepository extends JpaRepository<ProductComment, Long> {

}

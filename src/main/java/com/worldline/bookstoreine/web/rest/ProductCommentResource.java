package com.worldline.bookstoreine.web.rest;

import com.worldline.bookstoreine.domain.ProductComment;
import com.worldline.bookstoreine.repository.ProductCommentRepository;
import com.worldline.bookstoreine.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.worldline.bookstoreine.domain.ProductComment}.
 */
@RestController
@RequestMapping("/api")
public class ProductCommentResource {

    private final Logger log = LoggerFactory.getLogger(ProductCommentResource.class);

    private static final String ENTITY_NAME = "productComment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductCommentRepository productCommentRepository;

    public ProductCommentResource(ProductCommentRepository productCommentRepository) {
        this.productCommentRepository = productCommentRepository;
    }

    /**
     * {@code POST  /product-comments} : Create a new productComment.
     *
     * @param productComment the productComment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productComment, or with status {@code 400 (Bad Request)} if the productComment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/product-comments")
    public ResponseEntity<ProductComment> createProductComment(@Valid @RequestBody ProductComment productComment) throws URISyntaxException {
        log.debug("REST request to save ProductComment : {}", productComment);
        if (productComment.getId() != null) {
            throw new BadRequestAlertException("A new productComment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductComment result = productCommentRepository.save(productComment);
        return ResponseEntity.created(new URI("/api/product-comments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-comments} : Updates an existing productComment.
     *
     * @param productComment the productComment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productComment,
     * or with status {@code 400 (Bad Request)} if the productComment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productComment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/product-comments")
    public ResponseEntity<ProductComment> updateProductComment(@Valid @RequestBody ProductComment productComment) throws URISyntaxException {
        log.debug("REST request to update ProductComment : {}", productComment);
        if (productComment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductComment result = productCommentRepository.save(productComment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productComment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /product-comments} : get all the productComments.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productComments in body.
     */
    @GetMapping("/product-comments")
    public List<ProductComment> getAllProductComments() {
        log.debug("REST request to get all ProductComments");
        return productCommentRepository.findAll();
    }

    /**
     * {@code GET  /product-comments/:id} : get the "id" productComment.
     *
     * @param id the id of the productComment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productComment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/product-comments/{id}")
    public ResponseEntity<ProductComment> getProductComment(@PathVariable Long id) {
        log.debug("REST request to get ProductComment : {}", id);
        Optional<ProductComment> productComment = productCommentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productComment);
    }

    /**
     * {@code DELETE  /product-comments/:id} : delete the "id" productComment.
     *
     * @param id the id of the productComment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/product-comments/{id}")
    public ResponseEntity<Void> deleteProductComment(@PathVariable Long id) {
        log.debug("REST request to delete ProductComment : {}", id);
        productCommentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

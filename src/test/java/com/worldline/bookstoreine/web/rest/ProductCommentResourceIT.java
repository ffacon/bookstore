package com.worldline.bookstoreine.web.rest;

import com.worldline.bookstoreine.BookstoreApp;
import com.worldline.bookstoreine.domain.ProductComment;
import com.worldline.bookstoreine.repository.ProductCommentRepository;
import com.worldline.bookstoreine.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.worldline.bookstoreine.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProductCommentResource} REST controller.
 */
@SpringBootTest(classes = BookstoreApp.class)
public class ProductCommentResourceIT {

    private static final Integer DEFAULT_RATE = 1;
    private static final Integer UPDATED_RATE = 2;

    private static final String DEFAULT_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_USER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_USER_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_USER_COMMENT = "BBBBBBBBBB";

    @Autowired
    private ProductCommentRepository productCommentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restProductCommentMockMvc;

    private ProductComment productComment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductCommentResource productCommentResource = new ProductCommentResource(productCommentRepository);
        this.restProductCommentMockMvc = MockMvcBuilders.standaloneSetup(productCommentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductComment createEntity(EntityManager em) {
        ProductComment productComment = new ProductComment()
            .rate(DEFAULT_RATE)
            .userName(DEFAULT_USER_NAME)
            .userComment(DEFAULT_USER_COMMENT);
        return productComment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductComment createUpdatedEntity(EntityManager em) {
        ProductComment productComment = new ProductComment()
            .rate(UPDATED_RATE)
            .userName(UPDATED_USER_NAME)
            .userComment(UPDATED_USER_COMMENT);
        return productComment;
    }

    @BeforeEach
    public void initTest() {
        productComment = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductComment() throws Exception {
        int databaseSizeBeforeCreate = productCommentRepository.findAll().size();

        // Create the ProductComment
        restProductCommentMockMvc.perform(post("/api/product-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productComment)))
            .andExpect(status().isCreated());

        // Validate the ProductComment in the database
        List<ProductComment> productCommentList = productCommentRepository.findAll();
        assertThat(productCommentList).hasSize(databaseSizeBeforeCreate + 1);
        ProductComment testProductComment = productCommentList.get(productCommentList.size() - 1);
        assertThat(testProductComment.getRate()).isEqualTo(DEFAULT_RATE);
        assertThat(testProductComment.getUserName()).isEqualTo(DEFAULT_USER_NAME);
        assertThat(testProductComment.getUserComment()).isEqualTo(DEFAULT_USER_COMMENT);
    }

    @Test
    @Transactional
    public void createProductCommentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productCommentRepository.findAll().size();

        // Create the ProductComment with an existing ID
        productComment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductCommentMockMvc.perform(post("/api/product-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productComment)))
            .andExpect(status().isBadRequest());

        // Validate the ProductComment in the database
        List<ProductComment> productCommentList = productCommentRepository.findAll();
        assertThat(productCommentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUserNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = productCommentRepository.findAll().size();
        // set the field null
        productComment.setUserName(null);

        // Create the ProductComment, which fails.

        restProductCommentMockMvc.perform(post("/api/product-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productComment)))
            .andExpect(status().isBadRequest());

        List<ProductComment> productCommentList = productCommentRepository.findAll();
        assertThat(productCommentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUserCommentIsRequired() throws Exception {
        int databaseSizeBeforeTest = productCommentRepository.findAll().size();
        // set the field null
        productComment.setUserComment(null);

        // Create the ProductComment, which fails.

        restProductCommentMockMvc.perform(post("/api/product-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productComment)))
            .andExpect(status().isBadRequest());

        List<ProductComment> productCommentList = productCommentRepository.findAll();
        assertThat(productCommentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductComments() throws Exception {
        // Initialize the database
        productCommentRepository.saveAndFlush(productComment);

        // Get all the productCommentList
        restProductCommentMockMvc.perform(get("/api/product-comments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productComment.getId().intValue())))
            .andExpect(jsonPath("$.[*].rate").value(hasItem(DEFAULT_RATE)))
            .andExpect(jsonPath("$.[*].userName").value(hasItem(DEFAULT_USER_NAME)))
            .andExpect(jsonPath("$.[*].userComment").value(hasItem(DEFAULT_USER_COMMENT)));
    }
    
    @Test
    @Transactional
    public void getProductComment() throws Exception {
        // Initialize the database
        productCommentRepository.saveAndFlush(productComment);

        // Get the productComment
        restProductCommentMockMvc.perform(get("/api/product-comments/{id}", productComment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productComment.getId().intValue()))
            .andExpect(jsonPath("$.rate").value(DEFAULT_RATE))
            .andExpect(jsonPath("$.userName").value(DEFAULT_USER_NAME))
            .andExpect(jsonPath("$.userComment").value(DEFAULT_USER_COMMENT));
    }

    @Test
    @Transactional
    public void getNonExistingProductComment() throws Exception {
        // Get the productComment
        restProductCommentMockMvc.perform(get("/api/product-comments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductComment() throws Exception {
        // Initialize the database
        productCommentRepository.saveAndFlush(productComment);

        int databaseSizeBeforeUpdate = productCommentRepository.findAll().size();

        // Update the productComment
        ProductComment updatedProductComment = productCommentRepository.findById(productComment.getId()).get();
        // Disconnect from session so that the updates on updatedProductComment are not directly saved in db
        em.detach(updatedProductComment);
        updatedProductComment
            .rate(UPDATED_RATE)
            .userName(UPDATED_USER_NAME)
            .userComment(UPDATED_USER_COMMENT);

        restProductCommentMockMvc.perform(put("/api/product-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductComment)))
            .andExpect(status().isOk());

        // Validate the ProductComment in the database
        List<ProductComment> productCommentList = productCommentRepository.findAll();
        assertThat(productCommentList).hasSize(databaseSizeBeforeUpdate);
        ProductComment testProductComment = productCommentList.get(productCommentList.size() - 1);
        assertThat(testProductComment.getRate()).isEqualTo(UPDATED_RATE);
        assertThat(testProductComment.getUserName()).isEqualTo(UPDATED_USER_NAME);
        assertThat(testProductComment.getUserComment()).isEqualTo(UPDATED_USER_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingProductComment() throws Exception {
        int databaseSizeBeforeUpdate = productCommentRepository.findAll().size();

        // Create the ProductComment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductCommentMockMvc.perform(put("/api/product-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productComment)))
            .andExpect(status().isBadRequest());

        // Validate the ProductComment in the database
        List<ProductComment> productCommentList = productCommentRepository.findAll();
        assertThat(productCommentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductComment() throws Exception {
        // Initialize the database
        productCommentRepository.saveAndFlush(productComment);

        int databaseSizeBeforeDelete = productCommentRepository.findAll().size();

        // Delete the productComment
        restProductCommentMockMvc.perform(delete("/api/product-comments/{id}", productComment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductComment> productCommentList = productCommentRepository.findAll();
        assertThat(productCommentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductComment.class);
        ProductComment productComment1 = new ProductComment();
        productComment1.setId(1L);
        ProductComment productComment2 = new ProductComment();
        productComment2.setId(productComment1.getId());
        assertThat(productComment1).isEqualTo(productComment2);
        productComment2.setId(2L);
        assertThat(productComment1).isNotEqualTo(productComment2);
        productComment1.setId(null);
        assertThat(productComment1).isNotEqualTo(productComment2);
    }
}

package com.worldline.bookstoreine.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ProductComment.
 */
@Entity
@Table(name = "product_comment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductComment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rate")
    private Integer rate;

    @NotNull
    @Column(name = "user_name", nullable = false)
    private String userName;

    @NotNull
    @Column(name = "user_comment", nullable = false)
    private String userComment;

    @ManyToOne
    @JsonIgnoreProperties("comments")
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRate() {
        return rate;
    }

    public ProductComment rate(Integer rate) {
        this.rate = rate;
        return this;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public String getUserName() {
        return userName;
    }

    public ProductComment userName(String userName) {
        this.userName = userName;
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserComment() {
        return userComment;
    }

    public ProductComment userComment(String userComment) {
        this.userComment = userComment;
        return this;
    }

    public void setUserComment(String userComment) {
        this.userComment = userComment;
    }

    public Product getProduct() {
        return product;
    }

    public ProductComment product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProductComment productComment = (ProductComment) o;
        if (productComment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productComment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductComment{" +
            "id=" + getId() +
            ", rate=" + getRate() +
            ", userName='" + getUserName() + "'" +
            ", userComment='" + getUserComment() + "'" +
            "}";
    }
}

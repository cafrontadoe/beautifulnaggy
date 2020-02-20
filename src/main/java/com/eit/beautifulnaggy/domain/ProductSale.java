package com.eit.beautifulnaggy.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ProductSale.
 */
@Entity
@Table(name = "product_sale")
public class ProductSale implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "id_product", nullable = false)
    private Integer idProduct;

    @NotNull
    @Column(name = "count_product", nullable = false)
    private Integer countProduct;

    @NotNull
    @Column(name = "total_product", nullable = false)
    private Double totalProduct;

    @OneToMany(mappedBy = "productSale")
    private Set<Product> products = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("productSales")
    private Sale sale;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdProduct() {
        return idProduct;
    }

    public ProductSale idProduct(Integer idProduct) {
        this.idProduct = idProduct;
        return this;
    }

    public void setIdProduct(Integer idProduct) {
        this.idProduct = idProduct;
    }

    public Integer getCountProduct() {
        return countProduct;
    }

    public ProductSale countProduct(Integer countProduct) {
        this.countProduct = countProduct;
        return this;
    }

    public void setCountProduct(Integer countProduct) {
        this.countProduct = countProduct;
    }

    public Double getTotalProduct() {
        return totalProduct;
    }

    public ProductSale totalProduct(Double totalProduct) {
        this.totalProduct = totalProduct;
        return this;
    }

    public void setTotalProduct(Double totalProduct) {
        this.totalProduct = totalProduct;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public ProductSale products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public ProductSale addProduct(Product product) {
        this.products.add(product);
        product.setProductSale(this);
        return this;
    }

    public ProductSale removeProduct(Product product) {
        this.products.remove(product);
        product.setProductSale(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Sale getSale() {
        return sale;
    }

    public ProductSale sale(Sale sale) {
        this.sale = sale;
        return this;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
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
        ProductSale productSale = (ProductSale) o;
        if (productSale.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productSale.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductSale{" +
            "id=" + getId() +
            ", idProduct=" + getIdProduct() +
            ", countProduct=" + getCountProduct() +
            ", totalProduct=" + getTotalProduct() +
            "}";
    }
}

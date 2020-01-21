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
    @Column(name = "count_product", nullable = false)
    private Integer countProduct;

    @NotNull
    @Column(name = "total_product", nullable = false)
    private Double totalProduct;

    @ManyToOne
    @JsonIgnoreProperties("productSales")
    private Product product;

    @OneToMany(mappedBy = "productSale")
    private Set<Sale> sales = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Product getProduct() {
        return product;
    }

    public ProductSale product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Set<Sale> getSales() {
        return sales;
    }

    public ProductSale sales(Set<Sale> sales) {
        this.sales = sales;
        return this;
    }

    public ProductSale addSale(Sale sale) {
        this.sales.add(sale);
        sale.setProductSale(this);
        return this;
    }

    public ProductSale removeSale(Sale sale) {
        this.sales.remove(sale);
        sale.setProductSale(null);
        return this;
    }

    public void setSales(Set<Sale> sales) {
        this.sales = sales;
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
            ", countProduct=" + getCountProduct() +
            ", totalProduct=" + getTotalProduct() +
            "}";
    }
}

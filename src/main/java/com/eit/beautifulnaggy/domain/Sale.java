package com.eit.beautifulnaggy.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Sale.
 */
@Entity
@Table(name = "sale")
public class Sale implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "creation_date")
    private Instant creationDate;

    @NotNull
    @Column(name = "total", nullable = false)
    private Double total;

    @Column(name = "description")
    private String description;

    @Column(name = "management_date")
    private Instant managementDate;

    @NotNull
    @Column(name = "total_cost", nullable = false)
    private Double totalCost;

    @NotNull
    @Column(name = "iva", nullable = false)
    private Double iva;

    @Column(name = "discount")
    private Double discount;

    @ManyToOne
    @JsonIgnoreProperties("sales")
    private UserClient userClient;

    @OneToMany(mappedBy = "sale")
    private Set<ProductSale> productSales = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public Sale creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Double getTotal() {
        return total;
    }

    public Sale total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getDescription() {
        return description;
    }

    public Sale description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getManagementDate() {
        return managementDate;
    }

    public Sale managementDate(Instant managementDate) {
        this.managementDate = managementDate;
        return this;
    }

    public void setManagementDate(Instant managementDate) {
        this.managementDate = managementDate;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public Sale totalCost(Double totalCost) {
        this.totalCost = totalCost;
        return this;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public Double getIva() {
        return iva;
    }

    public Sale iva(Double iva) {
        this.iva = iva;
        return this;
    }

    public void setIva(Double iva) {
        this.iva = iva;
    }

    public Double getDiscount() {
        return discount;
    }

    public Sale discount(Double discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public UserClient getUserClient() {
        return userClient;
    }

    public Sale userClient(UserClient userClient) {
        this.userClient = userClient;
        return this;
    }

    public void setUserClient(UserClient userClient) {
        this.userClient = userClient;
    }

    public Set<ProductSale> getProductSales() {
        return productSales;
    }

    public Sale productSales(Set<ProductSale> productSales) {
        this.productSales = productSales;
        return this;
    }

    public Sale addProductSale(ProductSale productSale) {
        this.productSales.add(productSale);
        productSale.setSale(this);
        return this;
    }

    public Sale removeProductSale(ProductSale productSale) {
        this.productSales.remove(productSale);
        productSale.setSale(null);
        return this;
    }

    public void setProductSales(Set<ProductSale> productSales) {
        this.productSales = productSales;
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
        Sale sale = (Sale) o;
        if (sale.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sale.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sale{" +
            "id=" + getId() +
            ", creationDate='" + getCreationDate() + "'" +
            ", total=" + getTotal() +
            ", description='" + getDescription() + "'" +
            ", managementDate='" + getManagementDate() + "'" +
            ", totalCost=" + getTotalCost() +
            ", iva=" + getIva() +
            ", discount=" + getDiscount() +
            "}";
    }
}

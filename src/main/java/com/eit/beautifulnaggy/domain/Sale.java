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

    @NotNull
    @Column(name = "creation_date", nullable = false)
    private Instant creationDate;

    @NotNull
    @Column(name = "total", nullable = false)
    private String total;

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
    private ProductSale productSale;

    @OneToMany(mappedBy = "sale")
    private Set<UserClient> userClients = new HashSet<>();
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

    public String getTotal() {
        return total;
    }

    public Sale total(String total) {
        this.total = total;
        return this;
    }

    public void setTotal(String total) {
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

    public ProductSale getProductSale() {
        return productSale;
    }

    public Sale productSale(ProductSale productSale) {
        this.productSale = productSale;
        return this;
    }

    public void setProductSale(ProductSale productSale) {
        this.productSale = productSale;
    }

    public Set<UserClient> getUserClients() {
        return userClients;
    }

    public Sale userClients(Set<UserClient> userClients) {
        this.userClients = userClients;
        return this;
    }

    public Sale addUserClient(UserClient userClient) {
        this.userClients.add(userClient);
        userClient.setSale(this);
        return this;
    }

    public Sale removeUserClient(UserClient userClient) {
        this.userClients.remove(userClient);
        userClient.setSale(null);
        return this;
    }

    public void setUserClients(Set<UserClient> userClients) {
        this.userClients = userClients;
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
            ", total='" + getTotal() + "'" +
            ", description='" + getDescription() + "'" +
            ", managementDate='" + getManagementDate() + "'" +
            ", totalCost=" + getTotalCost() +
            ", iva=" + getIva() +
            ", discount=" + getDiscount() +
            "}";
    }
}

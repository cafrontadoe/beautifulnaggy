package com.eit.beautifulnaggy.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "codigo", nullable = false)
    private String codigo;

    @Column(name = "available")
    private Integer available;

    @Column(name = "price_beauty")
    private Double priceBeauty;

    @Column(name = "price_client")
    private Double priceClient;

    @Column(name = "packaging")
    private String packaging;

    @OneToOne
    @JoinColumn(unique = true)
    private ProductSale productSale;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private ProductCarousel productCaroucel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public Product image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Product imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getNombre() {
        return nombre;
    }

    public Product nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCodigo() {
        return codigo;
    }

    public Product codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getAvailable() {
        return available;
    }

    public Product available(Integer available) {
        this.available = available;
        return this;
    }

    public void setAvailable(Integer available) {
        this.available = available;
    }

    public Double getPriceBeauty() {
        return priceBeauty;
    }

    public Product priceBeauty(Double priceBeauty) {
        this.priceBeauty = priceBeauty;
        return this;
    }

    public void setPriceBeauty(Double priceBeauty) {
        this.priceBeauty = priceBeauty;
    }

    public Double getPriceClient() {
        return priceClient;
    }

    public Product priceClient(Double priceClient) {
        this.priceClient = priceClient;
        return this;
    }

    public void setPriceClient(Double priceClient) {
        this.priceClient = priceClient;
    }

    public String getPackaging() {
        return packaging;
    }

    public Product packaging(String packaging) {
        this.packaging = packaging;
        return this;
    }

    public void setPackaging(String packaging) {
        this.packaging = packaging;
    }

    public ProductSale getProductSale() {
        return productSale;
    }

    public Product productSale(ProductSale productSale) {
        this.productSale = productSale;
        return this;
    }

    public void setProductSale(ProductSale productSale) {
        this.productSale = productSale;
    }

    public ProductCarousel getProductCaroucel() {
        return productCaroucel;
    }

    public Product productCaroucel(ProductCarousel productCarousel) {
        this.productCaroucel = productCarousel;
        return this;
    }

    public void setProductCaroucel(ProductCarousel productCarousel) {
        this.productCaroucel = productCarousel;
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
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", description='" + getDescription() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", available=" + getAvailable() +
            ", priceBeauty=" + getPriceBeauty() +
            ", priceClient=" + getPriceClient() +
            ", packaging='" + getPackaging() + "'" +
            "}";
    }
}

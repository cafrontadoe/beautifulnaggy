package com.eit.beautifulnaggy.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UserClient.
 */
@Entity
@Table(name = "user_client")
public class UserClient implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "last_name")
    private String lastName;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "document_number")
    private String documentNumber;

    @NotNull
    @Column(name = "celphone", nullable = false)
    private String celphone;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @OneToOne
    @JoinColumn(unique = true)
    private TypeDoc typeDoc;

    @ManyToOne
    @JsonIgnoreProperties("userClients")
    private Sale sale;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public UserClient name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public UserClient lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public UserClient email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public UserClient documentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
        return this;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public String getCelphone() {
        return celphone;
    }

    public UserClient celphone(String celphone) {
        this.celphone = celphone;
        return this;
    }

    public void setCelphone(String celphone) {
        this.celphone = celphone;
    }

    public String getAddress() {
        return address;
    }

    public UserClient address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public TypeDoc getTypeDoc() {
        return typeDoc;
    }

    public UserClient typeDoc(TypeDoc typeDoc) {
        this.typeDoc = typeDoc;
        return this;
    }

    public void setTypeDoc(TypeDoc typeDoc) {
        this.typeDoc = typeDoc;
    }

    public Sale getSale() {
        return sale;
    }

    public UserClient sale(Sale sale) {
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
        UserClient userClient = (UserClient) o;
        if (userClient.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userClient.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserClient{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", documentNumber='" + getDocumentNumber() + "'" +
            ", celphone='" + getCelphone() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}

package com.eit.beautifulnaggy.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TypeDoc.
 */
@Entity
@Table(name = "type_doc")
public class TypeDoc implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @OneToOne(mappedBy = "typeDoc")
    @JsonIgnore
    private UserClient userClient;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public TypeDoc description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserClient getUserClient() {
        return userClient;
    }

    public TypeDoc userClient(UserClient userClient) {
        this.userClient = userClient;
        return this;
    }

    public void setUserClient(UserClient userClient) {
        this.userClient = userClient;
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
        TypeDoc typeDoc = (TypeDoc) o;
        if (typeDoc.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), typeDoc.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TypeDoc{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}

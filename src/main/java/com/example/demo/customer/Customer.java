package com.example.demo.customer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

//toStrinng, hashcode, no arg constructor are added here
// @Data this addes all the constructors,getterSetters, hashcode, toString etc. but also makes the variable FINAL(unchangeable) so we don't use it here because we need to change it later
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "Customers")
public class Customer {
    @Id
    @SequenceGenerator(
        name = "customer_sequence",
        sequenceName = "customer_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        generator = "customer_sequence",
        strategy = GenerationType.SEQUENCE)
    private Long id;
    private String firstname;
    private String lastname;
    @NotBlank
    @Column(nullable = false)
    private String name;
    @Email
    @Column(nullable = false, unique = true)
    private String email;
    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @NotBlank
    @Column(nullable = false)
    private String status;
    private String notes;
    //constructors
    public Customer() {}
    public Customer(Long id, String firstname, String lastname, String email, Gender gender, String status, String notes) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.name = firstname + " " + lastname;
        this.email = email;
        this.gender = gender;
        this.status = status;
        this.notes = notes;
    }
    public Customer(Long id, String name, String email, Gender gender, String status, String notes) {
        this.id = id;
        this.name = name;
        String[] name_splited = name.split(" ");
        if(name_splited.length >= 1) this.firstname = name_splited[0];
        if(name_splited.length > 1) this.lastname = name_splited[1];
        this.email = email;
        this.gender = gender;
        this.status = status;
        this.notes = notes;
    }
    //getters&setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getFirstname() {
        return firstname;
    }
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        String[] name_splited = name.split(" ");
        if(name_splited.length >= 1) this.firstname = name_splited[0];
        if(name_splited.length > 1) this.lastname = name_splited[1];
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Gender getGender() {
        return gender;
    }
    public void setGender(Gender gender) {
        this.gender = gender;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
}

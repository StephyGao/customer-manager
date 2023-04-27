package com.example.demo.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

// Long is for id, we used datatype long for ids instead of int
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query("" +
            "SELECT CASE WHEN COUNT(s) > 0 THEN " +
            "TRUE ELSE FALSE END " +
            "FROM Customer s " +
            "WHERE s.email = ?1"
    )
    Boolean selectExistsEmail(String email);
}
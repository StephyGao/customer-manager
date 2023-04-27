package com.example.demo.customer;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.customer.exception.BadRequestException;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/customers")
@AllArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    @GetMapping
    public List<Customer> getAllCustomers() throws IllegalAccessException {
        // throw new IllegalAccessException();
        return customerService.getAllCustomers();
    }
    @PostMapping
    public void addCustomer(@Valid @RequestBody Customer customer) {
        // try {
            customerService.addCustomer(customer);
        // } catch (Exception e) {
            // System.out.println(e);
            // throw e;
        // };
    }
    @DeleteMapping("/ids")
    public void deleteCustomers(@RequestBody List<Long> ids) {
        customerService.deleteCustomers(ids);

    }
    @PutMapping("/{id}")
    public void updateCustomer(@PathVariable Long id, @Valid @RequestBody Customer updatedCustomer) {
        customerService.updateCustomer(id, updatedCustomer);
    }
}

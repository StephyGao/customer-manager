package com.example.demo.customer;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.customer.exception.BadRequestException;
import com.example.demo.customer.exception.CustomerNotFoundException;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CustomerService{

    private final CustomerRepository customerRepository;
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
    public void addCustomer(Customer customer) {
        Boolean existsEmail = customerRepository.selectExistsEmail(customer.getEmail());
        if(existsEmail) {
            throw new BadRequestException(
                "Email"+ customer.getEmail()+"taken"
            );
        }
        customerRepository.save(customer);
    }
    public void deleteCustomers(List<Long> ids) {  
        customerRepository.deleteAllById(ids);
    }
    public void updateCustomer(Long id, Customer updatedCustomer) {
        updatedCustomer.setId(id);
        customerRepository.save(updatedCustomer);
    }
}

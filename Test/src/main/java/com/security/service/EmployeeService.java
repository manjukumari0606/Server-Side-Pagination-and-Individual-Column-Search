package com.security.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.security.entity.Employee;
import com.security.repo.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
     
     public List<Employee> getAllEmployees() {
 		return employeeRepository.findAll();
 	}
	
 	public Optional<Employee> getEmployeeById(long id) {
 		return employeeRepository.findById(id);


 	}
 	
 	public void saveOrUpdateCompany(Employee employee) {
 		employeeRepository.save(employee);
	}
	
	public void deleteCompany(long id) {
		employeeRepository.deleteById(id);
	}
	
    
}

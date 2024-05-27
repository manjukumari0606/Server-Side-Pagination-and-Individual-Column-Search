package com.security.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.security.entity.Employee;
import com.security.service.EmployeeService;

@RestController
@RequestMapping
public class EmployeeController {
		
		@Autowired
		private EmployeeService employeeService;
		
		@RequestMapping(path="/employees", method=RequestMethod.GET)
		public List<Employee> getAllEmployees(){
			return employeeService.getAllEmployees();
		}
	    @RequestMapping(value = "/employee/{id}", method = RequestMethod.GET)
		public Optional<Employee> getEmployeeById(@PathVariable("id") long id){
			return employeeService.getEmployeeById(id);
		}

	    @PostMapping("/employee/save")
		public ResponseEntity<Void> saveOrUpdateCompany(@RequestBody Employee company) {
	    	employeeService.saveOrUpdateCompany(company);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}

		@DeleteMapping("/employee/delete/{id}")
		public ResponseEntity<Void> deleteCompany(@PathVariable long id) {
			employeeService.deleteCompany(id);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}

}

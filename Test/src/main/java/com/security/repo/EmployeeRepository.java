package com.security.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.security.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}


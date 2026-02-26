package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.CategorieBudget;

@Repository
public interface CategorieBudgetRepository extends JpaRepository<CategorieBudget, Integer> {
}
package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.CategorieBudget;
import com.example.demo.repository.CategorieBudgetRepository;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategorieBudgetController {

    @Autowired
    private CategorieBudgetRepository repository;

    @GetMapping
    public List<CategorieBudget> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public CategorieBudget create(@RequestBody CategorieBudget categorie) {
        return repository.save(categorie);
    }
}
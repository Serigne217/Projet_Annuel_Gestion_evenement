package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.CategorieBudget;
import com.example.demo.repository.CategorieBudgetRepository;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"})
@SuppressWarnings("null")
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

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody CategorieBudget categorieDetails) {
        Optional<CategorieBudget> categorieOptional = repository.findById(id);
        if (!categorieOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        CategorieBudget categorie = categorieOptional.get();
        categorie.setNom_categorie(categorieDetails.getNom_categorie());

        return ResponseEntity.ok(repository.save(categorie));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
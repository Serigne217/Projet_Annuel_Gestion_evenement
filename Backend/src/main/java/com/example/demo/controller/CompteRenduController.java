package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.CompteRendu;
import com.example.demo.repository.CompteRenduRepository;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"})
public class CompteRenduController {

    @Autowired
    private CompteRenduRepository compteRenduRepository;

    @GetMapping
    public List<CompteRendu> getAllReports() {
        return compteRenduRepository.findAll();
    }

    @PostMapping
    public CompteRendu createReport(@RequestBody CompteRendu compteRendu) {
        return compteRenduRepository.save(compteRendu);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReport(@PathVariable Integer id) {
        if (compteRenduRepository.existsById(id)) {
            compteRenduRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

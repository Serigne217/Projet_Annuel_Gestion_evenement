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

import com.example.demo.model.Partenaire;
import com.example.demo.repository.PartenaireRepository;

@RestController
@RequestMapping("/api/partners")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"})
public class PartenaireController {

    @Autowired
    private PartenaireRepository partenaireRepository;

    @GetMapping
    public List<Partenaire> getAllPartners() {
        return partenaireRepository.findAll();
    }

    @PostMapping
    public Partenaire createPartner(@RequestBody Partenaire partenaire) {
        return partenaireRepository.save(partenaire);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePartner(@PathVariable Integer id) {
        if (partenaireRepository.existsById(id)) {
            partenaireRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

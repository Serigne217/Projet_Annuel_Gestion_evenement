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

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReport(@PathVariable Integer id, @RequestBody CompteRendu compteRenduDetails) {
        Optional<CompteRendu> compteRenduOptional = compteRenduRepository.findById(id);
        if (!compteRenduOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        CompteRendu compteRendu = compteRenduOptional.get();
        compteRendu.setTitre(compteRenduDetails.getTitre());
        compteRendu.setDate_reunion(compteRenduDetails.getDate_reunion());
        compteRendu.setNotes(compteRenduDetails.getNotes());
        compteRendu.setId_evt(compteRenduDetails.getId_evt());

        return ResponseEntity.ok(compteRenduRepository.save(compteRendu));
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

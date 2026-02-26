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

import com.example.demo.model.Evenement;
import com.example.demo.repository.EvenementRepository;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173") // Autorise le port du Frontend
public class EvenementController {

    @Autowired
    private EvenementRepository evenementRepository;

    @GetMapping
    public List<Evenement> getAllEvents() {
        return evenementRepository.findAll();
    }

    @PostMapping
    public Evenement createEvent(@RequestBody Evenement evenement) {
        // Sécurité pour l'ID responsable
        if (evenement.getId_responsable() == null) {
            evenement.setId_responsable(1);
        }
        return evenementRepository.save(evenement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Integer id) {
        if (evenementRepository.existsById(id)) {
            evenementRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
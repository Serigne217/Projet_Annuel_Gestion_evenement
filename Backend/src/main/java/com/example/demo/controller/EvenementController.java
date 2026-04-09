package com.example.demo.controller;

import java.time.LocalDateTime;
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
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"}) // Autorise le port du Frontend
public class EvenementController {

    @Autowired
    private EvenementRepository evenementRepository;

    @GetMapping
    public List<Evenement> getAllEvents() {
        // Mettre à jour automatiquement le statut des événements
        List<Evenement> events = evenementRepository.findAll();
        LocalDateTime now = LocalDateTime.now();

        for (Evenement event : events) {
            String newStatus = calculateEventStatus(event, now);
            if (!newStatus.equals(event.getStatut())) {
                event.setStatut(newStatus);
                evenementRepository.save(event);
            }
        }

        return events;
    }

    @PostMapping
    public Evenement createEvent(@RequestBody Evenement evenement) {
        // Calculer le statut initial basé sur les dates
        LocalDateTime now = LocalDateTime.now();
        String initialStatus = calculateEventStatus(evenement, now);
        evenement.setStatut(initialStatus);

        // Sécurité pour l'ID responsable
        if (evenement.getId_responsable() == null) {
            evenement.setId_responsable(1);
        }
        return evenementRepository.save(evenement);
    }

    // Méthode utilitaire pour calculer le statut d'un événement
    private String calculateEventStatus(Evenement event, LocalDateTime now) {
        if (event.getDate_fin() != null && now.isAfter(event.getDate_fin())) {
            return "Terminé";
        } else if (event.getDate_debut() != null && now.isAfter(event.getDate_debut())) {
            return "En cours";
        } else {
            return "À venir";
        }
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
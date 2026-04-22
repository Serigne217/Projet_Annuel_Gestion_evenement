package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired; // À créer sur le même modèle que les autres
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

import com.example.demo.model.Utilisateur;
import com.example.demo.repository.UtilisateurRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"})
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository repository;

    @GetMapping
    public List<Utilisateur> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Utilisateur create(@RequestBody Utilisateur user) {
        // Définir le type d'utilisateur par défaut si non spécifié
        if (user.getType_utilisateur() == null || user.getType_utilisateur().isEmpty()) {
            user.setType_utilisateur("Utilisateur");
        }
        return repository.save(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Utilisateur userDetails) {
        Optional<Utilisateur> userOptional = repository.findById(id);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Utilisateur user = userOptional.get();
        user.setNom(userDetails.getNom());
        user.setPrenom(userDetails.getPrenom());
        user.setEmail(userDetails.getEmail());
        user.setMot_de_passe(userDetails.getMot_de_passe());
        user.setStatut(userDetails.getStatut());
        if (userDetails.getType_utilisateur() == null || userDetails.getType_utilisateur().isEmpty()) {
            user.setType_utilisateur("Utilisateur");
        } else {
            user.setType_utilisateur(userDetails.getType_utilisateur());
        }

        return ResponseEntity.ok(repository.save(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
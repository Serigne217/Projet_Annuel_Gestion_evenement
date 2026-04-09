package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; // À créer sur le même modèle que les autres
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
}
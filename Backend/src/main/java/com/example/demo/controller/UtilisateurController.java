package com.example.demo.controller;

import com.example.demo.model.Utilisateur;
import com.example.demo.repository.UtilisateurRepository; // À créer sur le même modèle que les autres
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository repository;

    @GetMapping
    public List<Utilisateur> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Utilisateur create(@RequestBody Utilisateur user) {
        return repository.save(user);
    }
}
package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Utilisateur;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
    // C'est vide, et c'est normal ! 
    // JpaRepository donne déjà accès à findAll(), save(), delete(), etc.
}
package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Evenement;

@Repository
public interface EvenementRepository extends JpaRepository<Evenement, Integer> {
    // C'est vide, et c'est normal ! 
    // JpaRepository contient déjà tout : save(), findAll(), deleteById(), etc.
}
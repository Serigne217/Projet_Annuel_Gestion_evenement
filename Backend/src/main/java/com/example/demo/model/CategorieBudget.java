package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`CategorieBudget`")
@Data 
@NoArgsConstructor
@AllArgsConstructor
public class CategorieBudget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_cat;

    @Column(nullable = false, unique = true)
    private String nom_categorie;
}
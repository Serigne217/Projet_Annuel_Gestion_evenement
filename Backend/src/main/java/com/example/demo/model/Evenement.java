package com.example.demo.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

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
@Table(name = "evenements")
@Data 
@NoArgsConstructor
@AllArgsConstructor
public class Evenement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evt")
    private Integer id;

    @Column(nullable = false)
    private String titre;

    @Column(name = "date_debut")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date_debut; 

    @Column(name = "date_fin")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date_fin;

    private String lieu;
    private String categorie;
    private String description;
    private Double budget_alloue;
    private String statut;

    @Column(name = "id_responsable")
    private Integer id_responsable;
}
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
@Table(name = "Transaction")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_transac;

    @Column(name = "date_mouvement")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date_mouvement;

    private String type;
    private Double montant;
    private String description;
    private Boolean valide;

    @Column(name = "id_evt")
    private Integer id_evt;

    @Column(name = "id_cat")
    private Integer id_cat;

    @Column(name = "id_partenaire")
    private Integer id_partenaire;
}

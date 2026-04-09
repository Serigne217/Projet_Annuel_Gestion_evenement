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
@Table(name = "CompteRendu")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompteRendu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_cr;

    private String titre;

    @Column(name = "date_reunion")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date_reunion;

    private String notes;

    @Column(name = "id_evt")
    private Integer id_evt;
}

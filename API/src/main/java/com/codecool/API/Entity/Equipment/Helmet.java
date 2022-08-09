package com.codecool.API.Entity.Equipment;

import com.codecool.API.Entity.Champion.Champion;
import com.codecool.API.Entity.Rarity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Helmet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private Rarity rarity;
    private double healthPoint;
    private double armor;

    @OneToOne
    private Champion champion;
}

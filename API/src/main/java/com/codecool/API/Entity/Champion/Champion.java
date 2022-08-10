package com.codecool.API.Entity.Champion;


import com.codecool.API.Entity.Rarity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Champion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private Rarity rarity;
    private ChampionType championType;
    private ChampionDomain championDomain;
    private int rank;
    private int level;
    private double experience;
    private double levelTarget;
    private double healthPoint;
    private double damage;
    private double criticalChance;
    private double criticalDamage;
    private double speed;
    private double armor;

    @OneToOne
    private ChampionInventory championInventory;
}

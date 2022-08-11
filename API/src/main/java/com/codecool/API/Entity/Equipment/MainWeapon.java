package com.codecool.API.Entity.Equipment;

import com.codecool.API.Entity.Champion.Champion;
import com.codecool.API.Entity.Rarity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class MainWeapon {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private Rarity rarity;
    private double damage;
    private double criticalDamage;

    @OneToOne
    private Champion champion;
}

package com.codecool.API.Entity.Champion;

import com.codecool.API.Entity.Equipment.*;
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
public class ChampionInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private Champion champion;
    @OneToOne
    private Helmet helmet;
    @OneToOne
    private ChestArmor chestArmor;
    @OneToOne
    private Boots boots;
    @OneToOne
    private MainWeapon mainWeapon;
    @OneToOne
    private SecondaryWeapon secondaryWeapon;
}

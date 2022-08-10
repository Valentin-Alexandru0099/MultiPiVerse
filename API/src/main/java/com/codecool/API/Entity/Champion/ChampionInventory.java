package com.codecool.API.Entity.Champion;

import com.codecool.API.Entity.Equipment.*;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

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
    @OneToOne
    private Talisman talisman;
}

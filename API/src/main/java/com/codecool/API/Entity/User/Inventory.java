package com.codecool.API.Entity.User;

import com.codecool.API.Entity.Champion.Champion;
import com.codecool.API.Entity.Equipment.*;
import com.codecool.API.Entity.Item.Orb;
import lombok.*;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private BigInteger gold;
    private BigInteger crystals;

    @OneToOne
    private Account account;

    @OneToMany
    private List<Champion> championsList;

    @OneToMany
    private List<Helmet> helmetList;

    @OneToMany
    private List<ChestArmor> chestArmorList;

    @OneToMany
    private List<Boots> bootsList;

    @OneToMany
    private List<MainWeapon> mainWeaponsList;

    @OneToMany
    private List<SecondaryWeapon> secondaryWeaponList;

    @OneToMany
    private List<Talisman> talismanList;

    @OneToMany
    private List<Orb> orbList;
}

package com.codecool.API.Entity.User;

import com.codecool.API.Entity.Champion.Champion;
import com.codecool.API.Entity.Equipment.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

}

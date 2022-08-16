package com.codecool.API.Entity.User;

import com.codecool.API.Entity.Champion.Champion;
import com.codecool.API.Entity.Equipment.*;
import com.codecool.API.Entity.Item.Orb;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.ArrayList;
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

    private Long gold;
    private Long crystals;

    @OneToOne(mappedBy = "inventory")
    @JsonIgnore
    private Account account;

    @OneToMany
    private List<Champion> championsList = new ArrayList<>();

    @OneToMany
    private List<Helmet> helmetList = new ArrayList<>();

    @OneToMany
    private List<ChestArmor> chestArmorList = new ArrayList<>();

    @OneToMany
    private List<Boots> bootsList = new ArrayList<>();

    @OneToMany
    private List<MainWeapon> mainWeaponsList = new ArrayList<>();

    @OneToMany
    private List<SecondaryWeapon> secondaryWeaponList = new ArrayList<>();

    @OneToMany
    private List<Talisman> talismanList = new ArrayList<>();

    @OneToMany
    private List<Orb> orbList = new ArrayList<>();
}

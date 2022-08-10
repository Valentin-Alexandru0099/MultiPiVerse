package com.codecool.API.Repository;

import com.codecool.API.Entity.Champion.ChampionInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionInventoryRepository extends JpaRepository<ChampionInventory, Long> {
}

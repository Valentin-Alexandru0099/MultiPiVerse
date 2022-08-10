package com.codecool.API.Repository;

import com.codecool.API.Entity.Champion.Champion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionRepository extends JpaRepository<Champion, Long> {
}

package com.codecool.API.Service;

import com.codecool.API.Repository.ChampionInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChampionInventoryService {

    @Autowired
    private ChampionInventoryRepository championInventoryRepository;
}

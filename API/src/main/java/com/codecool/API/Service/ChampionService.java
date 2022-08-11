package com.codecool.API.Service;

import com.codecool.API.Entity.Champion.Champion;
import com.codecool.API.Repository.ChampionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChampionService {

    @Autowired
    private ChampionRepository championRepository;

}

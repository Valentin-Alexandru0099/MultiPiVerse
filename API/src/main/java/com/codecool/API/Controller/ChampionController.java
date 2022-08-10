package com.codecool.API.Controller;

import com.codecool.API.Entity.Champion.Champion;
import com.codecool.API.Service.ChampionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("api/champions")
public class ChampionController {
    @Autowired
    private ChampionService championService;
}

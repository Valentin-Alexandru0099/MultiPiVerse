package com.codecool.API.Repository;

import com.codecool.API.Entity.User.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}

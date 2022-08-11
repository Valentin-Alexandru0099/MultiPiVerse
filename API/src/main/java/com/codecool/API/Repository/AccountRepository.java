package com.codecool.API.Repository;

import com.codecool.API.Entity.User.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUsername(String username);
    Account findByEmail(String email);
    Account findByResetPasswordCode(String resetCode);
}

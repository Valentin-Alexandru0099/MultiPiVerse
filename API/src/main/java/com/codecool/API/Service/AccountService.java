package com.codecool.API.Service;

import com.codecool.API.Entity.User.Account;
import com.codecool.API.Repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class AccountService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;
    public void addUser(Account user) {
        user.setPassword(passwordEncoder().encode(user.getPassword()));
        user.setSubmissionTime(LocalDate.now());
        user.getRoles().add("ROLE_USER");
        accountRepository.save(user);
    }

    public Account getUser(Long id) {
        Optional<Account> user = accountRepository.findById(id);
        return user.orElse(null);

    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account user = accountRepository.findByUsername(username);

        if (null == user) {
            throw new UsernameNotFoundException("User Not Found with userName " + username);
        }
        return user;
    }

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

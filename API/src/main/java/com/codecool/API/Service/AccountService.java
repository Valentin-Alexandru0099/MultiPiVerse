package com.codecool.API.Service;

import com.codecool.API.Entity.User.Account;
import com.codecool.API.Entity.User.AccountInfo;
import com.codecool.API.Entity.User.LoginResponse;
import com.codecool.API.Repository.AccountRepository;
import com.codecool.API.Security.AuthenticationRequest;
import com.codecool.API.Security.JWTTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.time.LocalDate;
import java.util.Optional;
import java.util.Random;

@Service
public class AccountService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    JWTTokenHelper jWTTokenHelper;


    public ResponseEntity<?> activateAccount(String activationCode) {
        Account user = accountRepository.findByActivationCode(activationCode);
        if (user != null) {
            if (user.isActive()) {
                return ResponseEntity.badRequest().body("Account already activated!");
            } else {
                user.setActive(true);
                accountRepository.saveAndFlush(user);
                return ResponseEntity.ok("Account activated!");
            }
        } else {
            return ResponseEntity.badRequest().body("Code not in database!");
        }
    }

    public ResponseEntity<?> resetPassword(String resetCode, String password) {
        Account user = accountRepository.findByResetPasswordCode(resetCode);
        if (user != null) {
            if (!passwordEncoder().matches(password, user.getPassword())) {
                user.setPassword(passwordEncoder().encode(password));
                user.setResetPasswordCode(null);
                accountRepository.saveAndFlush(user);
                return ResponseEntity.ok("Reset successfully!");
            } else {
                return ResponseEntity.badRequest().body("New password cannot be the same as old password!");
            }
        } else {
            return ResponseEntity.badRequest().body("Code not in database!");
        }
    }

    public ResponseEntity<?> findUserByResetCode(String resetCode) {
        Account user = accountRepository.findByResetPasswordCode(resetCode);
        if (user != null) {
            return ResponseEntity.ok(generateAccountResponse(user));
        } else {
            return ResponseEntity.badRequest().body("Code not in database!");
        }
    }

    public ResponseEntity<?> findUser(String email) {
        Account user = accountRepository.findByEmail(email);
        if (user != null) {
            user.setResetPasswordCode(generateCode());
            accountRepository.saveAndFlush(user);
            return ResponseEntity.ok(generateAccountResponse(user));
        } else {
            return ResponseEntity.badRequest().body("No accounts has this email!");
        }
    }

    public ResponseEntity<?> addUser(Account user) {
        if (findUserByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists !");
        } else if (findUserByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists !");
        }
        user.setPassword(passwordEncoder().encode(user.getPassword()));
        user.setSubmissionTime(LocalDate.now());
        user.getRoles().add("ROLE_USER");
        user.setActivationCode(generateCode());
        accountRepository.save(user);
        return ResponseEntity.ok(generateAccountResponse(user));
    }

    private AccountInfo generateAccountResponse(Account user) {
        AccountInfo accountInfo = new AccountInfo();
        accountInfo.setInventory(user.getInventory());
        accountInfo.setEmail(user.getEmail());
        accountInfo.setUsername(user.getUsername());
        accountInfo.setSubmissionTime(user.getSubmissionTime());
        accountInfo.setId(user.getId());
        accountInfo.setActivationCode(user.getActivationCode());
        accountInfo.setActive(user.isActive());
        accountInfo.setBlocked(user.isBlocked());
        accountInfo.setResetCode(user.getResetPasswordCode());
        return accountInfo;
    }

    private boolean findUserByEmail(String email) {
        Account emailUsed = accountRepository.findByEmail(email);
        return emailUsed != null;
    }

    private boolean findUserByUsername(String username) {
        Account usernameUsed = accountRepository.findByUsername(username);
        return usernameUsed != null;
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

    public ResponseEntity<?> login(AuthenticationRequest authenticationRequest, AuthenticationManager authenticationManager) throws InvalidKeySpecException, NoSuchAlgorithmException {
        try {
            final Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(auth);

            Account user = (Account) auth.getPrincipal();
            if (user.isBlocked()){
                return ResponseEntity.badRequest().body("Account blo");

            }
            if (!user.isActive()) {
                return ResponseEntity.badRequest().body("Account not activated!");
            }
            String jwtToken = jWTTokenHelper.generateToken(user);
            LoginResponse response = new LoginResponse();
            response.setToken(jwtToken);
            response.setUserId(user.getId());
            response.setUsername(user.getUsername());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong, try again!");
        }
    }

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private String generateCode() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 250;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }
}

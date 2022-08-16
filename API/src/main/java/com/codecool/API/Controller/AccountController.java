package com.codecool.API.Controller;

import com.codecool.API.Entity.User.Account;
import com.codecool.API.Entity.User.AccountInfo;
import com.codecool.API.Entity.User.LoginResponse;
import com.codecool.API.Security.AuthenticationRequest;
import com.codecool.API.Security.JWTTokenHelper;
import com.codecool.API.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("api/users/")
public class AccountController {
    @Autowired
    private AccountService accountService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(value = "register")
    public Object register(@RequestBody Account user) {
        return accountService.addUser(user);
    }

    @PostMapping(value = "login")
    public ResponseEntity<?> loginUser(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        return accountService.login(authenticationRequest, authenticationManager);
    }

    @GetMapping(value = "get-user/{username}")
    public ResponseEntity<?> getUser(@PathVariable String username) {
        return accountService.getUserByUsername(username);
    }

    @GetMapping(value = "generateResetPasswordCode/{email}")
    public ResponseEntity<?> findUserForResetLinkAndCode(@PathVariable String email) {
        return accountService.findUser(email);
    }

    @GetMapping(value = "findUserByResetCode/{resetCode}")
    public ResponseEntity<?> findUserForPasswordReset(@PathVariable String resetCode) {
        return accountService.findUserByResetCode(resetCode);
    }

    @PutMapping(value = "resetUserPassword/{resetCode}")
    public ResponseEntity<?> resetPassword(@PathVariable String resetCode, @RequestBody Account account) {
        return accountService.resetPassword(resetCode, account.getPassword());
    }

    @GetMapping(value = "activate-account/{activationCode}")
    public ResponseEntity<?> activateAccount(@PathVariable String activationCode) {
        return accountService.activateAccount(activationCode);
    }
}

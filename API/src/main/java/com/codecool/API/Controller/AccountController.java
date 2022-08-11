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

    @GetMapping(value = "getUser")
    public ResponseEntity<?> getUser(@RequestBody Long userId) {
        Account user = accountService.getUser(userId);
        Account userObj = (Account) accountService.loadUserByUsername(user.getUsername());

        AccountInfo userInfo = new AccountInfo();
        userInfo.setId(userObj.getId());
        userInfo.setUsername(userObj.getUsername());
        userInfo.setEmail(userObj.getEmail());
        userInfo.setSubmissionTime(userObj.getSubmissionTime());
        userInfo.setInventory(userObj.getInventory());

        return ResponseEntity.ok(userInfo);
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
    public ResponseEntity<?> resetPassword(@PathVariable String resetCode, @RequestBody String password) {
        return accountService.resetPassword(resetCode, password);
    }

    @GetMapping(value = "activate-account/{activationCode}")
    public ResponseEntity<?> activateAccount(@PathVariable String activationCode) {
        return accountService.activateAccount(activationCode);
    }
}

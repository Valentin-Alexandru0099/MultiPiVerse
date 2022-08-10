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
@RequestMapping("api/users")
public class AccountController {
    @Autowired
    private AccountService accountService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JWTTokenHelper jWTTokenHelper;

    @PostMapping(value = "/register")
    public Object register(@RequestBody Account user) {
        return accountService.addUser(user);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Account user = (Account) authentication.getPrincipal();
        String jwtToken = jWTTokenHelper.generateToken(user);
        LoginResponse response = new LoginResponse();
        response.setToken(jwtToken);
        response.setUserId(user.getId());
        response.setUsername(user.getUsername());
        return ResponseEntity.ok(response);
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
}

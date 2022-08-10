package com.codecool.API.Security;

import com.codecool.API.Service.AccountService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

    private final AccountService accountService;
    private final JWTTokenHelper jWTTokenHelper;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    public AppSecurityConfig(AccountService accountService, JWTTokenHelper jWTTokenHelper, AuthenticationEntryPoint authenticationEntryPoint) {
        this.accountService = accountService;
        this.jWTTokenHelper = jWTTokenHelper;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint).and()
                .authorizeRequests((request) -> request.antMatchers(
                        "/"
                        , "api/users/register"
                        , "api/users/login").permitAll()
                )
                .authorizeRequests((request) -> request.antMatchers(
                        "api/users/user"
                        ).hasRole("USER")
                        .anyRequest().authenticated())
                .addFilterBefore(new JWTAuthenticationFilter(accountService, jWTTokenHelper),
                        UsernamePasswordAuthenticationFilter.class);
        http.csrf().disable().cors().and().headers().frameOptions().disable();


    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}

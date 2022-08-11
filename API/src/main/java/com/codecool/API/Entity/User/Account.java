package com.codecool.API.Entity.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.random.RandomGenerator;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Account implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String password;
    private String email;
    private LocalDate submissionTime;
    private boolean active;
    private boolean blocked;
    private String activationCode;
    private String resetPasswordCode;
    @ElementCollection(fetch = FetchType.EAGER)
    @JsonIgnore
    private List<String> roles = new ArrayList<>();
    @OneToOne
    private Inventory inventory;

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}

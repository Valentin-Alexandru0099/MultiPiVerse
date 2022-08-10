package com.codecool.API.Entity.User;


import java.time.LocalDate;

public class AccountInfo {

    private Long id;
    private String username;
    private String email;
    private LocalDate submissionTime;
    private Inventory inventory;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getSubmissionTime() {
        return submissionTime;
    }

    public void setSubmissionTime(LocalDate submissionTime) {
        this.submissionTime = submissionTime;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

}

package com.asset.mgmt.util;

public class LoginResponse {

    private String token;
    private Integer id;
    private String email;

    public LoginResponse(String token, Integer id, String email) {
        this.token = token;
        this.id = id;
        this.email = email;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

package com.meetictac.meetictac;

public class SessionModel {

    private String token;


    public SessionModel(String token) {
        this.token = token;

    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "SessionModel{" +
                "token='" + token + '\'' +
                '}';
    }
}

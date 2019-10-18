package com.meetictac.meetictac;

import com.google.gson.annotations.SerializedName;

public class SessionDTO {

    @SerializedName("token")
    private String token;


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "SessionDTO{" +
                "token='" + token + '\'' +
                '}';
    }

    public SessionDTO(String t){
        this.token = t;
    }
}

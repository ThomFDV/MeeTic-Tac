package com.meetictac.meetictac;

import com.google.gson.annotations.SerializedName;

public class UserDTO {

    @SerializedName("firstname")
    private String firstname;

    @SerializedName("lastname")
    private String lastname;

    @SerializedName("password")
    private String password;

    @SerializedName("email")
    private String email;

    public UserDTO(String u, String n, String e, String p){
        this.firstname = u;
        this.lastname = n;
        this.email = e;
        this.password = p;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

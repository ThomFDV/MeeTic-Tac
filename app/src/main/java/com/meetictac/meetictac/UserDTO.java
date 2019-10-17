package com.meetictac.meetictac;

import com.google.gson.annotations.SerializedName;

public class InscriptionDTO {

    @SerializedName("firstname")
    private String firstname;

    @SerializedName("lastname")
    private String lastname;

    @SerializedName("password")
    private String password;

    public InscriptionDTO(String u, String n, String p){
        this.firstname = u;
        this.lastname = n;
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
}

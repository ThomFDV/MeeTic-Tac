package com.meetictac.meetictac;

public class InscripionModel {

    private String email;
    private String name;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getname() {
        return name;
    }

    public void setname(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String toString() {
        return "Inscription{" +
                "email='" + email + '\'' +
                ", username='" + name + '\'' +
                ", password='" + password + '\'' +
                '}';
    }



}

package com.meetictac.meetictac.ui;

import com.meetictac.meetictac.UserDTO;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface MeetictacService {

    @POST("/user/register")
    Call<List<UserDTO>> checkUser();

    @POST("/user/register")
    Call<UserDTO> addUser(@Body UserDTO newUser);

}

package com.meetictac.meetictac.ui;

import com.meetictac.meetictac.EventDTO;
import com.meetictac.meetictac.MatchDTO;
import com.meetictac.meetictac.UserDTO;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface MeetictacService {

    @POST("/login")
    Call<UserDTO> checkUser(@Body UserDTO newUser);

    @POST("/user/register")
    Call<UserDTO> addUser(@Body UserDTO newUser);

    @POST("/match/next")
    Call<MatchDTO> matchWatch();

    @GET("/event")
    Call<List<EventDTO>> allEvent();
}

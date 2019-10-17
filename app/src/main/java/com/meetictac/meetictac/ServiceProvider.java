package com.meetictac.meetictac;

import android.util.Log;

import com.meetictac.meetictac.ui.MeetictacService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ServiceProvider {

    MeetictacService meetictacService;

    private static ServiceProvider instance;

    public static ServiceProvider getInstance() {
        if (instance == null) {
            instance = new ServiceProvider();
        }
        return instance;
    }

    private ServiceProvider() {
        Retrofit retrofit = new Retrofit.Builder().baseUrl("http://10.0.2.2:3000")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        meetictacService = retrofit.create(MeetictacService.class);
    }

    /*public void getWeapons(final Listener<List<UserModel>> listener) {
        meetictacService.getWeapons().enqueue(new Callback<List<UserDTO>>() {
            @Override public void onResponse(Call<List<UserDTO>> call, Response<List<UserDTO>> response) {
                List<UserDTO> weaponDTOList = response.body();
                List<UserModel> weaponList = UserMapper.map(weaponDTOList);

                listener.onSuccess(weaponList);
            }

            @Override public void onFailure(Call<List<UserDTO>> call, Throwable t) {
                listener.onError(t);
            }
        });
    }/*
/*
    public void addUser(final Listener<List<UserModel>> listener, UserDTO newUser) {
        meetictacService.addUser(newUser).enqueue(new Callback<List<UserDTO>>() {
            @Override public void onResponse(Call<List<UserDTO>> call, Response<List<UserDTO>> response) {
                List<UserDTO> weaponDTOList = response.body();
                List<UserModel> weaponList = UserMapper.map(weaponDTOList);

                listener.onSuccess(weaponList);
            }

            @Override public void onFailure(Call<List<UserDTO>> call, Throwable t) {
                listener.onError(t);
            }
        });
    }
*/

    public void addUser(final Listener<UserModel> listener, final UserDTO newUser) {
        meetictacService.addUser(newUser).enqueue(new Callback<UserDTO>() {
            @Override public void onResponse(Call<UserDTO> call, Response<UserDTO> response) {
                Log.d("USER", response.message());
                UserDTO userDTO = response.body();
                UserModel userModel = new UserModel(userDTO.getFirstname(), userDTO.getLastname(), userDTO.getEmail(), userDTO.getPassword());
                listener.onSuccess(userModel);
            }

            @Override public void onFailure(Call<UserDTO> call, Throwable t) {
                t.printStackTrace();
            }
        });
    }


    public interface Listener<T> {
        void onSuccess(T data);

        void onError(Throwable t);
    }
}
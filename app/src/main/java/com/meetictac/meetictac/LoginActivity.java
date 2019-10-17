package com.meetictac.meetictac;

import android.content.ClipData;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;


import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.meetictac.meetictac.ui.home.HomeFragment;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LoginActivity extends AppCompatActivity {

    private Button valider;
    private BottomNavigationView bottomNavigationView;

    private EditText password;
    private EditText email;



    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        valider=findViewById(R.id.valider);

        password=findViewById(R.id.password);
        email=findViewById(R.id.email);

        /*valider.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Intent i = new Intent(LoginActivity.this, MatchActivity.class);
                i.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                startActivity(i);
            }
        }); */

        valider.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!isEmailValid(email.getText().toString())) {
                    Toast.makeText(LoginActivity.this, "Email invalide", Toast.LENGTH_SHORT).show();
                } else if (!isPasswordValid(password.getText().toString())) {
                    Toast.makeText(LoginActivity.this, "Mot de passe invalide", Toast.LENGTH_SHORT).show();
                } else {
                    Log.d("testConnexion", "good Else");
                    //ICI A L'AIDEEEEEEE
                    UserDTO newUser = new UserDTO("","", email.getText().toString(), password.getText().toString());

                    ServiceProvider.getInstance().addUser(new ServiceProvider.Listener<UserModel>() {
                        @Override
                        public void onSuccess(UserModel data) {
                            Log.d("testConnexion", data.toString());
                            Intent intent = new Intent(LoginActivity.this, MatchActivity.class);
                            intent.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                            startActivity(intent);

                        }

                        @Override
                        public void onError(Throwable t) {
                            Toast.makeText(LoginActivity.this, "NUUUUL", Toast.LENGTH_LONG).show();
                            Log.d("testConnexion", t.toString());
                        }
                    }, newUser);

                }
            }
        });


    }

    private boolean isEmailValid(String email) {
        return true;
    }

    private boolean isPasswordValid(String password) {
        return true;
    }


}

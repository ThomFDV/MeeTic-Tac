package com.meetictac.meetictac;

import android.content.ClipData;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;


import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.meetictac.meetictac.ui.home.HomeFragment;

public class LoginActivity extends AppCompatActivity {

    private Button valider;

    private EditText password;
    private EditText email;
    private BottomNavigationView bottomNavigationView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        valider=findViewById(R.id.valider);

        password=findViewById(R.id.password);
        email=findViewById(R.id.email);

        valider.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Intent i = new Intent(LoginActivity.this, MatchActivity.class);
                startActivity(i);
            }
        });


    }


}

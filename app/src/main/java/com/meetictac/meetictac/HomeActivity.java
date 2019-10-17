package com.meetictac.meetictac;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class HomeActivity extends AppCompatActivity {

    private Button buttonConnexion;
    private Button buttonInscription;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        buttonConnexion=findViewById(R.id.buttonConnexion);
        buttonInscription=findViewById(R.id.buttonInscription);

        buttonConnexion.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Intent i = new Intent(HomeActivity.this, LoginActivity.class);
                startActivity(i);
            }
        });

        buttonInscription.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Intent i = new Intent(HomeActivity.this, InscriptionActivity.class);
                i.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                startActivity(i);
            }
        });
    }

}

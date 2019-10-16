package com.meetictac.meetictac;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

public class InscriptionActivity extends AppCompatActivity {

    private Button inscription;

    private EditText email;
    private EditText password;
    private EditText name;
    private EditText lastname;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inscription);


        inscription=findViewById(R.id.inscription);

        email=findViewById(R.id.email);
        password=findViewById(R.id.password);
        name=findViewById(R.id.name);
        lastname=findViewById(R.id.lastname);

    }
}

package com.meetictac.meetictac;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InscriptionActivity extends AppCompatActivity {

    private Button inscription;

    private EditText email;
    private EditText password;
    private EditText firstname;
    private EditText lastname;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inscription);


        inscription=findViewById(R.id.inscription);
        email=findViewById(R.id.email);
        password=findViewById(R.id.password);
        firstname=findViewById(R.id.firstname);
        lastname=findViewById(R.id.lastname);

        inscription.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!isEmailValid(email.getText().toString())) {
                    Toast.makeText(InscriptionActivity.this, "Email incorrect", Toast.LENGTH_SHORT).show();
                } else if (!isUsernameValid(firstname.getText().toString()) || firstname.getText().toString().length() < 2) {
                    Toast.makeText(InscriptionActivity.this, "Nom d'utilisateur incorrect", Toast.LENGTH_SHORT).show();
                }else if (!isUsernameValid(lastname.getText().toString()) || lastname.getText().toString().length() < 2) {
                    Toast.makeText(InscriptionActivity.this, "Prénom d'utilisateur incorrect", Toast.LENGTH_SHORT).show();
                } else if (password.getText().toString().length() < 10) {
                    Toast.makeText(InscriptionActivity.this, "Mot de passe trop court", Toast.LENGTH_SHORT).show();
                } else {
                    Log.d("testConnexion", "good Else");

                    UserDTO newUser = new UserDTO(firstname.getText().toString(), lastname.getText().toString(), email.getText().toString(), password.getText().toString());

                    ServiceProvider.getInstance().addUser(new ServiceProvider.Listener<UserModel>() {
                        @Override
                        public void onSuccess(UserModel data) {
                            Log.d("testConnexion", data.toString());
                            Intent intent = new Intent(InscriptionActivity.this, MatchActivity.class);
                            intent.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                            startActivity(intent);

                        }

                        @Override
                        public void onError(Throwable t) {
                            Toast.makeText(InscriptionActivity.this, "NUUUUL", Toast.LENGTH_LONG).show();
                            Log.d("testConnexion", t.toString());
                        }
                    }, newUser);

                }
            }
        });

    }


    void inscriptionValid() {
        if (!isEmailValid(email.getText().toString())) {
            Toast.makeText(this, "Email incorrect", Toast.LENGTH_SHORT).show();
        } else if (!isUsernameValid(firstname.getText().toString()) || firstname.getText().toString().length() < 2) {
            Toast.makeText(this, "Nom d'utilisateur incorrect", Toast.LENGTH_SHORT).show();
        }else if (!isUsernameValid(lastname.getText().toString()) || lastname.getText().toString().length() < 2) {
            Toast.makeText(this, "Prénom d'utilisateur incorrect", Toast.LENGTH_SHORT).show();
        } else if (password.getText().toString().length() < 10) {
            Toast.makeText(this, "Mot de passe trop court", Toast.LENGTH_SHORT).show();
        } else {
            Log.d("testConnexion", "good Else");
            UserDTO newUser = new UserDTO(firstname.getText().toString(), lastname.getText().toString(), email.getText().toString(), password.getText().toString());

            ServiceProvider.getInstance().addUser(new ServiceProvider.Listener<UserModel>() {
                @Override
                public void onSuccess(UserModel data) {
                    Log.d("testConnexion", data.toString());
                    Intent intent = new Intent(InscriptionActivity.this, MatchActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                    startActivity(intent);

                }

                @Override
                public void onError(Throwable t) {
                    Toast.makeText(InscriptionActivity.this, "NUUUUL", Toast.LENGTH_LONG).show();
                    Log.d("testConnexion", t.toString());
                }
            }, newUser);


        }
    }

    private boolean isEmailValid(String email) {
        String expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[A-Z]{2,4}$";

        Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    private Boolean isUsernameValid(String s) {
        if (s.matches(".*\\d.*")) {
            return false;
        }
        return true;
    }
}

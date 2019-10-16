package com.meetictac.meetictac;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

public class EventAdminActivity extends AppCompatActivity {

    private EditText nameEvent;
    private EditText dateEvent;
    private EditText lieuEvent;
    private EditText descriptionEvent;

    private Button ajoutEvent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event_admin);

        nameEvent=findViewById(R.id.nameEvent);
        dateEvent=findViewById(R.id.dateEvent);
        lieuEvent=findViewById(R.id.lieuEvent);
        descriptionEvent=findViewById(R.id.descriptionEvent);

        ajoutEvent=findViewById(R.id.ajoutEvent);

    }
}

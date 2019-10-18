package com.meetictac.meetictac;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
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

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    Intent b = new Intent(EventAdminActivity.this,MatchActivity.class);
                    b.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                    startActivity(b);
                    break;
                case R.id.navigation_edit:
                    Intent a = new Intent(EventAdminActivity.this, PersonalisationActivity.class);
                    a.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                    startActivity(a);
                    break;
                case R.id.navigation_event:
                    break;

            }
            return true;
        }

    };
}

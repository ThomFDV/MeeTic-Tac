package com.meetictac.meetictac;

import android.content.ClipData;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EventUserActivity extends AppCompatActivity {

    private ListView item;
    private BottomNavigationView nav_view;
    private Button ajouter;
    private TextView titre;
    private TextView titre2;
    private TextView desciprion;
    private TextView desciprion2;
    private TextView location;
    private TextView location2;
    private TextView date;
    private TextView date2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event_user);

        //item=findViewById(R.id.item);
        ajouter=findViewById(R.id.ajouter);


        nav_view=findViewById(R.id.nav_view);

        titre=findViewById(R.id.titre);

        titre2=findViewById(R.id.titre2);

        desciprion=findViewById(R.id.desciprion);

        desciprion2=findViewById(R.id.desciprion2);

        location=findViewById(R.id.location);

        location2=findViewById(R.id.location2);

        date=findViewById(R.id.date);

        date2=findViewById(R.id.date2);

        BottomNavigationView bottom_nav_menu = (BottomNavigationView) findViewById(R.id.nav_view);
        bottom_nav_menu.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);

        ServiceProvider.getInstance().allEvent(new ServiceProvider.Listener<List<EventModel>>() {

            @Override public void onSuccess(List<EventModel> data) {

                Log.d("Resultat", data.toString());

              titre.setText(data.get(0).getTitre());
              desciprion.setText(data.get(0).getDescription());
              location.setText(data.get(0).getLocation());
              date.setText(data.get(0).getDate().toString());

              titre2.setText(data.get(1).getTitre());
              desciprion2.setText(data.get(1).getDescription());
              location2.setText(data.get(1).getLocation());
              date2.setText(data.get(1).getDate().toString());

            }

            @Override public void onError(Throwable t) {

            }

        });

            ajouter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent b = new Intent(EventUserActivity.this,EventAdminActivity.class);
                b.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                startActivity(b);
            }
        });


    }



    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    Intent b = new Intent(EventUserActivity.this,MatchActivity.class);
                    b.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                    startActivity(b);
                    break;
                case R.id.navigation_edit:
                    Intent a = new Intent(EventUserActivity.this, PersonalisationActivity.class);
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

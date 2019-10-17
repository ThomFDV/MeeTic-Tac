package com.meetictac.meetictac;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;


public class PersonalisationActivity extends AppCompatActivity {

    private BottomNavigationView nav_view;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_personalisation);

        nav_view=findViewById(R.id.nav_view);

        BottomNavigationView bottom_nav_menu = (BottomNavigationView) findViewById(R.id.nav_view);
        bottom_nav_menu.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
    }

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    Intent a = new Intent(PersonalisationActivity.this, MatchActivity.class);
                    a.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                    startActivity(a);
                    break;
                case R.id.navigation_edit:
                    break;
                case R.id.navigation_event:
                    Intent b = new Intent(PersonalisationActivity.this,EventUserActivity.class);
                    b.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                    startActivity(b);
                    break;

            }
            return true;
        }

    };
}

package com.meetictac.meetictac;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.ListView;

public class EventUserActivity extends AppCompatActivity {

    private ListView item;
    private BottomNavigationView nav_view;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event_user);

        item=findViewById(R.id.item);


        nav_view=findViewById(R.id.nav_view);

        BottomNavigationView bottom_nav_menu = (BottomNavigationView) findViewById(R.id.nav_view);
        bottom_nav_menu.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
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

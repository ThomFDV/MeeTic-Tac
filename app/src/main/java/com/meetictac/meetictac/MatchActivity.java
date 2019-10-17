package com.meetictac.meetictac;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

public class MatchActivity extends AppCompatActivity {

    private ImageView activity_match_iv;
    private TextView activity_match_description_tv;
    private Button activity_match_dislike_button;
    private Button activity_match_like_button;
    private TextView activity_match_empty_tv;
    private BottomNavigationView nav_view;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_match);

        activity_match_iv=findViewById(R.id.activity_match_iv);
        activity_match_description_tv=findViewById(R.id.activity_match_description_tv);
        activity_match_dislike_button=findViewById(R.id.activity_match_dislike_button);
        activity_match_like_button=findViewById(R.id.activity_match_like_button);
        activity_match_empty_tv=findViewById(R.id.activity_match_empty_tv);

        nav_view=findViewById(R.id.nav_view);


        BottomNavigationView bottom_nav_menu = (BottomNavigationView) findViewById(R.id.nav_view);
        bottom_nav_menu.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);




    }

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    break;
                case R.id.navigation_edit:
                    Intent a = new Intent(MatchActivity.this, PersonalisationActivity.class);
                    a.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                    startActivity(a);
                    break;
                case R.id.navigation_event:
                    Intent b = new Intent(MatchActivity.this,EventUserActivity.class);
                    b.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                    startActivity(b);
                    break;

            }
            return true;
        }

    };


}

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


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_match);

        activity_match_iv=findViewById(R.id.activity_match_iv);
        activity_match_description_tv=findViewById(R.id.activity_match_description_tv);
        activity_match_dislike_button=findViewById(R.id.activity_match_dislike_button);
        activity_match_like_button=findViewById(R.id.activity_match_like_button);
        activity_match_empty_tv=findViewById(R.id.activity_match_empty_tv);

        //BottomNavigationView bottom_nav_menu = (BottomNavigationView) findViewById(R.id.bottom_nav_menu);
        //bottom_nav_menu.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);

    }

    /*private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    System.out.println("Bienvenu sur java");
                    break;
                case R.id.navigation_edit:
                    System.out.println("Bienvenu sur java");
                   //Intent a = new Intent(MatchActivity.this,PersonalisationActivity.class);
                    //startActivity(a);
                    break;
                case R.id.navigation_event:
                    System.out.println("Bienvenu sur java.mesexemples.com");
                    //Intent b = new Intent(MatchActivity.this,EventUserActivity.class);
                    //startActivity(b);
                    break;

            }
            return false;
        }

    };*/


}

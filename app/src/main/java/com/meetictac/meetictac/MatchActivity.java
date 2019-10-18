package com.meetictac.meetictac;

import android.content.Intent;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.meetictac.meetictac.ui.MeetictacService;
import com.squareup.picasso.Picasso;

import java.net.URL;
import java.util.List;

public class MatchActivity extends AppCompatActivity {

    private ImageView activity_match_iv;
    private ImageView activity_match_iv2;
    private ImageView activity_match_iv3;
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
        activity_match_iv2=findViewById(R.id.activity_match_iv2);
        activity_match_iv3=findViewById(R.id.activity_match_iv3);
        activity_match_description_tv=findViewById(R.id.activity_match_description_tv);
        activity_match_dislike_button=findViewById(R.id.activity_match_dislike_button);
        activity_match_like_button=findViewById(R.id.activity_match_like_button);

        nav_view=findViewById(R.id.nav_view);


        BottomNavigationView bottom_nav_menu = (BottomNavigationView) findViewById(R.id.nav_view);
        bottom_nav_menu.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);


        ServiceProvider.getInstance().matchWatch(new ServiceProvider.Listener<MatchModel>() {
            @Override
            public void onSuccess(MatchModel data) {
                Log.d("RESULTAT", data.toString());

                String braceletUrl = data.getBraceletUrl();

                String dialUrl = data.getDialUrl();

                String housingUrl = data.getHousingUrl();

                activity_match_iv.setImageURI(Uri.parse(braceletUrl));
                //activity_match_iv2.setImageURI(Uri.parse(dialUrl));
                //activity_match_iv3.setImageURI(Uri.parse(housingUrl));

                //Picasso.get().load(braceletUrl).into(activity_match_iv);

                //Picasso.get().load(dialUrl).into(activity_match_iv2);

                //Picasso.get().load(housingUrl).into(activity_match_iv3);

            }

            @Override
            public void onError(Throwable t) {
                t.printStackTrace();

            }
        });

        activity_match_like_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MatchActivity.this, "C'est un Match !", Toast.LENGTH_SHORT).show();
                Intent i = new Intent(MatchActivity.this, MatchActivity.class);
                i.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                startActivity(i);

            }
        });

        activity_match_dislike_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MatchActivity.this, "La prochaine sera la bonne", Toast.LENGTH_SHORT).show();
                Intent i = new Intent(MatchActivity.this, MatchActivity.class);
                i.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                startActivity(i);
            }
        });


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

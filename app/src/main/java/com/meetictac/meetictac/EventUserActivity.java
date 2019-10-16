package com.meetictac.meetictac;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ListView;

public class EventUserActivity extends AppCompatActivity {

    private ListView item;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event_user);

        item=findViewById(R.id.item);
    }
}

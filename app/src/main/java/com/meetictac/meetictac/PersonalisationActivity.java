package com.meetictac.meetictac;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;


import android.content.ClipData;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.DragEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnTouchListener;
import android.widget.LinearLayout;


public class PersonalisationActivity extends AppCompatActivity {

    private BottomNavigationView nav_view;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_personalisation);

        nav_view=findViewById(R.id.nav_view);


        findViewById(R.id.braceletImg).setOnTouchListener(new MyTouchListener());
        findViewById(R.id.housingImg).setOnTouchListener(new MyTouchListener());
        findViewById(R.id.dialImg).setOnTouchListener(new MyTouchListener());
        findViewById(R.id.braceletImg2).setOnTouchListener(new MyTouchListener());
        findViewById(R.id.housingImg2).setOnTouchListener(new MyTouchListener());
        findViewById(R.id.dialImg2).setOnTouchListener(new MyTouchListener());

        findViewById(R.id.dialDrop).setOnDragListener(new MyDragListener());
        findViewById(R.id.housingDrop).setOnDragListener(new MyDragListener());
        findViewById(R.id.braceletDrop).setOnDragListener(new MyDragListener());
        findViewById(R.id.dialDrag).setOnDragListener(new MyDragListener());
        findViewById(R.id.housingDrag).setOnDragListener(new MyDragListener());
        findViewById(R.id.braceletDrag).setOnDragListener(new MyDragListener());

        BottomNavigationView bottom_nav_menu = (BottomNavigationView) findViewById(R.id.nav_view);
        bottom_nav_menu.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
    }

    // This defines your touch listener
    private final class MyTouchListener implements OnTouchListener {
        public boolean onTouch(View view, MotionEvent motionEvent) {
            if (motionEvent.getAction() == MotionEvent.ACTION_DOWN) {
                ClipData data = ClipData.newPlainText("", "");
                View.DragShadowBuilder shadowBuilder = new View.DragShadowBuilder(view);
                view.startDragAndDrop(data, shadowBuilder, view, 0);
                view.setVisibility(View.INVISIBLE);
                return true;
            } else {
                return false;
            }
        }
    }

    class MyDragListener implements View.OnDragListener {
        Drawable enterShape = getResources().getDrawable(
                R.drawable.shape_droptarget);
        Drawable normalShape = getResources().getDrawable(R.drawable.shape);

        @Override
        public boolean onDrag(View v, DragEvent event) {
            int action = event.getAction();
            switch (event.getAction()) {
                case DragEvent.ACTION_DRAG_STARTED:
                    // do nothing
                    break;
                case DragEvent.ACTION_DRAG_ENTERED:
                    v.setBackgroundDrawable(enterShape);
                    break;
                case DragEvent.ACTION_DRAG_EXITED:
                    v.setBackgroundDrawable(normalShape);
                    break;
                case DragEvent.ACTION_DROP:
                    // Dropped, reassign View to ViewGroup
                    View view = (View) event.getLocalState();
                    ViewGroup owner = (ViewGroup) view.getParent();
                    owner.removeView(view);
                    LinearLayout container = (LinearLayout) v;
                    container.addView(view);
                    view.setVisibility(View.VISIBLE);
                    break;
                case DragEvent.ACTION_DRAG_ENDED:
                    v.setBackgroundDrawable(normalShape);
                    break;
                default:
                    break;
            }
            return true;
        }
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

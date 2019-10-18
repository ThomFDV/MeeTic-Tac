package com.meetictac.meetictac;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.Date;

public class EventDTO {

    @SerializedName("_id")
    private String _id;

    @SerializedName("title")
    private String title;

    @SerializedName("description")
    private String description;

    @SerializedName("location")
    private String location;

    @SerializedName("date")
    private Date date;

    @SerializedName("creator")
    private String creator;

    @SerializedName("participant")
    private ArrayList participant;

    @SerializedName("createdAt")
    private Date createdAt;

    @SerializedName("updatedAt")
    private Date updatedAt;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public ArrayList getParticipant() {
        return participant;
    }

    public void setParticipant(ArrayList participant) {
        this.participant = participant;
    }
    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public EventDTO(String t, String d, String l, Date date){
        this.title = t;
        this.description=d;
        this.location=l;
        this.date=date;
    }

}

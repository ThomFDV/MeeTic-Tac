package com.meetictac.meetictac;

import com.google.gson.annotations.SerializedName;

public class MatchDTO {

    @SerializedName("braceletUrl")
    private String braceletUrl;

    @SerializedName("dialUrl")
    private String dialUrl;

    @SerializedName("housingUrl")
    private String housingUrl;

    @SerializedName("description")
    private String description;

    public String getBraceletUrl() {
        return braceletUrl;
    }

    public void setBraceletUrl(String braceletUrl) {
        this.braceletUrl = braceletUrl;
    }

    public String getDialUrl() {
        return dialUrl;
    }

    public void setDialUrl(String dialUrl) {
        this.dialUrl = dialUrl;
    }

    public String getHousingUrl() {
        return housingUrl;
    }

    public void setHousingUrl(String housingUrl) {
        this.housingUrl = housingUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public MatchDTO(String b, String d, String h, String de){
        this.braceletUrl = b;
        this.dialUrl = d;
        this.housingUrl = h;
        this.description = de;
    }
}

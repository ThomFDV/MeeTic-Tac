package com.meetictac.meetictac;

public class MatchModel {

    private String braceletUrl;
    private String dialUrl;
    private String housingUrl;
    private String description;

    public MatchModel(String braceletUrl, String dialUrl, String housingUrl, String description) {
        this.braceletUrl = braceletUrl;
        this.dialUrl = dialUrl;
        this.housingUrl = housingUrl;
        this.description = description;
    }

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

    @Override
    public String toString() {
        return "MatchModel{" +
                "braceletUrl='" + braceletUrl + '\'' +
                ", dialUrl='" + dialUrl + '\'' +
                ", housingUrl='" + housingUrl + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}

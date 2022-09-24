package com.example.projecth8.Location.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "locationData")
public class Location {

    @Column(name = "latitude")
    private double latitude;


    @Column(name = "longitude")
    private double longitude;

    @Column(name = "altitude")
    private double altitude;

    @Id
    @Column(name = "identifier")
    private String identifier;

    @Column(name = "timestamp")
    private long timestamp;

    @Column(name = "floorLabel")
    private String floorLabel;

    @Column(name = "horizontalAccuracy")
    private double horizontalAccuracy;

    @Column(name = "verticalAccuracy")
    private double verticalAccuracy;

    @Column(name = "confidenceInLocation")
    private double confidenceInLocation;

    @Column(name = "activity")
    private String activity;

}

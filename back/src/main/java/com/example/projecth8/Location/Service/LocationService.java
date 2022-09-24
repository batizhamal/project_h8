package com.example.projecth8.Location.Service;

import com.example.projecth8.Location.Entity.Location;
import com.example.projecth8.Location.Repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public Location getLocationByIdentifier(String identifier) {
        return locationRepository.findByIdentifier(identifier);
    }
}

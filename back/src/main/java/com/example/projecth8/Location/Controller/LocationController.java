package com.example.projecth8.Location.Controller;

import com.example.projecth8.Location.Entity.Location;
import com.example.projecth8.Location.Service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/location")
@CrossOrigin("http://localhost:8081/")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/{identifier}")
    public Location getLocation(@PathVariable("identifier") String identifier) {
        return locationService.getLocationByIdentifier(identifier);
    }

}

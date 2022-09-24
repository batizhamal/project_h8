package com.example.projecth8.Location.Repository;

import com.example.projecth8.Location.Entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Location findByIdentifier(String identifier);
}

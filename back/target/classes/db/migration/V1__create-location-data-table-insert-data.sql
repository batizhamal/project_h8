CREATE TABLE location_data (
                       latitude numeric not null ,
                       longitude numeric not null ,
                       altitude numeric not null ,
                       identifier varchar(255),
                       timestamp numeric not null ,
                       floor_label varchar,
                       horizontal_accuracy numeric not null,
                       vertical_accuracy numeric not null ,
                       confidence_in_location numeric not null,
                       activity varchar(255)
);

insert into location_data (latitude, longitude, altitude, identifier, "timestamp", floor_label, horizontal_accuracy, vertical_accuracy, confidence_in_location, activity) values (35.6609342754636, 139.729033427753, 0, 'Adam', 4875, null, 2.314, 0.612, 0.6827, 'UNKNOWN');
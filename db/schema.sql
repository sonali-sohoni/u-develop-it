use election;

create table candidates (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL
);


create table parties(
id integer auto_increment primary key,
name varchar(50) not null,
description text
);
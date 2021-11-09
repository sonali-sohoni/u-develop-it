use election;


drop table if exists parties;
create table parties(
id integer auto_increment primary key,
name varchar(50) not null,
description text
);

drop table if exists candidates;
create table candidates (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  party_id integer ,
  industry_connected BOOLEAN NOT NULL
  constraint fk_party foreign key (party_id) references parties(id)) on delete set null
);

drop table if exists voters;

create table voters(
id integer auto_increment primary key,
first_name varchar(30) not null,
last_name varchar(30) not null,
email varchar(50) not null,
created_at datetime default CURRENT_TIMESTAMP
);

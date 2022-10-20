create table users(
id bigserial not null primary key,
username varchar(16) not null unique,
password varchar(255) not null,
role varchar(16) not null default 'user',
refreshtoken varchar(255));
insert into user1(id, username, password, role) values ('1', 'admin', 'admin', 'admin');

create table products(
id varchar(10) not null primary key,
name varchar(30) not null,
cost numeric(10,2) not null,
availability numeric(10) default 0);
insert into products1(id, name, cost, availability) values ('1.1F', 'Apple', '10.2', '1000');

create table purchase_history(
id varchar(10) not null,
name varchar(30) not null,
availability numeric(10,0) not null,
cost numeric(10,2) not null,
username varchar(30) not null,
date date not null);
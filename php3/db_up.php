<?php
if (!($database = mysqli_connect("localhost", "root", "")))
	die("Could not connect to database");
if (!mysqli_select_db($database, "mysql"))
	die("Could not connect to mysql database");

if (!($result = mysqli_query($database, "CREATE TABLE user_php (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
	username VARCHAR(30),
	password VARCHAR(30)
	) AUTO_INCREMENT = 100;"))) {
	print("<p> Could not execute query</p>");
	die(mysqli_error($database));
}

echo "Database initialized!";

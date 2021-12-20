<?php
if (!($database = mysqli_connect("localhost", "root", "")))
	die("Could not connect to database");
if (!mysqli_select_db($database, "mysql"))
	die("Could not connect to mysql database");

if (!($result = mysqli_query($database, "DROP TABLE user_php;"))) {
	print("<p> Could not execute query</p>");
	die(mysqli_error($database));
}

echo "Database dropped!";

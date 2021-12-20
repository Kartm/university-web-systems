<!DOCTYPE html>
<?php
session_start();

?>
<html>

<head>
	<meta charset="utf-8">
	<title>Diagnostics page</title>
	<style>
		table {
			table-layout: fixed;
			border-collapse: collapse;
			border: 1px solid purple;
		}

		thead th:nth-child(1) {
			width: 15%;
		}

		thead {
			font-weight: bold;
		}

		th,
		td {
			padding: 4px;
		}
	</style>
</head>

<body>
	<form method="POST">
		<input type="text" name="id" placeholder="id" />
		<input type="text" name="username" placeholder="username" />
		<input type="text" name="password" placeholder="password" />

		<input type="submit" value="filter" />
	</form>

	<br>

	<?php
	// Please prepare a separate "diagnostic" script which will reveal the contents of the database and it
	// allowed to filter rows by given fields.

	$where_clause = "";

	if (!empty($_POST["id"])) {
		$where_clause = $where_clause . " id='" . $_POST["id"] . "'";
	}
	if (!empty($_POST["username"])) {
		$where_clause = $where_clause . " username='" . $_POST["username"] . "'";
	}
	if (!empty($_POST["password"])) {
		$where_clause = $where_clause . " password='" . $_POST["password"] . "'";
	}

	if (!empty($where_clause)) {
		$where_clause = " WHERE" . $where_clause;
	}

	echo "<table>";

	echo "<thead>
	<td>id</td>
	<td>username</td>
	<td>password</td>
	</thead>";

	if (!($database = mysqli_connect("localhost", "root", "")))
		die("Could not connect to database");
	if (!mysqli_select_db($database, "mysql"))
		die("Could not connect to mysql database");

	$query = "SELECT * FROM user_php" . $where_clause;
	print($query);
	$result = mysqli_query($database, $query);

	while ($row = $result->fetch_assoc()) {
		echo "<tr>";
		echo "<td>{$row["id"]}</td>";
		echo "<td>{$row["username"]}</td>";
		echo "<td>{$row["password"]}</td>";
		echo "</tr>";
	}

	echo "</table>";
	?>
</body>

</html>
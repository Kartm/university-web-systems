<!DOCTYPE html>
<?php
session_start();

?>
<html>

<head>
	<meta charset="utf-8">
	<title>After login menue</title>
</head>

<body>
	<?php
	function myback()
	{
		echo ('<form method="post">
			<input type="submit" name="back"
			class="button" value="back" />
			</form>');
	}
	if (isset($_POST['username']) && isset($_POST['password'])) {
		if (!($database = mysqli_connect("localhost", "root", "")))
			die("Could not connect to database </body</html>");
		if (!mysqli_select_db($database, "mysql"))
			die("Could not connect to mysql database </body</html>");
		$user = $_POST['username'];
		$pass = $_POST['password'];
		$pattern = '/' . "^\w{1,20}$" . '/';
		if (isset($_POST['register'])) {
			if (preg_match($pattern, $user) == 1 && preg_match($pattern, $pass) == 1) {
				$register = $_POST['register'];
				$check = "SELECT 1 FROM user_php WHERE username = '" . $user . "';";
				if (!($result = mysqli_query($database, $check))) {
					print("<p> Could not execute query</p>");
					die(mysqli_error($database) . "</body></html>");
				}
				$res = mysqli_fetch_row($result);
				if ($res == null) {
					$insert = "INSERT INTO user_php (username, password) VALUES ('" . $user . "', '" . $pass . "');";
					if (!($res_insert = mysqli_query($database, $insert))) {
						print("<p> Could not execute query</p>");
						die(mysqli_error($database) . "</body></html>");
					} else {
						echo ("Successfully registered");
						myback();
					}
				} else {
					echo ("User like that already exists");
					myback();
				}
			} else {
				echo ("Username and password must contain only letters and digits and be shorter than 20");
				myback();
			}
		} else {
			$validate = "SELECT id FROM user_php WHERE username='" . $user . "' AND password='" . $pass . "';";
			if (!($result_valid = mysqli_query($database, $validate))) {
				print("<p> Could not execute query</p>");
				die(mysqli_error($database) . "</body></html>");
			}
			$res_val = mysqli_fetch_row($result_valid);
			if ($res_val == null) {
				echo ("Wrong login");
				myback();
			} else {
				setcookie('session_id', $user, time() + 1 * 60 * 60);
				echo ("Successfull login");
				echo ('<form method="post">
					<input type="submit" name="proceed"
					class="button" value="proceed" />
					</form>');
			}
		}
	}
	if (array_key_exists('back', $_POST)) {
		header("Location: login.php");
		exit();
	}
	if (array_key_exists('proceed', $_POST)) {
		header("Location: appearances.php");
		exit();
	}
	?>
</body>

</html>
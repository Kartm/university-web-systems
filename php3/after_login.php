<!DOCTYPE html>
<?php
      session_start();
?>
<html>
   <head>
      <meta charset = "utf-8">
      <title>After login menue</title>
   </head>

   <body>
   <?php
		function myback() {
			echo('<form method="post">
			<input type="submit" name="back"
			class="button" value="back" />
			</form>');
		}
		if(isset($_SESSION['username'])) {
			session_unset($_SESSION['username']);
		}
        if (isset($_POST['username']) && isset($_POST['password'])){
			if (!($database = mysql_connect("localhost", "root", "") ) )
				die("Could not connect to database </body</html>");
			if (!mysql_select_db("mysql", $database) )
				die("Could not connect to mysql database </body</html>");
			$user = $_POST['username'];
			$pass = $_POST['password'];
			if(isset($_POST['register'])){
				$register = $_POST['register'];
				$check = "SELECT 1 FROM user_php WHERE username = '". $user."';";
				if(!($result = mysql_query($check, $database) ) ) {
					print("<p> Could not execute query</p>");
					die(mysql_error(). "</body></html>");
				}
				$res = mysql_fetch_row($result);
				if($res == null) {
					$insert = "INSERT INTO user_php (username, password) VALUES ('".$user."', '".$pass."');"; 
					if(!($res_insert = mysql_query($insert, $database) ) ) {
						print("<p> Could not execute query</p>");
						die(mysql_error(). "</body></html>");
					} else {
						echo("Successfully registered");
						myback();
					}
				} else {
					echo("User like that already exists");
					myback();
				}
			} else {
				$validate = "SELECT id FROM user_php WHERE username='".$user."' AND password='".$pass."';";
				if(!($result_valid = mysql_query($validate, $database) ) ) {
					print("<p> Could not execute query</p>");
					die(mysql_error(). "</body></html>");
				}
				$res_val = mysql_fetch_row($result_valid);
				if ($res_val == null) {
					echo("Wrong login");
					myback();
				} else {
					$_SESSION['userid'] = $res_val[0];
					echo("Successfull login, userid: ".$_SESSION['userid']);
					echo('<form method="post">
					<input type="submit" name="proceed"
					class="button" value="proceed" />
					</form>');
				}
			}
        }
		if(array_key_exists('back', $_POST)) {
			header("Location: login.php");
			exit();
		}
		if(array_key_exists('proceed', $_POST)) {
			header("Location: appearances.php");
			exit();
		}
      ?>
	<?php
	   if (isset($_SESSION['username'])) {
		  $userdata = $_SESSION['username'];
		  header("Location: appearances.php");
		  exit();
	    }
	?>
   </body>
</html>
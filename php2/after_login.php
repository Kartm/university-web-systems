<!DOCTYPE html>
<?php
      session_start();
	  $my_arr = array("User"=>"User","Admin"=>"Admin","Tatra"=>"Mocne");
?>
<html>
   <head>
      <meta charset = "utf-8">
      <title>After login menue</title>

      <?php
	  session_unset($_SESSION['username']);
        if (isset($_POST['username']) && isset($_POST['password'])){
			$user = $_POST['username'];
			$pass = $_POST['password'];
            if(empty($my_arr[$user])) {
				echo "No such user registered";
			} else {
				if($my_arr[$user] != $pass) {
					echo "Wrong password";
				} else {
					$_SESSION['username'] = $user;
				}
			}
        }
      ?>
   </head>

   <body>
   <?php
   if (isset($_SESSION['username'])) {
	  $userdata = $_SESSION['username'];
	  header("Location: appearances.php");
	  exit();
   }
   ?>
   <form method="post">
		<input type="submit" name="back"
            class="button" value="back" />
	</form>
	<?php
        if(array_key_exists('back', $_POST)) {
            myback();
        }
        function myback() {
			header("Location: login.php");
			exit();
        }
	?>
   </body>
</html>
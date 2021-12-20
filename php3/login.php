<!DOCTYPE html>

<?php
    session_start();
	
?>
<html>
   <head>
      <meta charset = "utf-8">
      <title>Login</title>
   </head>

   <body>
		<h1>Hello, please login:</h1>
	   <form method="post" action="after_login.php">
	   	<p>
			<input name="register" type="checkbox">I want to register
		</p>
		<p>
			Username: <input name="username" type="text" class="input-field">
		</p>
		<p>
			 Password: <input name="password" type="password" class="input-field">
		</p>
			 <input type="submit" value="Login">
	   </form>
	   <form method="post">
			<input type="submit" name="Reset"
                class="button" value="Reset" />
		</form>
	   <?php
        if(array_key_exists('Reset', $_POST)) {
            myreset();
        }
    ?>
   </body>
</html>
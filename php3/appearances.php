<!DOCTYPE html>
<?php
	$pattern = '/'."^\w{1,20}$".'/';
	if(isset($_COOKIE['session_id'])) {
		session_id($_COOKIE['session_id']);
		$usid = $_COOKIE['session_id'];
		if (preg_match($pattern, $usid) == 1) {
			print("<p> Currently logged as $usid </p>");
		}
	}
    session_start();
	
?>
<html>
   <head>
      <meta charset = "utf-8">
      <title>PHP remembering appearance</title>

      <?php
         if (isset($_COOKIE['selection'])){
            if($_COOKIE['selection'] == "DARK") {
               echo "
                  <style>
                  body {
                     background-color: #aaaaaa;
                     font-family: fantasy;
                  }
                  </style>
               ";
            } else if ($_COOKIE['selection'] == "MATRIX") {
               echo "<style>
               body {
                  background-color: #2bf900;
                  font-family: monospace;
               }
               h1 {
                  color: white;
                  font-size: 14px;
               }
               </style>";
            }
         }
      ?>
   </head>

   <body>
   <h1>Welcome to our page!</h1>
   
   <form method="post">
      <select name="selection">
         <option value="">Choose desired theme:</option>
         <option value="LIGHT">Light theme</option>
         <option value="DARK">Dark theme</option>
         <option value="MATRIX">Matrix theme</option>
         <input type="submit" value="Save">
      </select>
   </form>

   <?php
   if (!empty($_POST['selection'])){
      echo "<meta http-equiv='refresh' content='0'>";

      // expires after 1 day
      setcookie('selection', $_POST['selection'], time() + 1 * 24 * 60 * 60);
   }  
   ?>
   </body>
</html>
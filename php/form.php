<!DOCTYPE html>

<html>
   <head>
      <meta charset = "utf-8">
      <title>PHP form</title>
   </head>
   <body>
      <?php
      if (empty($_POST["name"])) {
         echo("Missing name.");
         die();
      }
      if (empty($_POST["age"])) {
         echo("Missing age.");
         die();
      }

      $name = $_POST["name"];
      if (!preg_match("/^[a-z ,.'-]+$/i", $name)) {
        echo("Invalid name format. Only letters and spaces allowed.");
        die();
      }
      

      # trim whitespaces
      $name = preg_replace('/\s+/', '', $name);

      $age = $_POST["age"];

      const expected_age_min = 0;
      const expected_age_max = 200;
      if($age > expected_age_max || $age < expected_age_min) {
         echo("Impossible!");
         die();
      }

      echo("<div>Welcome $name. Your age is $age.</div>")
      ?>
   </body>
</html>
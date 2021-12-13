<!DOCTYPE html>

<html>
   <head>
      <meta charset = "utf-8">
      <title>PHP remembering appearance - diagnostics</title>
   </head>
   <body>
      <?php
         echo "Value of cookie: ";
         
         if (isset($_COOKIE['selection'])){
            echo $_COOKIE['selection'];
         } else {
            echo "(empty)";
         }
      ?>
   </body>
</html>
<!DOCTYPE html>

<html>
   <head>
      <meta charset = "utf-8">
      <title>PHP form</title>
   </head>
   <body>
      <?php
		print( "<h1>Months</h1>");
		$months = array (
		"January", "February",
		"March", "April",
		"May", "June",
		"July", "August",
		"September", "October",
		"November", "December");
		
		foreach ($months as $month )
			print("<p>$month</p>");
		$count = count($months);
		print("<h2>There are $count months</h2>");
		print("</br>");
		$my_arr=array("Stern"=>"Extra Strong","Romper"=>"Extreme","Tatra"=>"Mocne");
		print("<p>Array:</p>");
		print_r($my_arr);
		print("</br>");
		print("<p>$_SERVER[SERVER_NAME]</p>"); 
		for ($i = 0; $i < 6; $i++ )
			print("<p>$months[$i]</p>");
		print("</br>");
		reset($months);
		while ($month_name = current($months)) {
			if ($month_name == 'April') {
				$value = key($months);
				print("<p>Key index of $month_name is $value</p>");
			}
		next($months);
		}
	?>
   </body>
</html>
<?php

	header("Access-Control-Allow-Origin: *");

	try {
		
        require 'config.php';
		
        // Try Connect to the DB with new MySqli object - Params {hostname, userid, password, dbname}
        $mysqli = new mysqli(DBHOST, DBUSER, DBPWD, DBNAME);

            
        $statement = $mysqli->prepare("SELECT * FROM formb");


        $statement->execute(); // Execute the statement.
        $result = $statement->get_result(); // Binds the last executed statement as a result.
		
		$rows = array();
		
		while($r = mysqli_fetch_assoc($result)) {
			$rows[] = $r;
		}

		echo json_encode($rows);
  
    } 
	catch (mysqli_sql_exception $e) { // Failed to connect? Lets see the exception details..
        echo "MySQLi Error Code: " . $e->getCode() . "<br />";
        echo "Exception Msg: " . $e->getMessage();
        exit(); // exit and close connection.
    }

    $mysqli->close(); // finally, close the connection

?>
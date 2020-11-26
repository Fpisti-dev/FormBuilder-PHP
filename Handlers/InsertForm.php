<?php

	header("Access-Control-Allow-Origin: *");

	try {
		
        require 'config.php';
		
        // Try Connect to the DB with new MySqli object - Params {hostname, userid, password, dbname}
        $mysqli = new mysqli(DBHOST, DBUSER, DBPWD, DBNAME);
		
		
		//$query = "UPDATE formb SET FormName = ?, Published = ?, LastEditedBy = ?, LastEditDate = CURRENT_DATE() WHERE Id = ?;";
		$query = "INSERT INTO formb (FormName, CreatedBy, CreatedAt, Published)	VALUES (?, ?, CURRENT_DATE(), 0)";
		
		$statement = $mysqli->prepare($query);
		
		$statement->bind_param("ss", $_POST["FormName"], $_POST["UserName"]);

		$statement->execute();        

		echo json_encode($statement->affected_rows);
  
    } 
	catch (mysqli_sql_exception $e) { // Failed to connect? Lets see the exception details..
        echo "MySQLi Error Code: " . $e->getCode() . "<br />";
        echo "Exception Msg: " . $e->getMessage();
        exit(); // exit and close connection.
    }

    $mysqli->close(); // finally, close the connection

?>
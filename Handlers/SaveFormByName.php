<?php

	header("Access-Control-Allow-Origin: *");

	try {
		
        require 'config.php';
		
        // Try Connect to the DB with new MySqli object - Params {hostname, userid, password, dbname}
        $mysqli = new mysqli(DBHOST, DBUSER, DBPWD, DBNAME);
		
		
		$query = "UPDATE formb SET PageHtml = ?, DesignerHtml = ?, Styling = ?,	Scripting = ?, ResourcesStyle = ?, ResourcesScript = ?,
		LastEditedBy = 'Istvan', LastEditDate = CURRENT_DATE() WHERE REPLACE(FormName, ' ', '') = ?";
		
		$statement = $mysqli->prepare($query);
		
		$statement->bind_param("sssssss", $_POST["Pages"], $_POST["Designer"], $_POST["Styling"], $_POST["Scripting"], $_POST["ResourcesStyle"], $_POST["ResourcesScript"], $_POST["FormName"]);
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
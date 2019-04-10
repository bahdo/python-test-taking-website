<?php

    #Gabriel Akdemir - Group 6
    #CS490-103 Alpha 9/27/2018
    #Front End feature:
    #  -Accepts user information, curls to middle end, displays results to user on web page 
		

	$jsonFile = file_get_contents('php://input');
	
	$action = json_decode($jsonFile)->{'action'};

	$url = "https://web.njit.edu/~um44/490/middle.php";
	

	$request = curl_init();
	
	//set url
	curl_setopt($request, CURLOPT_URL, $url);

	//return the transfer as a string 
	curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
	

	//request post
	curl_setopt($request, CURLOPT_POST, 1);
	

	//post data
	curl_setopt($request, CURLOPT_POSTFIELDS, $jsonFile);
	

	//so i can use json
	curl_setopt($request, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
	
	//execute curl
	$result = curl_exec($request);
	
	
	echo $result;

?>
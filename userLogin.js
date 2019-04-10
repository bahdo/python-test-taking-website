function userLogin() {
	var JSONlogin = {
		"action":"login",
		"username":document.getElementById("username").value,
		"password":document.getElementById("password").value
	};

	console.log(JSONlogin);
	sendItUp(JSONlogin, validator);
}


//    Update validator function to redirect student or professor
function validator(receivedJSON) {
	console.log("validator")
	//priv == 0 for student, 1 for teachers
	if(receivedJSON["validLogin"] == true){
		if(receivedJSON["priv"] == "0"){ 
			window.location.href = "https://web.njit.edu/~gea6/490/student/studentDashboard.html";
		}

		else if(receivedJSON["priv"] == 1){
			window.location.href = "https://web.njit.edu/~gea6/490/teacher/teacherDashboard.html";

		}
	}
	else{
		alert("SOMETHING WRONG");
	}


}

function sendItUp(jsonFile, callback) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.open("POST", "https://web.njit.edu/~gea6/490/poster.php", true)
	xmlhttp.setRequestHeader('Content-Type', 'application/json');

	console.log("Sending: " + JSON.stringify(jsonFile));

	xmlhttp.send(JSON.stringify(jsonFile));
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			console.log("Status: Good");
			console.log("State: Good");
			console.log("Response: " + xmlhttp.response);
			console.log("Response Text: " + xmlhttp.responseText);
			callback(JSON.parse(xmlhttp.responseText));
		} else {
			console.log("State: " + xmlhttp.status);
			console.log("Status: " + xmlhttp.readyState);
		}
	};

	console.log(jsonFile);
};

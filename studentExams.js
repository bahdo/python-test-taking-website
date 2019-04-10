//Gabriel Akdemir
//Group Mates: Ryan Romanowski, Uday Manchanda
//CS490
//Front End

//GRAB JSON LIST AVAILABLE EXAMS


function fetchExams() {
	var examGrabber = {
		"action":"get_student_tests",
		"uid":5
	};

	sendItUp(examGrabber, showExams)
}

function showExams(inputtedJSON) {

	var container = document.getElementById("container");

	var availableExams = JSON.parse(inputtedJSON);
	console.log(availableExams)
	console.log("Type: "+typeof(availableExams))

	if (inputtedJSON == "null") {
		container.innerHTML+="No Exams completed"
	} else {

		for (var i = 0; i < availableExams.length; i++) {
			var exam = availableExams[i];
			var ul = document.createElement('ul')
			container.prepend(ul);
			//container.style.list-style-type="none";
			console.log("Exam in for loop: "+JSON.stringify(exam));
			var li = document.createElement('li');
			ul.appendChild(li);
			//li.innerHTML+=JSON.stringify(exam);
			li.style.margin="5px";
			li.style.backgroundColor= "LightGray";
			li.innerHTML+= "<input type='radio' id='studentExam' value='"+exam.tid+"'>"+
			"Test Name: "+JSON.stringify(exam.title);
		}
	}
}

function grabExams() {
	var examFetcher = {
		"action": "get_student_tests",
		"uid": 5,
		"released": true
	};

	sendItUp(examFetcher, showStudentExams);
}

function showStudentExams(inputtedJSON) {
	var container = document.getElementById("container");

	var availableExams = JSON.parse(inputtedJSON);
	console.log(availableExams)
	console.log("Type: "+typeof(availableExams))

	if (inputtedJSON == "null") {
		container.innerHTML+="No Exams completed"
	} else {

		for (var i = 0; i < availableExams.length; i++) {
			var exam = availableExams[i];
			var ul = document.getElementById('gradeList')
			//container.appendChild(ul);
			console.log("Exam in for loop: "+JSON.stringify(exam));

			var examTitle = exam["title"];
			var gottenScore = exam["score"];
			var maximumScore = exam["max_score"];
			var percent = Math.floor(gottenScore/maximumScore*100);
			var tid = exam["tid"];
			

			var li = document.createElement('li');
			ul.prepend(li);
			li.innerHTML+= "<input type='radio' name='test' value='"+tid+"'>"
			li.innerHTML+= "Exam: "+JSON.stringify(examTitle)+"\nScore: "+JSON.stringify(gottenScore)+"\nMax Score: "+JSON.stringify(maximumScore)+" Grade: "+percent+"%";
			li.style.margin="5px";
			li.style.backgroundColor= "LightGray";
			li.setAttribute('id', 'exam'+i);
			li.setAttribute('value', tid);
			li.setAttribute('data-score'+i, gottenScore)
			
		}
	}
}

function breakdownGrades() {
	var examList = document.getElementById('container').querySelectorAll('input[type=radio]:checked');
	var checkedExam = examList.length > 0? true:false;

	if (checkedExam) {
		var testID = examList[0].value;
	}
	var getTestQuestions = {
		"action": "get_student_test_questions",
		"tid": testID,
		"uid": 5
	}

	sendItUp(getTestQuestions, gradeDisplayer);
}

function gradeDisplayer(inputtedJSON) {
	clearContainer();
	var container = document.getElementById('container');
	var questionInfo = JSON.parse(inputtedJSON);
	var counter = 0;
	for (var i = 0; i < questionInfo.length; i++) {
		var question = questionInfo[i];
		var qid = question["qid"];
		var questionText = question["question_text"];
		var questionAnswer = question["question_answer"];
		var results = question["results"];
		var feedback = question["feedback"];
		var score = question["score"];
		var maxScore = question["max_score"]
		var p = document.createElement("p");
		var br = document.createElement("br");
		var feedbackPrompt = document.createElement("p");
		var scorePrompt = document.createElement("p");
		scorePrompt.innerHTML = "Enter score in box below if you wish to change";
		p.style.borderBottom = "thick solid black";
		container.appendChild(p);
		var finalResult = "";
		for (var z = 0; z < results.length; z++) {
			var questionResult = results[z];
			var questionNumber = z+1
				finalResult += "<br>Test Case: "+questionNumber;
				finalResult += "<br>Expected Output: "+questionResult[0];
				finalResult += "<br>Received Output: "+questionResult[1];
				finalResult += "<br>Correct? "+questionResult[2];
		}
		var displayQuestion = document.createElement("p");
			displayQuestion.setAttribute('id', 'questionInfoItem'+i);
			displayQuestion.setAttribute('data-qid'+i, qid)
			displayQuestion.style.backgroundColor = "LightGray"
			displayQuestion.innerHTML = "<strong>Prompt: </strong>"+questionText+"<br><br><strong>Feedback: </strong>"+feedback+"<br><br><strong>Score: </strong>"+score+"<br><br><strong>Max Score: </strong>"+maxScore+"<br><br><strong>Results: </strong>"+finalResult;
			p.appendChild(displayQuestion);
			p.appendChild(feedbackPrompt);
		var answerBox = document.createElement('div');
			answerBox.setAttribute('id', 'answerBox'+i);
			answerBox.innerHTML+="<br>Answer: "
			answerBox.innerHTML+=decodeURIComponent(questionAnswer);
			answerBox.style.border = "#000000";
			answerBox.style.border = "thick solid black";
			p.appendChild(answerBox);

	}
}

function takeExam() {
	var examList = document.getElementById('container').querySelectorAll('input[type=radio]:checked');
	var checkedExam = examList.length > 0? true:false;

	if (checkedExam) {
		var testID = examList[0].value;
	}
	var examGetter = {
		"action": "get_test_questions",
		"tid": testID
	};

	window.thisTest = testID
	console.log(window.thisTest);
	console.log(examGetter)
	console.log("takeExam method")

	sendItUp(examGetter, studentQuestionGetter);
}

function studentQuestionGetter(inputtedJSON) {
	clearContainer();
	var questObj = JSON.parse(inputtedJSON);

	var container = document.getElementById("container");
	var examDiv = document.createElement("div");
	examDiv.setAttribute("id", "examDiv");
	container.appendChild(examDiv);

	var temp = "";
	var counter = 0;
	var questNumber = counter+1;
	var testCasesArray = [];
	var descriptions = []
	for(var i in questObj)
	{
		var questionTestCases = []
		var qid =  questObj[i]["qid"];
		console.log("QID: "+qid)
		var qText = questObj[i]["question_text"];
		var maxScore = questObj[i]["max_score"];
		var functionName = questObj[i]["function_name"];
		var testCases = questObj[i]["test_cases"];
		var maxScore = questObj[i]["max_score"];
		var description = questObj[i]["description"];
		for (var k = 0; k < testCases.length; k++) {
			questionTestCases[k] = testCases[k];
			console.log("in qTC for loop: "+questionTestCases)
		}
		testCasesArray[i] = questionTestCases;
		descriptions[i] = description;
		console.log("TEST CASES: "+'['+questionTestCases+']')
		console.log("first element in testCases: "+testCases[0])
		//console.log("ID: "+ qid + " Question: " +questObj[i]["question_text"]);
		
		temp = '<br>' + 'Question: ' + questNumber + '<br>' +'Prompt: ' + qText +'<br>Function Name: '+ functionName + '<br>Worth ' + maxScore + ' points'+'<br><textarea id="myTextBox'+counter+'" name="myTextBox" style="width: 350px; height: 250px"></textarea>';
			 
		var temp2 = document.createElement("div");
		console.log("Type in loop: "+temp2);
		temp2.setAttribute("id", "thisTextBox"+i);
		temp2.setAttribute('data-qid'+i, qid);
		temp2.setAttribute('data-functionname'+i, functionName);
		temp2.setAttribute('data-testcases'+i, '['+questionTestCases+']');
		temp2.setAttribute('data-prompt'+i, qText);
		temp2.setAttribute('data-maxScore'+i, maxScore)
		temp2.style.backgroundColor = "LightGray"
		console.log("Data from HTML" +temp2.getAttribute('data-qid'+i));
		console.log("Data from HTML" +temp2.getAttribute('data-functionname'+i))
		console.log("Data from HTML" +temp2.getAttribute('data-testcases'+i))
		console.log("Data from HTML" +temp2.getAttribute('data-prompt'+i))
		console.log("Data from HTML" +temp2.getAttribute('data-maxScore'+i))

		temp2.innerHTML+=temp;
		counter++;
		questNumber++;
		container.appendChild(temp2);

	}


	console.log(temp2);
	console.log("COUNTER: "+counter);
	console.log("TESTCASESPLEASE: "+testCasesArray)
	var endBtn = document.createElement("INPUT");
	endBtn.setAttribute("type", "button");
	endBtn.setAttribute("id", "submitBtn");
	endBtn.setAttribute("value", "Submit Exam");
	container.appendChild(endBtn);
	document.getElementById("submitBtn").addEventListener("click", function () {

		var questionsArray = [];
		
		console.log("COUNTER: "+counter)
		for(var j=0; j<counter; j++){
			//console.log("TEST CASES: "+JSON.parse(document.getElementById('thisTextBox'+j).getAttribute('data-testcases'+j)))
			//console.log("TYPEOF TEST CASES: "+ typeof(JSON.parse(document.getElementById('thisTextBox'+j).getAttribute('data-testcases'+j))))
			 var newQuestion = {
					"tid": window.thisTest,
					"qid": document.getElementById('thisTextBox'+j).getAttribute('data-qid'+j),
					"uid": 5,
					"score": 0,
					"max_score": document.getElementById('thisTextBox'+j).getAttribute('data-maxScore'+j),
					"answer": encodeURIComponent(document.getElementById("myTextBox"+j).value),
					"function_name": document.getElementById('thisTextBox'+j).getAttribute('data-functionname'+j),
					"test_cases": testCasesArray[j],
					"question": document.getElementById('thisTextBox'+j).getAttribute('data-prompt'+j),
					"description": descriptions[j]
				};
				questionsArray.push(newQuestion);

			};

		var examSubmitter = {
			"action": "new_student_test_question",
			"questions": questionsArray
			};
		sendItUp(examSubmitter, noCallback);
		//alert("Exam Submitted")
		
		
		var questionEnder = {
			"action": "complete_test",
			"tid": window.thisTest,
			"uid": 5
		};

		sendItUp(questionEnder, noCallback);
		window.location.href = "https://web.njit.edu/~gea6/490/student/studentDashboard.html";
	});


}

function testCasify(testcases) {
	var testes = testcases
	console.log("OG TEST CASES: "+testes[0])
	var arrayOne = []
	
	console.log("ARRAY ONE: "+arrayOne)
	for (var i = 0; i < testes.length; i++) {
		arrayOne[i] = testes[i]
	}

	console.log(arrayOne)
	return arrayOne;

}


function clearContainer() {
	var c = document.getElementById('container');
	c.innerHTML = "";
}

function noCallback() {
	console.log("nothing to be seen here");
}


function sendItUp(jsonFile, callback) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.open("POST", "https://web.njit.edu/~gea6/490/poster.php", true)
	xmlhttp.setRequestHeader("Content-Type", "application/json");

	console.log("Sending: " + JSON.stringify(jsonFile));

	xmlhttp.send(JSON.stringify(jsonFile));
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			console.log("Status: Good");
			console.log("State: Good");
			console.log("Response: " + xmlhttp.response);
			console.log("Response Text: " + xmlhttp.responseText);
			callback(xmlhttp.responseText);
		} else {
			console.log("State: " + xmlhttp.status);
			console.log("Status: " + xmlhttp.readyState);
		}
	};

	console.log(jsonFile);
};
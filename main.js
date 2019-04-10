//Gabriel Akdemir
//Group Mates: Ryan Romanowski, Uday Manchanda
//CS490
//Front End

//update_student_test_question to 
//add feedback and tweak score on a students exams (must supply tid, uid, qid, score, and feedback

function releaseTheKraken() {
	var kraken = {
		"action": "release_scores"
	};

	sendItUp(kraken, noCallback);
	window.location.href = "https://web.njit.edu/~gea6/490/teacher/viewTests.html"
}


function newQuestion() {
	var test1 = document.getElementById('testCase1').value;
	var test2 = document.getElementById('testCase2').value;
	var test3 = document.getElementById('testCase3').value;
	var test4 = document.getElementById('testCase4').value;
	var test5 = document.getElementById('testCase5').value;
	var test6 = document.getElementById('testCase6').value;

	var testC1 = test1.split(' ').map(String)
	var testC2 = test2.split(' ').map(String)
	var testC3 = null;
	console.log("test3: "+test3)
	console.log("testC3: "+testC3) 
	if (test3 != "") {testC3=test3.split(' ').map(String)}
	var testC4 = null;
	var testC5 = null;
	var testC6 = null;

	if (test4 != "") {testC4=test4.split(' ').map(String)}
	if (test5 != "") {testC5=test5.split(' ').map(String)}
	if (test6 != "") {testC6=test6.split(' ').map(String)}

	var totalTestCases = new Array()

	if (test1 != null) {totalTestCases[0] = testC1}

	if (test2 != null) {totalTestCases[1] = testC2}

	if (testC3 != null) {totalTestCases[2] = testC3}

	if (testC4 != null) {totalTestCases[3] = testC4}
	console.log("testC4: "+testC4)
	if (testC5 != null) {totalTestCases[4] = testC5}

	if (testC6 != null) {totalTestCases[5] = testC6}

	console.log("Test cases: "+totalTestCases)

	var newQuestionJson = {
		"action":"new_question",
		"text": document.getElementById('text').value,
		"function":document.getElementById('function').value,
		"category": document.getElementById('category-option').value,
		"difficulty": document.getElementById('difficulty-option').value,
		"test_cases":totalTestCases,
		"description": document.getElementById('description').value

	};

	console.log("New question: " + JSON.stringify(newQuestionJson));
	sendItUp(newQuestionJson, noCallback);
	//window.location.href = "https://web.njit.edu/~gea6/490/teacher/createExam.html";
}

function getQuestions() {
	var questRequest={
		"action":"get_questions"
	};

	sendItUp(questRequest,getAllQuestions)
}


function getAllQuestions(inputtedJson) {
	var questions = JSON.parse(inputtedJson);

	for (var i = 0; i < questions.length; i++) {
		var question = questions[i];
		var questionDifficulty = JSON.stringify(question.difficulty);
		var questionCategory = JSON.stringify(question.category)
		questionDifficulty = questionDifficulty.replace(/"/g, "");
		questionCategory = questionCategory.replace(/"/g, "");
		var questLi = document.createElement('div');
		questLi.setAttribute("id", "question-item");
		questLi.setAttribute("class", "filterElement all "+questionDifficulty+" "+questionCategory+" "+questionDifficulty+questionCategory);
		questLi.setAttribute("name", "questionElement")
		//questLi.style.margin="10px";
		questLi.style.backgroundColor= "LightGray";
		questLi.style.padding="3px";
		questLi.innerHTML+= "<p><input type='checkbox' name='testQuestions[]' value='"+question.qid+"'>"+
		"<b>Question Name: </b>"+JSON.stringify(question.question_text)+
		"<br><b>Function Name: </b>"+JSON.stringify(question.function_name)+
		"<br><b>Category: </b>"+JSON.stringify(question.category)+
		"<br><b>difficulty: </b>"+JSON.stringify(question.difficulty)+
		"<br><b>Test Cases: </b>"+JSON.stringify(question.test_cases)+
		"<br><b>Description: </b>"+JSON.stringify(question.description)+
		"<br><b>Point Value: </b>"+ "<input id='scoreIn"+i+"' type='text' name='setScore' placeholder='Point Value' style='width: 20%;' /></p>" ;
		document.getElementById("questionList").appendChild(questLi);
	}
}

function getTID() {
	var tidRequest = {
		"action": "new_test",
		"title": document.getElementById('examName').value
	};

	console.log(tidRequest);
	sendItUp(tidRequest, submitTest);
}

function submitTest(inputtedJson) {
	var tempArray = [];
	var iteration = [];
	var questionArray = document.getElementsByName('testQuestions[]');
	var jay = JSON.parse(inputtedJson);
	var testID = jay.tid;
	for (var i = 0; i < questionArray.length; i++) {
		var question = questionArray[i];
		console.log(question);
		var qValue = question.value;

		//question["max_score"] = document.getElementById('scoreIn').value;
		console.log("Type: "+typeof(question));
		if (question.checked) {
			tempArray.push(question.value);
			console.log("Value: "+question.value);
			console.log(question.value+" got checked");
			iteration.push(i);

		}

	}
	var questionsToAddArray = [];
	console.log(tempArray);

	for (var i = 0; i < tempArray.length; i++) {
		var examQuestion = tempArray[i];
		var location = iteration[i]
		console.log(examQuestion)
		var addQuestionJSON = {
			"qid": examQuestion,
			"max_score": document.getElementById('scoreIn'+location).value
		};

		questionsToAddArray.push(addQuestionJSON)
	}


	var testQuestionsJSON = {
		"action": "new_test_question",
		"tid": testID,
		"questions": questionsToAddArray
	};

	sendItUp(testQuestionsJSON, noCallback)

	window.location.href = "https://web.njit.edu/~gea6/490/teacher/teacherDashboard.html";

}




function removeQuestion(qid) {
	var deletedQuestion = {
		"action": "del_quesiton",
		"qid": qid
	}	

	//sendItUp(deletedQuestion, noCallback);
}

function newTest() {
	var testInfo = {
		"action": "new_test",
		"name": document.getElementById('examName').value
	};

	sendItUp(testInfo, noCallback);

	window.location.href = "https://web.njit.edu/~gea6/490/teacher/teacherDashboard.html";
}

function viewTests() {
	var testRequest = {
		"action": "get_student_tests",
	};

	sendItUp(testRequest, grabTests)
}

function grabTests(inputtedJson) {
	//clearContainer();
	var container = document.getElementById('container');

	var availableExams = JSON.parse(inputtedJson);
	console.log(availableExams)
	console.log("Type: "+typeof(availableExams))
	
	
	if (inputtedJson == "null") {
		container.innerHTML+="No Exams completed"
	} else {

		for (var i = 0; i < availableExams.length; i++) {
			var exam = availableExams[i];
			console.log(JSON.stringify(exam));
			var title = exam["title"];
			var score = exam["score"];
			var maxScore = exam["max_score"];
			var tid = exam["tid"];
			var qid = exam["qid"];
			var questionText = exam["question_text"];
			var questionAnswer = exam["question_answer"];
			var functionName = exam["function"];
			var results = exam["results"];
			var output = exam["output"];
			var feedback = exam["feedback"];

			var p = document.createElement('p');
			container.prepend(p);
			p.innerHTML="<input type='radio' name='test' value='"+tid+"'>"
			p.innerHTML+= "<strong>Exam:</strong> "+title+"<strong> Score:</strong> "+score+"<strong> Max Score:</strong> "+maxScore;
			p.setAttribute('id', 'exam'+i);
			p.setAttribute('value', tid);
			p.setAttribute('data-score'+i, score)
			
		}
	}
}

function editExams() {

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
	window.thisTest = testID;

	sendItUp(getTestQuestions, questionEditor)
}

function questionEditor(inputtedJson) {
	clearContainer();
	var container = document.getElementById('container');
	var questionInfo = JSON.parse(inputtedJson);
	var counter = 0;
	for (var i = 0; i < questionInfo.length; i++) {
		var question = questionInfo[i];
		var qid = question["qid"];
		var questionText = question["question_text"];
		var questionAnswer = question["question_answer"];
		var results = question["results"];
		var feedback = question["feedback"];
		var score = question["score"];
		var p = document.createElement("p");
		var br = document.createElement("br");
		var feedbackPrompt = document.createElement("p");
		var scorePrompt = document.createElement("p");
		feedbackPrompt.innerHTML = "Enter feedback (if any) for code in box below";
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
			displayQuestion.innerHTML = "<strong>Prompt: </strong>"+questionText+"<br><br><strong>Feedback: </strong>"+feedback+"<br><br><strong>Results: </strong>"+finalResult;
			p.appendChild(displayQuestion);
			p.appendChild(feedbackPrompt);
		var answerBox = document.createElement('div');
			answerBox.setAttribute('id', 'answerBox'+i);
			answerBox.innerHTML+="<br>Answer: "
			answerBox.innerHTML+=decodeURIComponent(questionAnswer);
			answerBox.style.border = "#000000";
			answerBox.style.border = "thick solid black";
			p.appendChild(answerBox);
		var feedBox = document.createElement('input');
			feedBox.setAttribute('id', 'feedbackBox'+i);
			feedBox.setAttribute('placeholder', "Enter feedback");
			feedBox.style.width = "250px";
			feedBox.style.height = "250px";
			p.appendChild(feedBox);
			p.appendChild(br)
			p.appendChild(scorePrompt);
		var scoreBox = document.createElement('input');
			scoreBox.setAttribute('id', 'scoreBox'+i);
			scoreBox.setAttribute('placeholder', 'Enter score if you wish to update');
			scoreBox.value = score;
			scoreBox.style.width = "250px";
			scoreBox.style.margin = "5px";
			//scoreBox.style.padding = "5px";
			p.appendChild(scoreBox);
			p.appendChild(br);
			p.appendChild(br);

		counter++;
	}
	console.log("COUNTER: "+counter)
	var submitChangesBtn = document.createElement("INPUT");
	submitChangesBtn.setAttribute("type", "button");
	submitChangesBtn.setAttribute("id", "changesBtn");
	submitChangesBtn.setAttribute("value", "Submit Changes Exam");
	container.appendChild(submitChangesBtn);

	document.getElementById('changesBtn').addEventListener("click", function () {
		for (var j = 0; j < counter; j++) {
			var changesSubmitter = {
				"action": "update_student_test_question",
				"tid": window.thisTest,
				"uid": 5,
				"qid": document.getElementById('questionInfoItem'+j).getAttribute('data-qid'+j),
				"score": document.getElementById('scoreBox'+j).value,
				"feedback": document.getElementById('feedbackBox'+j).value
			}
			sendItUp(changesSubmitter, noCallback);
			console.log(document.getElementById('scoreBox'+j).value)
			console.log(document.getElementById('feedbackBox'+j).value)
			
			console.log("Submitted Changes");

		}
		window.location.href = "https://web.njit.edu/~gea6/490/teacher/teacherDashboard.html";
	})

}
/*
{
"action": "update_student_test_question",
"tid": tid, GOT IT
"uid": 5, GOT IT
"qid": qid, WORKING ON IT
"score": score, INPUT FROM USER
"feedback": feedback INPUT FROM useR


}
*/
//update_student_test_question to 
//add feedback and tweak score on a students exams (must supply tid, uid, qid, score, and feedback

function noCallback() {
	console.log("nothing to be seen here");
}

function clearContainer() {
	var container = document.getElementById('container');
	container.innerHTML="";
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
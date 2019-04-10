

function createTest(inputtedJSON) {
	clearContainer();
	var container = document.getElementById('container');
	container.innerHTML = "List everything";

	var createTestDiv = document.createElement("div");
	createTestDiv.setAttribute("id", "questionList");
	container.appendChild(createTestDiv);

	var testName = document.createElement("input");
	testName.setAttribute("type", "text");
	testName.setAttribute("placeholder", "Please name this test");
	testName.setAttribute("id", "testName");

}

function listQuestions(inputtedJSON) {
	var questionList = document.getElementById("questionList");

	var questions = inputtedJSON;
	for (var i = 0; i < questions.length; i++) {
		question[i];
		var questionDiv = document.createElement("div");
		questionDiv.setAttribute("name", question["function_name"]);
		questionDiv.setAttribute("data_Num", question["qid"]);
		
	}
}

function viewTests(inputtedJSON) {
	clearContainer();
	var container = document.getElementById('container');
	container.innerHTML = "List tests";
}

function clearContainer() {
	var container = document.getElementById('container');
	container.innerHTML = "";
}



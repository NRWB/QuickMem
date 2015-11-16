//Loads button click events and determines which data to load depending on stack contents
window.onload = function() {
	document.getElementById("myButton").onclick = clearArray;
	if (data.path[1] == undefined) {
		loadCategories();
	} else {
		toCategory(data.path[2]);
	}
}

//Global variables
var myFirebaseRef = new Firebase("https://quickmem.firebaseio.com/");
var data = JSON.parse(localStorage.getItem('firebase'));

//Loads and displays main categories
function loadCategories() {
	myFirebaseRef.child("categories").on("child_added", function(snapshot) {
		var topic = snapshot.val();
		var div = document.getElementById('buttonGroup');
		var a = document.createElement('a');
		a.className = "btn2 blue buttonsize";
		a.onclick = function() { 
			toCategory(topic);
		};
		a.innerHTML = topic;
		div.appendChild(a);
	});
}

//Loads and displays subtopics depending on which category was selected
function toCategory(topic) {
	var div = document.getElementById('buttonGroup');
	clearButtons(div);
	console.log(topic);
	var topic_lower = topic.toLowerCase();
	console.log(topic_lower);
	document.getElementById('title').innerHTML = topic;
	var path = "subtopics/" + topic;
	var i = 1;
	var data = {};
	data['path'] = [];
	data['path'].push('categories');
	data['path'].push('subtopics');
	data['path'].push(topic);
	console.log(data);
	localStorage.setItem('firebase', JSON.stringify(data));
	myFirebaseRef.child(path).on("child_added", function(snap) {
		var subtopic = snap.val();
		var id = topic_lower + i;
		console.log(subtopic, id);
		var a = document.createElement('a');
		a.className = "btn2 blue buttonsize";
		a.innerHTML = subtopic;
		a.onclick = function() {
			var testObject = { 'id': id, 'subtopic': subtopic, 'topic': topic };
			localStorage.setItem('globalVar', JSON.stringify(testObject));
			window.location = "notecard.html";
		};
		div.appendChild(a);
		i += 1;
	});
}

//Clears buttons on page to make room for new buttons and new data
function clearButtons(div) {
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
}

//Clears stack data so that the page can re-load main categories
function clearArray() {
	var arr = localStorage.getItem('firebase');
    var data = JSON.parse(arr);
    for (var i = data.path.length - 1; i > 0; i--) {
        if (data.path[i] != 'categories') {
          	data.path.pop();
        }
    }
    localStorage.setItem('firebase', JSON.stringify(data));
    var div = document.getElementById('buttonGroup');
    clearButtons(div);
    document.getElementById('title').innerHTML = '';
    loadCategories();
}
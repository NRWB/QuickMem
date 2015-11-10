var myFirebaseRef = new Firebase("https://quickmem.firebaseio.com/");

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

function toCategory(topic) {
	var div = document.getElementById('buttonGroup');
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
	console.log(topic);
	var topic_lower = topic.toLowerCase();
	console.log(topic_lower);
	document.getElementById('title').innerHTML = topic;
	var path = "subtopics/" + topic;
	var i = 1;
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

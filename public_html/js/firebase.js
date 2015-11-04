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
	// var id = 1;
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
	console.log(topic);
	var topic_lower = topic.toLowerCase();
	console.log(topic_lower);
	document.getElementById('title').innerHTML = topic;
	var path = "subtopics/" + topic;
	myFirebaseRef.child(path).on("value", function(snap) {
		var subtopic = snap.val();
		console.log(Object.keys(subtopic).length);
		for (var i = 0; i < Object.keys(subtopic).length; i++) {
			console.log("Entering for loop");
			var increment = i + 1;
			var index = topic_lower + increment;
			console.log(index);
			var a = document.createElement('a');
			a.className = "btn2 blue buttonsize";
			a.innerHTML = subtopic[index];
			a.onclick = function() {
				toNoteCard(subtopic, index);
			};
			div.appendChild(a);
		}
	});
}

function toNoteCard(subtopic, index) {
	window.location = "notecard.html";
	alert(subtopic, index);
	// myFirebaseRef.child(path).on("child_added", function(snap) {
		
	// });	
}

var myFirebaseRef = new Firebase("https://quickmem.firebaseio.com/");
var id = 1;
myFirebaseRef.child("categories").on("child_added", function(snapshot) {
	var topic = snapshot.val();
	var div = document.getElementById('buttonGroup');
	var a = document.createElement('a');
	a.id = "link-" + id;
	id += 1;
	a.className = "btn2 blue buttonsize";
	a.onclick = function() { 
		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
		console.log(topic);
		document.getElementById('title').innerHTML = topic;
		var path = "subtopics/" + topic;
		myFirebaseRef.child(path).on("child_added", function(snap) {
			console.log(snap.val());
			var subtopic = snap.val();
			var a = document.createElement('a');
			a.className = "btn2 blue buttonsize";
			a.innerHTML = subtopic;
			div.appendChild(a);
		});
	};
	a.innerHTML = topic;
	div.appendChild(a);
});
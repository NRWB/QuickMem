window.onload = function() {
	document.getElementById('flipBtn').onclick = flipCard;
}

var myFirebaseRef = new Firebase("https://quickmem.firebaseio.com/");
var pageData;
var cards;

myFirebaseRef.child("globalVar").once("value", function(snapshot) {
	console.log(snapshot.val());
	pageData = snapshot.val();
	document.getElementById('title').innerHTML = pageData['subtopic'];
	myFirebaseRef.child("notecards/" + pageData['id']).once("value", function(snap) {
		console.log(snap.val());
		cards = snap.val();
		document.getElementById('type').innerHTML = "Question:";
		document.getElementById('note_content').innerHTML = cards["templates1"].front;
	});
});

function flipCard() {
	var content = document.getElementById('note_content').innerHTML;
	var front = cards["templates1"].front;
	var back = cards["templates1"].back;
	if (content == front) {
		document.getElementById('type').innerHTML = "Answer:";
		document.getElementById('note_content').innerHTML = back;
	} else {
		document.getElementById('type').innerHTML = "Question:";
		document.getElementById('note_content').innerHTML = front;
	}
}
window.onload = function() {
	document.getElementById('flipBtn').onclick = flipCard;
	document.getElementById('nextBtn').onclick = nextCard;
	document.getElementById('prevBtn').onclick = prevCard;
}

var myFirebaseRef = new Firebase("https://quickmem.firebaseio.com/");
var pageData;
var cards;
var lower_topic;
var index;

var data = JSON.parse(localStorage.getItem('globalVar'));
console.log(data);

var lower_topic = data['subtopic'].toLowerCase();
myFirebaseRef.child("notecards/" + data['id']).once("value", function(snap) {
	index = lower_topic + "1";
	document.getElementById("title").innerHTML = data['subtopic'];
	console.log(snap.val());
	cards = snap.val();
	document.getElementById('type').innerHTML = "Question:";
	document.getElementById('note_content').innerHTML = cards[index].front;
});

function flipCard() {
	var content = document.getElementById('note_content').innerHTML;
	console.log(cards[index]);
	if (cards[index] != undefined) {
		var front = cards[index].front;
		var back = cards[index].back;
		if (content == front) {
			document.getElementById('type').innerHTML = "Answer:";
			document.getElementById('note_content').innerHTML = back;
		} else {
			document.getElementById('type').innerHTML = "Question:";
			document.getElementById('note_content').innerHTML = front;
		}
	}
}

function nextCard() {
	var category = index.slice(0, -1);
	var num = index.slice(-1);
	num = parseInt(num);
	num += 1;
	index = category + num.toString();
	flipCard();
}

function prevCard() {
	var category = index.slice(0, -1);
	var num = index.slice(-1);
	num = parseInt(num);
	num -= 1;
	index = category + num.toString();
	flipCard();	
}
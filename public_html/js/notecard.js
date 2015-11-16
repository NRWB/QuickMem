// Function loads onclick button events
window.onload = function() {
	document.getElementById('flipBtn').onclick = flipCard;
	document.getElementById('nextBtn').onclick = nextCard;
	document.getElementById('prevBtn').onclick = prevCard;
	document.getElementById("myButton").onclick = clearArray;
}

//Global variables
var myFirebaseRef = new Firebase("https://quickmem.firebaseio.com/");
var pageData;
var cards;
var lower_topic;
var index;
var data = JSON.parse(localStorage.getItem('globalVar'));
var lower_topic = data['subtopic'].toLowerCase();

//Loads first card
myFirebaseRef.child("notecards/" + data['id']).once("value", function(snap) {
	index = lower_topic + "1";
	document.getElementById("title").innerHTML = data['subtopic'];
	console.log(snap.val());
	cards = snap.val();
	document.getElementById('type').innerHTML = "Question:";
	document.getElementById('note_content').innerHTML = cards[index].front;
});

//Flips card to reveal other side
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

//Shows next card
function nextCard() {
	var currentIndex = index;
	var category = currentIndex.slice(0, -1);
	var num = currentIndex.slice(-1);
	num = parseInt(num);
	num += 1;
	currentIndex = category + num.toString();
	if (cards[currentIndex] != undefined) {
		index = currentIndex;
		flipCard();
	}
}

//Shows previous card
function prevCard() {
	var currentIndex = index;
	var category = currentIndex.slice(0, -1);
	var num = currentIndex.slice(-1);
	num = parseInt(num);
	num -= 1;
	currentIndex = category + num.toString();
	if (cards[currentIndex] != undefined) {
		index = currentIndex;
		flipCard();
	}
}

//Clears stack variable that is stored in local storage so that the main categories page can load
function clearArray() {
	var arr = localStorage.getItem('firebase');
    var data = JSON.parse(arr);
    for (var i = data.path.length - 1; i > 0; i--) {
        if (data.path[i] != 'categories') {
          	data.path.pop();
        }
    }
    localStorage.setItem('firebase', JSON.stringify(data));
    location.href = "index.html";
}
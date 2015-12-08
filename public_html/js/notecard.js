// Function loads onclick button events
window.onload = function() {
	setLoader();
	initializeCard();
	spinner.stop();
	document.getElementById('flipBtn').onclick = flipCard;
	document.getElementById('nextBtn').onclick = nextCard;
	document.getElementById('prevBtn').onclick = prevCard;
	document.getElementById("myButton").onclick = clearArray;
	document.getElementById('rating-input-1-1').onclick = selectRating;
	document.getElementById('rating-input-1-2').onclick = selectRating;
	document.getElementById('rating-input-1-3').onclick = selectRating;
	document.getElementById('rating-input-1-4').onclick = selectRating;
	document.getElementById('rating-input-1-5').onclick = selectRating;
	document.getElementById('compareBtn').onclick = showCompare;
}

//Global variables
var myFirebaseRef = new Firebase("https://quickmem.firebaseio.com/");
var spinner;
var pageData;
var cards;
var lower_topic;
var index;
var data = JSON.parse(localStorage.getItem('globalVar'));
var lower_topic = data['subtopic'].toLowerCase();

function selectRating() {
	console.log(this.value);
	document.getElementById('resultBtn').style.visibility = 'visible';
	document.getElementById('option').innerHTML = this.value;
	document.getElementById('compareBtn').style.visibility = 'visible';
}

function showCompare() {
	document.getElementById('compareBtn').style.visibility = 'hidden';
	console.log(cards);
	var card = cards[index];
	console.log(card);
	
}

//Loads first card
function initializeCard() {
	myFirebaseRef.child("notecards/" + data['id']).once("value", function(snap) {
		index = lower_topic + "1";
		document.getElementById("title").innerHTML = data['subtopic'];
		console.log(snap.val());
		cards = snap.val();
		document.getElementById('type').innerHTML = "Question:";
		document.getElementById('note_content').innerHTML = cards[index].front.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/~~/g, "<br>");
	});
	console.log(spinner);
}

//Flips card to reveal other side
function flipCard() {
	var content = document.getElementById('note_content').innerHTML;
	var side = document.getElementById('type').innerHTML;
	//content = content.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/~~/g, "<br>");
	console.log(content);
	console.log(cards[index]);
	if (cards[index] != undefined) {
		var front = cards[index].front;
		var back = cards[index].back;
		if (side == "Question:") {
			document.getElementById('type').innerHTML = "Answer:";
			document.getElementById('note_content').innerHTML = back.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/~~/g, "<br>");
		} else {
			document.getElementById('type').innerHTML = "Question:";
			document.getElementById('note_content').innerHTML = front.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/~~/g, "<br>");
		}
	}
}

//Shows next card
function nextCard() {
	document.getElementById('compareBtn').style.visibility = 'hidden';
	document.getElementById('resultBtn').style.visibility = 'hidden';	
	var currentIndex = index;
	var category = currentIndex.slice(0, -1);
	var num = currentIndex.slice(-1);
	num = parseInt(num);
	num += 1;
	currentIndex = category + num.toString();
	if (cards[currentIndex] != undefined) {
		index = currentIndex;
		document.getElementById('type').innerHTML = "Answer:";
		flipCard();
	} else {
		alert("There are no more cards in this deck!");
	}
}

//Shows previous card
function prevCard() {
	document.getElementById('compareBtn').style.visibility = 'hidden';
	document.getElementById('resultBtn').style.visibility = 'hidden';
	var currentIndex = index;
	var category = currentIndex.slice(0, -1);
	var num = currentIndex.slice(-1);
	num = parseInt(num);
	num -= 1;
	currentIndex = category + num.toString();
	if (cards[currentIndex] != undefined) {
		index = currentIndex;
		document.getElementById('type').innerHTML = "Answer:";
		flipCard();
	} else {
		alert("You have reached the beginning of this deck!");
	}
}

//Clears stack variable that is stored in local storage so that the main categories page can load
function clearArray() {
	var arr = sessionStorage.firebase;
    var data = JSON.parse(arr);
    for (var i = data.path.length - 1; i > 0; i--) {
        if (data.path[i] != 'categories') {
          	data.path.pop();
        }
    }
    sessionStorage.firebase = JSON.stringify(data);
    location.href = "index.html";
}

function setLoader() {
	var opts = {
	  lines: 13 // The number of lines to draw
	, length: 28 // The length of each line
	, width: 12 // The line thickness
	, radius: 42 // The radius of the inner circle
	, scale: 1 // Scales overall size of the spinner
	, corners: 1 // Corner roundness (0..1)
	, color: '#000000' // #rgb or #rrggbb or array of colors
	, opacity: 0 // Opacity of the lines
	, rotate: 0 // The rotation offset
	, direction: 1 // 1: clockwise, -1: counterclockwise
	, speed: 1.1 // Rounds per second
	, trail: 40 // Afterglow percentage
	, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	, zIndex: 2e9 // The z-index (defaults to 2000000000)
	, className: 'spinner' // The CSS class to assign to the spinner
	, top: '44%' // Top position relative to parent
	, left: '50%' // Left position relative to parent
	, shadow: false // Whether to render a shadow
	, hwaccel: false // Whether to use hardware acceleration
	, position: 'absolute' // Element positioning
	}
	var target = document.getElementById('loading');
	spinner = new Spinner(opts).spin(target);
}
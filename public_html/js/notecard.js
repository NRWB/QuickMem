/**
 * @function 
 * @public
 * @global
 * @returns NONE
 * @desc Function loads onclick button events.
 * @example NONE
 */
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

/**
 * @desc NONE
 * @global
 * @typedef {Object} Firebase
 */
var myFirebaseRef = new Firebase("https://quickmem.firebaseio.com/");

var isRead = [];
var currDiff = 3;

/**
 * @desc NONE
 * @global
 * @typedef
 */
var spinner;

/**
 * @desc NONE
 * @global
 * @typedef
 */
var pageData;

/**
 * @desc NONE
 * @global
 * @typedef
 */
var cards;

/**
 * @desc NONE
 * @global
 * @typedef
 */
var lower_topic;

/**
 * @desc NONE
 * @global
 * @typedef
 */
var index;

/**
 * @desc NONE
 * @global
 * @typedef
 */
var data = JSON.parse(localStorage.getItem('globalVar'));

/**
 * @desc NONE
 * @global
 * @typedef
 */
var lower_topic = data['subtopic'].toLowerCase();

/**
 * @function selectRating
 * @public
 * @global
 * @returns NONE
 * @desc <no current desc.>
 * @example NONE
 */
function selectRating() {
	console.log(this.value);
	fillStars(this.value);
	//reorderCards();
	document.getElementById('resultBtn').style.visibility = 'visible';
	document.getElementById('option').innerHTML = this.value;
	document.getElementById('compareBtn').style.visibility = 'visible';
}

/**
 * @function showCompare
 * @public
 * @global
 * @returns NONE
 * @desc <no current desc.>
 * @example NONE
 */
function showCompare() {
	document.getElementById('compareBtn').style.visibility = 'hidden';
	console.log(cards);
	var rating = document.getElementById('option').innerHTML;
	var card = cards[index];
	console.log(card);
	$('#graphModal').on('shown.bs.modal', function (e) {
	  var data = {
	    labels: ["Your rating", "Average rating"],
	    datasets: [
	        {
	            label: "My First dataset",
	            fillColor: "#427EEF",
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke: "rgba(220,220,220,1)",
	            data: [parseInt(rating), card.difficulty]
	        }
	    ]
		};
		var ctx = document.getElementById("myChart").getContext("2d");
		var myBarChart = new Chart(ctx).Bar(data);
	});
}

/**
 * @function initializeCard
 * @public
 * @global
 * @returns NONE
 * @desc Loads first card.
 * @example NONE
 */
function initializeCard() {
	myFirebaseRef.child("notecards/" + data['id']).once("value", function(snap) {
		currDiff = 3;
		isRead = [];
		index = lower_topic + "1";
		document.getElementById("title").innerHTML = data['subtopic'];
		console.log(snap.val());
		cards = snap.val();
		
		var i;
		for(i = 0; i < cards.length; i++){
			isRead.push(false);
		}
		
		document.getElementById('type').innerHTML = "Question:";
		document.getElementById('myModalLabel').innerHTML = "Question:";
		var newFront = cards[index].front.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/~~/g, "<br>");
		
		if (newFront.length > 200) {
			document.getElementById('note_content').innerHTML = newFront.substr(0, 200) + '...';	
		} else {
			document.getElementById('note_content').innerHTML = newFront;	
		}
		document.getElementById('modalBody').innerHTML = newFront;
	});
	console.log(spinner);
}

/**
 * @function flipCard
 * @public
 * @global
 * @returns NONE
 * @desc Flips card to reveal other side.
 * @example NONE
 */
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
			document.getElementById('myModalLabel').innerHTML = "Answer:";
			var newBack = back.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/~~/g, "<br>");
			if (newBack.length > 200) {
				document.getElementById('note_content').innerHTML = newBack.substr(0, 200) + '...';	
			} else {
				document.getElementById('note_content').innerHTML = newBack;	
			}
			document.getElementById('modalBody').innerHTML = newBack;
		} else {
			document.getElementById('type').innerHTML = "Question:";
			document.getElementById('myModalLabel').innerHTML = "Question:";
			var newFront = front.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/~~/g, "<br>");
			if (newFront.length > 200) {
				document.getElementById('note_content').innerHTML = newFront.substr(0, 200) + '...';	
			} else {
				document.getElementById('note_content').innerHTML = newFront;	
			}
			document.getElementById('modalBody').innerHTML = newFront;
		}
	}
}

/**
 * @function nextCard
 * @public
 * @global
 * @returns NONE
 * @desc Shows next card.
 * @example NONE
 */
function nextCard() {
	document.getElementById('compareBtn').style.visibility = 'hidden';
	document.getElementById('resultBtn').style.visibility = 'hidden';	
	var num = getNumIndex() + 1;
	var currentIndex = data['subtopic'].toLowerCase() + num.toString();
	if (cards[currentIndex] != undefined) {
		index = currentIndex;
		document.getElementById('type').innerHTML = "Answer:";
		clearStars();
		flipCard();
	} else {
		alert("There are no more cards in this deck!");
	}
}

/**
 * @function prevCard
 * @public
 * @global
 * @returns NONE
 * @desc Shows previous card.
 * @example NONE
 */
function prevCard() {
	document.getElementById('compareBtn').style.visibility = 'hidden';
	document.getElementById('resultBtn').style.visibility = 'hidden';
	var num = getNumIndex() - 1;
	var currentIndex = data['subtopic'].toLowerCase() + num.toString();
	if (cards[currentIndex] != undefined) {
		index = currentIndex;
		document.getElementById('type').innerHTML = "Answer:";
		clearStars();
		flipCard();
	} else {
		alert("You have reached the beginning of this deck!");
	}
}

/**
 * @function clearArray
 * @public
 * @global
 * @returns NONE
 * @desc Clears stack variable that is stored in local storage so that the main categories page can load.
 * @example NONE
 */
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

/**
 * @function setLoader
 * @public
 * @global
 * @returns NONE
 * @desc Used for the spinner feature.
 * @example NONE
 */
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

/**
 * @function reorderCards
 * @public
 * @global
 * @returns NONE
 * @desc Determines what card is the best match for the user, swaps it to become the next element,
 * @post Modifies currDiff, isRead
 * @param NONE
 * @example NONE
 */
 
 function reorderCards(feedBack){
	var temp = getNumIndex();
	// first, set the current card to read
	if(feedBack < currDiff){
		
	}
}

function getNumIndex(){
	var subtopic = data.subtopic.toLowerCase();
	var stringInt = index.replace(subtopic, "");
	stringInt = parseInt(stringInt);
	return stringInt;
}

function clearStars() {
	var starSpan = document.getElementById('rating').getElementsByTagName('label');
	console.log(starSpan);
	for (var i = starSpan.length - 1; i >= 0 ; i--) {
		console.log(starSpan[i]);
		starSpan[i].style.background = "url('http://kubyshkin.ru/samples/star-rating/star.png') 0 -16px";
	}
}

function fillStars(rating) {
	var starSpan = document.getElementById('rating').getElementsByTagName('label');
	console.log(starSpan);
	for (var i = starSpan.length - 1; i >= 0 ; i--) {
		console.log(starSpan[i]);
		console.log(starSpan[i].getAttribute('value'));
		if (starSpan[i].getAttribute('value') <= parseInt(rating)) {
			starSpan[i].style.background = "url('http://kubyshkin.ru/samples/star-rating/star.png') 0 0";
		} else {
			starSpan[i].style.background = "url('http://kubyshkin.ru/samples/star-rating/star.png') 0 -16px";
		}
	}
}
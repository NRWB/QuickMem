/**
 * @function 
 * @public
 * @global
 * @returns NONE
 * @desc Loads button click events and determines which data to load depending on stack contents.
 * @example NONE
 */
window.onload = function() {
	document.getElementById("myButton").onclick = clearArray;
	document.getElementById('searchBtn').onclick = whichSearch;

	if (!data || data.path[1] == undefined) {
		loadCategories();
	} else {
		toCategory(data.path[2]);
	}
}

/**
 * @desc NONE
 * @global
 * @typedef {Object} Firebase
 */
var myFirebaseRef = new Firebase("https://quickmem.firebaseio.com/");

/**
 * @desc NONE
 * @global
 * @typedef {Object} 
 */
var data = JSON.parse(sessionStorage.firebase);

/**
 * @function loadCategories
 * @public
 * @global
 * @returns NONE
 * @desc Loads and displays main categories.
 * @example NONE
 */
function loadCategories() {
	myFirebaseRef.child("categories").on("child_added", function(snapshot) {
    	console.log(snapshot.val());
		var topic = snapshot.val();
		var div = document.getElementById('buttonGroup');
		var a = document.createElement('a');
		a.className = "btn2 blue buttonsize";
		a.onclick = function() {
			// console.log(data);
			// data.path.push('subtopics');
			toCategory(topic);
		};
		a.innerHTML = topic;
		div.appendChild(a);
	});
}

/**
 * @function toCategory
 * @public
 * @global
 * @returns NONE
 * @desc Loads and displays subtopics depending on which category was selected.
 * @param {type} topic - Etc. Etc.
 * @example NONE
 */
function toCategory(topic) {
	var div = document.getElementById('buttonGroup');
	clearButtons(div);
	console.log(topic);
	var topic_lower = topic.toLowerCase();
	console.log(topic_lower);
	document.getElementById('title').innerHTML = topic;
	var path = "subtopics/" + topic;
	var i = 1;
	var dataTemp = {};
	dataTemp['path'] = [];
	dataTemp['path'].push('categories');
	dataTemp['path'].push('subtopics');
	dataTemp['path'].push(topic);
	console.log(dataTemp);
	sessionStorage.firebase = JSON.stringify(dataTemp);
	data = dataTemp;
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

/**
 * @function clearButtons
 * @public
 * @global
 * @returns NONE
 * @desc Clears buttons on page to make room for new buttons and new data.
 * @param {type} div - Etc. Etc.
 * @example NONE
 */
function clearButtons(div) {
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
}

/**
 * @function clearArray
 * @public
 * @global
 * @returns NONE
 * @desc Clears stack data so that the page can re-load main categories.
 * @example NONE
 */
function clearArray() {
    var arr = JSON.parse(sessionStorage.firebase);
    for (var i = arr.path.length - 1; i > 0; i--) {
        if (arr.path[i] != 'categories') {
          	arr.path.pop();
        }
    }
    sessionStorage.firebase = JSON.stringify(arr);
    data = arr;
    var div = document.getElementById('buttonGroup');
    clearButtons(div);
    document.getElementById('title').innerHTML = '';
    loadCategories();
}

/**
 * @function whichSearch
 * @public
 * @global
 * @returns NONE
 * @desc <no current desc.>
 * @example NONE
 */
function whichSearch() {
	console.log(data);
	if (!data || data.path[1] == undefined) {
		categorySearch();
	} else {
		console.log("not index");
	}
}

/**
 * @function categorySearch
 * @public
 * @global
 * @returns NONE
 * @desc <no current desc.>
 * @example NONE
 */
function categorySearch() {
	var text = document.getElementById('search').value;
	console.log(text);
	new Firebase("https://quickmem.firebaseio.com/").startAt(text).endAt(text).once('value', function(snap) {
		console.log(snap.val());
	});
}
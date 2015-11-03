var myFirebaseRef = new Firebase("https://quickmem.firebaseio.com/");
myFirebaseRef.child("categories").on("child_added", function(snapshot) {
	console.log(snapshot.val());  // Alerts "San Francisco"
	var div = document.getElementById('buttonGroup');
	var a = document.createElement('a');
	a.className = "btn2 blue buttonsize";
	a.innerHTML = snapshot.val();
	div.appendChild(a);
});
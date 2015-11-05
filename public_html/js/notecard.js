var myFirebaseRef = new Firebase("https://quickmem.firebaseio.com/");

myFirebaseRef.child("globalVar").on("value", function(snapshot) {
	console.log(snapshot.val());
});
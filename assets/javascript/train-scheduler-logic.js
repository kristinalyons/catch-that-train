// 1. Initialize Firebase
var config = {
	apiKey: "AIzaSyD8Qsa3QKavgEAlMQw-eJcxNBg8eKrp0TM",
	authDomain: "train-scheduler-fe936.firebaseapp.com",
	databaseURL: "https://train-scheduler-fe936.firebaseio.com",
	storageBucket: "",
	messagingSenderId: "808233314945"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#addTrainBtn").on("click", function() {

	//Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrainTime = $("#firstTrainTimeInput").val().trim();
	var frequency = $("#frequencyInput").val().trim();

// Creates local "temporary" object for holding train data
var newTrain = {
	name: trainName,
	dest: destination,
	first: firstTrainTime,
	freq: frequency,
}

// Uploads train data to the database
database.ref().push(newTrain);

// Logs everything to the console
console.log(newTrain.name);
console.log(newTrain.dest);
console.log(newTrain.first);
console.log(newTrain.freq);

// // Clears all of the text-boxes
// $("#trainNameInput").val("");
// $("#destinationInput").val("");
// $("#firstTrainTimeInput").val("");
// $("#frequencyInput").val("");

// Prevents moving to new page
return false;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry.
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().dest;
	var firstTrainTime = childSnapshot.val().first;
	var frequency = childSnapshot.val().freq;

	// Train Info
	console.log(trainName);
	console.log(destination);
	console.log(firstTrainTime);
	console.log(frequency);


	// Add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});

	// Assumptions
	var tFrequency = 3;
	var firstTime = "03:30"; // Time is 3:30 AM

		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % tFrequency;
		console.log(tRemainder);

		// Minutes Until Train
		var tMinutesTillTrain = tFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



	
//Intialize Firebase

var config = {

	apiKey: "AIzaSyAT9EQYisp7luwCft1N2Tjt_tI2HRkJQFk",
	authDomain: "train-scheduler-fb7c4.firebaseapp.com",
	databaseURL: "https://train-scheduler-fb7c4.firebaseio.com",
	projectId: "train-scheduler-fb7c4",
	storageBucket: "train-scheduler-fb7c4.appspot.com",
	messagingSenderId: "878002905721"

};

firebase.initializeApp(config);

//Create a variable to reference the database
var database = firebase.database();

var trainname = "";
var destination = "";
var firsttime = "";
var frequency = "";


$("#addtrains").on("click", function(event){
	event.preventDefault();

	trainname = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	firsttime = $("#firsttrain-input").val().trim();
	frequency = $("#frequency-input").val().trim();


	$("#train-input").val("");
	$("#destination-input").val("");
	$("#firsttrain-input").val("");
	$("#frequency-input").val("");

	database.ref().push({

		trainname: trainname,
		destination: destination,
		firsttime: firsttime,
		frequency: frequency

	});

});

    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      trainname = childSnapshot.val().trainname;
      destination = childSnapshot.val().destination
      firsttime = childSnapshot.val().firsttime;
      frequency = childSnapshot.val().frequency;

      var firsttimeMoment = moment(firsttime, "HH:mm");

      // It is Now - moment

      var currenttime = moment();

      var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');
      var minuteLast = minuteArrival % frequency;
      var awayTrain = frequency - minuteLast;
      var nextArrival = currenttime.add(awayTrain, 'minutes');
      var arrivaltime = nextArrival.format("HH:mm");

	$("#AddTrain").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

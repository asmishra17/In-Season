//linking document 

console.log("we are linked");
//1. Global vars and firebase set up

 //important note - for dev purposes I have removed authentication so we can test database connections / storage /updates ETC

 

var config = {
    apiKey: "AIzaSyC443Ww585g_rt44P6U4Wd0FM35APRuh2w",
    authDomain: "in-season-8f60b.firebaseapp.com",
    databaseURL: "https://in-season-8f60b.firebaseio.com",
    projectId: "in-season-8f60b",
    storageBucket: "in-season-8f60b.appspot.com",
    messagingSenderId: "865498629942"
  };


  firebase.initializeApp(config);


  var database = firebase.database();

  //global vars 
  var zipCode; 
  var searchQuery;
  var date;


  $("#login-button").prop("disabled", true);

  
  $("#I-agree").on("click", function() {
        console.log("I was clicked"); 
        $("#login-button").prop("disabled", false);
    



});

 

//start on-click function 

$("#login-button").on("click", function(event) {
    event.preventDefault();


    //get user email from input 
    var userEmail = $("#username-input").val().trim();


//store user history, make a new object per user 
    var newUser = {
        userEmail: userEmail,
       
    };

    //push to database
    database.ref().push(newUser);

    //log to console for testing purpose

    console.log(newUser.userEmail);

    //empty the text-boxes 
    // $("#username-input").val("");
    //show sign up sucess!
    $('#myModal').modal();

});


// 3 Firebase event for adding data when user submits an entry 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    //store in vars 
    var userName = childSnapshot.val().userName;

    //log to console 
    console.log(userName);       
});

 
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
var userCity;
var userDestination;
//empty object that we populate later 


var newUser = {};

  $("#login-button").prop("disabled", true);

  
  $("#I-agree").on("click", function() {
        console.log("I was clicked"); 
        $("#login-button").prop("disabled", false);
    



});

 

//start on-click function for login button 

$("#login-button").on("click", function(event) {
    event.preventDefault();


    //get user email from input 
    
    var userEmail = $("#username-input").val().trim();


//store user history, make a new object per user 
     newUser.userEmail = 'userEmail';

     console.log(newUser.userEmail);
         
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
    var userName = childSnapshot.val().userEmail;

    //log to console 
    console.log(userName);       
});

//4 on click event for Find an event button 

$("#search-travel-info").on("click", function() {
    //prevent page refresh
    event.preventDefault();
    
    //test correct thing selected 

    console.log("I've been clicked");
    // get user search history from input fields

    userCity = $("#origin").val().trim();

    console.log(userCity);

    userDestination = $("#destination").val().trim();

    console.log(userDestination);

    //add properties to the object 


    // newUser.userCity = 'userCity';
    // newUser.userDestination = 'userDestination';

    


    //push to database
    // database.ref().push(newUser.userCity);
    // database.ref().push(newUser.userDestination);
    
});
    //adding this data as child of newUser
// database.ref("newUser").on("child_added", function(childSnapshot, prevChildKey) {
//     console.log(childSnapshot.val());

//     //store in vars --fix this so firebase shows data, not just the properties
//     var city = childSnapshot.val().NewUser.userCity;
//     var eventType = childSnapshot.val().userDestination;

//     //log to console 
//     console.log(city);
//     console.log(eventType);       
// });
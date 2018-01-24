// Initialize Firebase 
//see code/logic.js 
//update to new HTML files(new Id's) etc 

var config = {
    apiKey: "AIzaSyCU-yA99WNdYCgzRAkr9JjLLUZfakW9O-E",
    authDomain: "in-season-v2.firebaseapp.com",
    databaseURL: "https://in-season-v2.firebaseio.com",
    projectId: "in-season-v2",
    storageBucket: "in-season-v2.appspot.com",
    messagingSenderId: "887481291696"
  };


  //here's a gloabl var for id 
  

  firebase.initializeApp(config);

//data base references 

//one on click has to go 


//username save to database
  var database = firebase.database();

$("#login").on("click", function() {
    console.log("I was clicked");
    userName = $("#username").val().trim();
    console.log(userName);
    if (userName !="") {
        var id = database.ref("/users").push({
            userName: userName
        }).key;
        console.log(id);
        localStorage.setItem("userid", id);
    }
});

database.ref("users/" + localStorage.getItem("userid"));  

//put this in button below 
var id = localStorage.getItem("userid");

//city name/eventType save to database
$("#search-travel-info").on("click", function() {
    var id = localStorage.getItem("userid");
    userCity = $("#origin").val().trim();
    console.log(userCity);
    if (userCity !="") {
        var city = database.ref("/users/" + id).push({
            userCity: userCity
        });
        console.log(userCity);
        localStorage.setItem("userCity", city);
    }    

});



    


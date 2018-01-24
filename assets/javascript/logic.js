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

    //may have to remove this  as userCity does not exist - can just use newZip I think
//city name/eventType save to database
// $("#search-travel-info").on("click", function() {
//     var id = localStorage.getItem("userid");
//     userCity = $("#origin").val().trim();
//     console.log(userCity);
//     if (userCity !="") {
//         var city = database.ref("/users/" + id).push({
//             userCity: userCity
//         });
//         console.log(userCity);
//         localStorage.setItem("userCity", city);
//     }    

// });

// new zip code saved  to database
$(".searchZip").on("click", function() {
    var id = localStorage.getItem("userid");    
    var newZip = $("#ZipCode").val().trim();
    console.log(newZip);
    if (newZip !="") {
        var newZip = database.ref("/users/" + id).push({
            newZip: newZip
        });
        console.log(newZip);
        localStorage.setItem("newZip", newZip);
    }
});

//save event type that they chose  -there's
$("#search-travel-info").on("click", function() {
    var id = localStorage.getItem("userid");        
    var eventType = $("#eventTypes option:selected").val();
    console.log(eventType);
    var eventType = database.ref("/users/" + id).push({
        eventType: eventType
    });
    console.log(eventType);
    localStorage.setItem("eventType", eventType);

});

//save the event they clicked on (just grabbing the text of it)
//there is a var called title in geolocation.js

$("li :active").on("click", function() {
    var id = localStorage.getItem("userid");        
    var eventText = $("h5 a").val();
    console.log(EventText);  
});







    


//linking document 

console.log("we are linked");
//1. Global vars and firebase set up

 //important note - for dev purposes I have removed authentication so we can test database connections / storage /updates ETC

 //next iteration - saving user history - this is a bigger problem to solve and will take more time

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

//2. store login info for the users  via login button 

$("#login-button").on("click", function(event) {
    event.preventDefault();

    //obtain user input 
    //next ieration - store user history - we can do this by adding on properties to the objectt

    var userName = $("#username-input").val().trim();
    var userPassWord = $("#password-input").val().trim();

    //let's put this in an object 

    var newUser = {
        userName: userName,
        passowrd: userPassWord
    };

    //push to database
    database.ref().push(newUser);

    //log to console for testing purpose

    console.log(newUser.userName);
    console.log(newUser.userPassWord);

    // here's a link to modals - https://getbootstrap.com/docs/3.3/javascript/#modals
    $("#login-modal").on("show.modal", function (event) {

    })


    //empty the text-boxes 
    $("#username-input").val("");
    $("password-input").val("");
});


// 3 Firebase event for adding data when user submits an entry 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    //store in vars 
    var userName = childSnapshot.val().userName;
    var userPassWord = childSnapshot.val().userPassWord;

    //log to console 
    console.log(userName);
    console.log(userPassWord);
});
//linking document 

console.log("we are linked");
//1. Global vars and firebase set up

 //important note - for dev purposes I have removed authentication so we can test database connections / storate /updates ETC

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

//2. store login info for the users  via login button (dummy credentials for login)

$("#login-button").on("click", function(event) {
    event.preventDefault();

    //obtain user input 

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
});



//linking document 
//tasks for wednesday/thurs - organize code better. make functions in scope. Fix logic for box checking and input forms

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

    //empty the text-boxes 
    $("#username-input").val("");
    $("password-input").val("");

    $('#myModal').modal();
});




    // //checking /unchecking box status
    // var checkboxes = $('input[name="agree"]');
    // console.log(checkboxes);
    // checkboxes.change(function () {
    //     var checked = $(this).prop('checked');
    //     console.log(checked);
    //     // if (checked === false) {
    //     //     $("#myModal").modal();
    //     //     $("#exampleModalLabel").text("Login Failure");
    //     //     $("#modal-body").text("You must agree to terms and conditions to continue.");
    //     // } else {
    //     //     $('#myModal').modal();
    //     // }
    // });




// 3 Firebase event for adding data when user submits an entry 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    //store in vars 
    var userName = childSnapshot.val().userName;
    var userPassWord = childSnapshot.val().userPassWord;

    //log to console 
    console.log(userName);
    console.log(userPassWord);

       

        //seeing if i can get chcked /unchecked first 
      // here's a link to modals - https://getbootstrap.com/docs/3.3/javascript/#modals
//    if (childSnapshot.val().userName != "" && childSnapshot.val().userPassWord != "") {
//     $('#myModal').modal();
   
//     } else {
//         $("#myModal").modal();
//         $("#exampleModalLabel").text("Login Failure");
//         $("#modal-body").text("login failed. Please complete all required fields.");
 
//     }
        //if modal data is not complete, prompt user to do that again.
});

 
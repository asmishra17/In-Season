//Working on On Click (User logs in and go to dashboard)
$("#login").on("click", function(){
    if($("#username").val() != "" && $("#password").val() != ""){
        location.href ="dashboard.html";
    } else {
        console.log('Invalid Entry');
    }
    console.log($("#password").val());
})

var yourCity;

// Using HTML GEOLOCATION API to grab user location 

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}


function showPosition(position) {
   console.log( "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude);
    var APIKey = "739b19c2f23e5d1f4b6dc5cd5bbed8a3";
    // var zipCode = position.address.postalCode;
    // console.log(zipCode);
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "zip=" + zipCode + ",us&units=imperial&appid=" + APIKey; 
    var queryURL ="https://api.openweathermap.org/data/2.5/weather?" + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + APIKey; 
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .done(function(response) {
        console.log(queryURL);
        console.log(response);
    
        $("#weatherHere").html("<h3>" + Math.round(response.main.temp*(9/5) -459.67) + " fahrenheit for your city " + response.name + " with " +response.weather[0].description + "</h3>");
        yourCity= response.name;
        console.log(yourCity);
        
    })
}


getLocation();





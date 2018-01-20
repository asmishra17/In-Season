//Working on On Click (User logs in and go to dashboard)
$("#login").on("click", function(){
    if($("#username").val() != "" && $("#password").val() != ""){
        location.href ="dashboard.html";
    } else {
        console.log('Invalid Entry');
    }
    console.log($("#password").val());
})

var yourZip;

// Using HTML GEOLOCATION API to grab user location 

function getLocation() {
    if (navigator.geolocation) {
        // //google maps api 
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

    var googleMapsApiKey= 'AIzaSyDTQu1tWssDBJYxtf0mIWkm4pXcqwVLfac'
    
    var googleMapsQueryUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude +','+ position.coords.longitude+'&key=' + googleMapsApiKey;
    console.log(googleMapsQueryUrl);

    $.ajax({
        url: googleMapsQueryUrl,
        method: "GET"
    })
    .done(function(response){
        console.log(response.results[0].address_components[7].long_name);
        yourZip= response.results[0].address_components[7].long_name;
        getEvent();
    })

    
}


getLocation();


function getEvent() {
    var object = $(this).attr('data-name');

    //var zipcode = $("#zipsubmit").val().trim();//
    
    // console.log(zipcode);
    var client_id = 'MTAyNzcyNTl8MTUxNjMyNTU2Ni44Ng';
    var client_secret = '79ca89a731467d450c77440a9935a1d70598fb17021b4a3101d6aa43da268231';
    var SeatGeekqueryURL = 'https://api.seatgeek.com/2/events?postal_code=' + yourZip + '&client_id=' + client_id + '&client_secret=' + client_secret;
    // var queryURL= 'https://api.seatgeek.com/2/events?postal_code=60646&client_id=MTAyNzcyNTl8MTUxNjMyNTU2Ni44Ng&client_secret=79ca89a731467d450c77440a9935a1d70598fb17021b4a3101d6aa43da268231';


    $.ajax({ 
        url: SeatGeekqueryURL, 
        method: 'GET' 
    })
    .done(function(response) {
        // $("#eventHere").html("<h1>" + response.main.zipcode + " events in your city " + response.name + "</h1>"); 
        console.log(SeatGeekqueryURL);
        console.log(response);
        $("#event-info").empty();
        for (var i=0; i < response.events.length;i++ ) {
            var newDiv = $("<div>");
            newDiv.html(response.events[i].short_title);
            $("#event-info").append(newDiv);
        }
    })
}







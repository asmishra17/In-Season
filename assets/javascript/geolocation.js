//Working on On Click (User logs in and go to dashboard)
$("#login").on("click", function(){
    if($("#username").val() != "" && $("#password").val() != ""){
        location.href ="dashboard.html";
    } else {
        console.log('Invalid Entry');
    }
    console.log($("#password").val());
})


// Using HTML GEOLOCATION API to grab user location 
var yourZip;
getLocation();

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
    var queryURL ="https://api.openweathermap.org/data/2.5/weather?" + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + APIKey; 
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .done(function(response) {
        console.log(queryURL);
        console.log(response); 
       console.log(response.weather[0].icon.charAt(2));
       var iconLetter =response.weather[0].icon.charAt(2);
       var weatherDescription = response.weather[0].main;

    //    Changing background color of Weather if it is day or night 
       if (iconLetter === "d") {
           $(".weather-container").addClass("dayWeather");
       } else if (iconLetter === "n"){
           $(".weather-container").addClass("nightWeather");
       }
    // changing Weather Icon given conditions
    if (weatherDescription === "Clear" && iconLetter === "d") {
        $(".weather-icons").html(`<div class="sunny col-md-6"></div>`);
    } else if (weatherDescription === "Clouds" || weatherDescription === "Mist" || weatherDescription === "Fog"){
        $(".weather-icons").html(`<div class="cloudy col-md-6"></div>`);
    } else if (weatherDescription === "Rain" || weatherDescription === "Drizzle"){
        $(".weather-icons").html(`<div class="rainy col-md-6"></div>`);
    } else if (weatherDescription === "Snow"){
        $(".weather-icons").html(`<div class="snowy col-md-6"></div>`);
    } else if (weatherDescription === "Clear" || iconLetter === "n") {
        $(".weather-icons").html(`<div class="starry col-md-6"></div>`);
    } else if (weatherDescription === "Thunderstorm"){
        $(".weather-icons").html(`<div class="stormy col-md-6"></div>`);
    }
    
        $("#weatherHere").html(`<h4 class="text-center center-block displayBottom"> ${Math.round(response.main.temp*(9/5) -459.67)} &deg F in ${response.name} with ${response.weather[0].description} </h4>`);
        // <img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png">
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
        $("#eventsinUserArea").html(`<div class="center-block text-center"><h3 class="teal-text teal-accent-4">Events in ${yourZip}</h3></div>`);

        $('#event-list').empty();

        for (var i=0; i < response.events.length;i++ ) {
            var title = response.events[i].short_title;
            var date = response.events[i].datetime_local.split("T")[0];
            var url = response.events[i].url;
            var newDiv = $('<li>');
            var titleDiv = $('<a target="_blank" href="' + url + '"><h5>' + title + '</h5></a>');
            var dateDiv = $('<h5>' + date + '</h5>');
            newDiv.append(titleDiv);
            newDiv.append(dateDiv)
                //newDiv.html(response.events[i].short_title);
            $("#event-list").append(newDiv);


        }
    })
}







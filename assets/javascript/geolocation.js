//Working on On Click (User logs in and go to dashboard)
$("#login").on("click", function(){
    if($("#username").val() != "" && $("#password").val() != ""){
        location.href ="dashboard.html";
    } else {
        console.log('Invalid Entry');
    }
    console.log($("#password").val());
})


var eventCategory;
var yourTemp;
var weatherDescription;
// Using HTML GEOLOCATION API to grab user location 
var yourZip;

// $(window).on("load", function(){
//     localStorage.removeItem("zipcode");
//     localStorage.removeItem("eventcategory");
// });



function storeZip(){
    localStorage.setItem("zipcode", yourZip);
}
yourZip= localStorage.getItem("zipcode");
callOpenWeatherbyZip(yourZip);
getEvent();


if(yourZip ==null){
    getLocation();
}

$(".searchZip").on("click", function(event){
    event.preventDefault();
    var newZip= $("#ZipCode").val();
    console.log(newZip);
    console.log(Number.isInteger(Number(newZip)));
    if (newZip.length ===5 && Number.isInteger(Number(newZip)) == true){
        //clear out any prior zipcodes stored
        localStorage.removeItem("zipcode");
        console.log(`zip code`);
        yourZip= newZip;
        localStorage.setItem("zipcode", newZip);
        localStorage.getItem("zipcode");
        getEvent();
        callOpenWeatherbyZip(yourZip);
        $('.cancel').click();
    } else{ 
        console.log(`not a zip code`);
        $(".modal-footer").html(`<p class="red-text text-center">Not a Valid Zip Code</p>`);
        setTimeout(function(){
            $(".modal-footer").empty();
        }, 3000);
    }
})

function getLocation() {
    if (navigator.geolocation) {
        // //google maps api 
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function callOpenWeatherbyZip(zip){
    var APIKey = "739b19c2f23e5d1f4b6dc5cd5bbed8a3";
    var ZipqueryURL = "https://api.openweathermap.org/data/2.5/weather?" + "zip=" + zip + ",us&units=imperial&appid=" + APIKey; 
    $.ajax({
        url: ZipqueryURL,
        method: "GET"
    })
    .done(function(response){
        console.log(ZipqueryURL);
        console.log(response); 
       console.log(response.weather[0].icon.charAt(2));
       var iconLetter =response.weather[0].icon.charAt(2);
       weatherDescription = response.weather[0].main;
       $(".weather-displays").text(`Today's Weather`);
       yourTemp= Math.round(response.main.temp);
       displayOutfit();

    //    Changing background color of Weather if it is day or night 
       if (iconLetter === "d") {
            $(".weather-container").removeClass("nightWeather");
           $(".weather-container").addClass("dayWeather");
       } else if (iconLetter === "n"){
            $(".weather-container").removeClass("dayWeather");
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
        
        $("#weatherHere").html(`<h5 class="text-center center-block displayBottom"> ${yourTemp} &deg F in ${response.name} with ${response.weather[0].description} </h5>`);

    });
}

function showPosition(position) {
   console.log( "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude);
    var APIKey = "739b19c2f23e5d1f4b6dc5cd5bbed8a3";
    var queryURL ="https://api.openweathermap.org/data/2.5/weather?" + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial&appid=" + APIKey; 
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .done(function(response) {
        console.log(queryURL);
        console.log(response); 
       console.log(response.weather[0].icon.charAt(2));
       var iconLetter =response.weather[0].icon.charAt(2);
       weatherDescription = response.weather[0].main;
       $(".weather-displays").text(`Today's Weather`);

    //    Changing background color of Weather if it is day or night 
       if (iconLetter === "d") {
            $(".weather-container").removeClass("nightWeather");
           $(".weather-container").addClass("dayWeather");
       } else if (iconLetter === "n"){
            $(".weather-container").removeClass("dayWeather");
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
        
        yourTemp=Math.round(response.main.temp);
        displayOutfit();
        $("#weatherHere").html(`<h5 class="text-center center-block displayBottom"> ${yourTemp} &deg F in ${response.name} with ${response.weather[0].description} </h5>`);
        // <img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png">
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
        storeZip();
        getEvent();
    })

    
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
           $("#weatherHere").html(`<div class="center-block text-center errorMessage"><h1>Sorry, we're experiencing a wardrobe malfunction.</h1> User denied the request for Geolocation. Maybe you were just not having it today. Try refreshing or use the location search bar to type in the Zip Code you will be in (or are wishful thinking of), ex: 90038 for Hollywood, CA. </div>`);
            break;
        case error.POSITION_UNAVAILABLE:
            $("#weatherHere").html(`<div class="center-block text-center errorMessage"><h1>Sorry, we're experiencing a wardrobe malfunction.</h1> Location information is unavailable. This link is either outdated, inaccurate, or the server is just not having it today. Try refreshing or use the location search bar to type in the Zip Code you will be in (or are wishful thinking of), ex: 90038 for Hollywood, CA. </div>`);
            break;
        case error.TIMEOUT:
            $("#weatherHere").html(`<div class="center-block text-center errorMessage"><h1>Sorry, we're experiencing a wardrobe malfunction.</h1> The request to get user location timed out. This link is either outdated, inaccurate, or the server is just not having it today. Try refreshing or use the location search bar to type in the Zip Code you will be in (or are wishful thinking of), ex: 90038 for Hollywood, CA. </div>`);
            break;
        case error.UNKNOWN_ERROR:
             $("#weatherHere").html(`<div class="center-block text-center errorMessage"><h1>Sorry, we're experiencing a wardrobe malfunction.</h1> This link is either outdated, inaccurate, or the server is just not having it today. Try refreshing or use the location search bar to type in the Zip Code you will be in (or are wishful thinking of), ex: 90038 for Hollywood, CA. </div>`);
            break;
    }
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
            var eventType= response.events[i].taxonomies[0].name;
            console.log(eventType);
            var newDiv = $('<li>');
            var titleDiv = $(`<a id="event" data-event="${eventType}" target="_blank" href="${url}"><h5>${title}</h5></a>`);
            var dateDiv = $('<h5>' + date + '</h5>');
            newDiv.append(titleDiv);
            newDiv.append(dateDiv)
                //newDiv.html(response.events[i].short_title);
            $("#event-list").append(newDiv);
        }
        $(document).on("click", "#event", function(){
            localStorage.removeItem("eventcategory");
            //get data attr
            eventCategory = $(this).attr("data-event");
            console.log("hello");
            console.log(eventCategory);
            //store event data 
            localStorage.setItem("eventcategory", eventCategory);
            location.href ="outfit.html";
        })
    })
}

function grabStoredItem(){
    var storedItem = localStorage.getItem("eventcategory");
    if (typeof storedItem == "string") {
        return storedItem;
    } else if (storedItem && storedItem.eventcategory){
        return JSON.parse(storedItem);
    }
}

//after event has been clicked and user is on outfit page get outfit
function displayOutfit(){
    var neweventCategory= grabStoredItem();
    if (neweventCategory == null || neweventCategory == undefined){
        neweventCategory = "concert";
    }
    console.log(neweventCategory);
    console.log(yourTemp);
    console.log(weatherDescription);
    if (weatherDescription=== "Rain" || weatherDescription ==="Drizzle" || weatherDescription=== "Thunderstorm"){
        $("#rainyday").html(`<div class="umbrellaimg"><img height="300" width="300" src="assets/images/Raining.png"><p> It's raining! Don't forget your umbrella!</p></div>`);
    }
  
    if (neweventCategory === "concert" && yourTemp < 60 && yourTemp>= 40){
        console.log('wear this');
        $("#outfit-display").html(`<img height="300" width="300" src="assets/images/ConcertCold.jpg">`)
    } else if (neweventCategory=== "concert" && yourTemp>=60 && yourTemp<= 65){
        console.log('all you need is a light jacket');
        $("#outfit-display").html(`<img height="300" width="300" src="assets/images/ConcertChilly.jpg">`)
    } else if (neweventCategory === "concert" && yourTemp> 65){
        console.log('go to lolla, because its hot');
        $("#outfit-display").html(`<img height="300" width="300" src="assets/images/ConcertWarm.jpg">`)
    } else if (neweventCategory === "concert" && yourTemp<40){
        console.log('too cold to go out to a concert');
        $("#outfit-display").html(` <div class="cold-decription"><img height="300" width="300" src="assets/images/ConcertCold.jpg"> <img height="300" width="300" src="assets/images/ItsCold.png"><p>It's pretty cold out. Stay bundled up if possible!</p></div>`);
    } else if (neweventCategory === "theater" && yourTemp<40){
        $("#outfit-display").html(`<img height="300" width="300" src="assets/images/TheaterCold.jpg"> <div class="cold-decription"> <img height="300" width="300" src="assets/images/ItsCold.png"><p>It's pretty cold out. Stay bundled up if possible!</p></div>`);
    } else if (neweventCategory === "theater" && yourTemp>=40 && yourTemp< 60){
        $("#outfit-display").html(`<img height="300" width="300" src="assets/images/TheaterCold.jpg">`);
    } else if (neweventCategory ==="theater" && yourTemp>= 60 && yourTemp <= 65){
        $("#outfit-display").html(`<img height="300" width="300" src="assets/images/TheaterChilly.jpg">`);
    } else if (neweventCategory === "theater" && yourTemp >65){
        $("#outfit-display").html(`<img height="300" width="300" src="assets/images/TheaterWarm.jpg">`);
    } else if (neweventCategory === "sports" && yourTemp <40){
        $("#outfit-display").html(`
            <div class="sports">
             <img height="300" width="300" src="assets/images/SportBasketball.jpg"> 
             <p>Grab your best sporting gear/sporting jersey and enjoy the game!</p>
            </div>
            <div class="cold-decription">
             <img height="300" width="300" src="assets/images/ItsCold.png">
             <p>It's pretty cold out. Stay bundled up if possible!</p><
            /div>`);
    } else if (neweventCategory ==="sports" && yourTemp>=40){
        $("#outfit-display").html(`
        <div class="sports">
            <img height="300" width="300" src="assets/images/SportBasketball.jpg"> 
            <p>Grab your best sporting gear/sporting jersey and enjoy the game!</p>
       </div>`);
    } else  if (yourTemp<40 && neweventCategory =="casual"){
        $("#outfit-display").html(`<img height="300" width="300" src="assets/images/CasualCold.jpg"> <div class="cold-decription"> <img height="300" width="300" src="assets/images/ItsCold.png"><p>It's pretty cold out. Stay bundled up if possible!</p></div>`);
    } else if (yourTemp>=40 && yourTemp<65 && neweventCategory =="casual"){
        $("#outfit-display").html(`<img height="300" width="300" src="assets/images/CasualChilly.jpg">`);
    } else if (yourTemp>=65 && neweventCategory =="casual"){
        $("#outfit-display").html(`<img height="300" width="300" src="assets/images/CasualWarm.jpg">`);
    }

    
}

$("#skipPage").on("click", function(){
    //display casual outfits given weather
    localStorage.removeItem("eventcategory");
    localStorage.setItem("eventcategory", "casual");
})

$("#search-travel-info").on("click", function(){
    localStorage.removeItem("eventcategory");
    var eventValue = $("#eventTypes").val();
    localStorage.setItem("eventcategory", eventValue);
    location.href ="outfit.html";
    displayOutfit();
})









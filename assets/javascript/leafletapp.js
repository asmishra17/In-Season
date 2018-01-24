function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

getLocation();

// on click for zip code button


function showPosition(position) {
    console.log( "Latitude: " + position.coords.latitude + 
     "<br>Longitude: " + position.coords.longitude);

     var mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYXNtaXNocmE5MyIsImEiOiJjamNta3NpOHUweGEwMzBzM3ZsN2N1Nmd4In0.Lafwt0paj0QE9tIjd31bCg'
}).addTo(mymap);

// google API to change zip codes to long/lat

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

function getEvent() {
    var object = $(this).attr('data-name');

    //var zipcode = $("#zipsubmit").val().trim();//
    
    // console.log(zipcode);
    var client_id = 'MTAyNzcyNTl8MTUxNjMyNTU2Ni44Ng';
    var client_secret = '79ca89a731467d450c77440a9935a1d70598fb17021b4a3101d6aa43da268231';
    var SeatGeekqueryURL = 'https://api.seatgeek.com/2/events?postal_code=' + yourZip + '&client_id=' + client_id + '&client_secret=' + client_secret;
    // var queryURL= 'https://api.seatgeek.com/2/events?postal_code=60646&client_id=MTAyNzcyNTl8MTUxNjMyNTU2Ni44Ng&client_secret=79ca89a731467d450c77440a9935a1d70598fb17021b4a3101d6aa43da268231';

    var location;
    var eventName;

    $.ajax({ 
        url: SeatGeekqueryURL, 
        method: 'GET' 
    })
    .done(function(response) {
        // $("#eventHere").html("<h1>" + response.main.zipcode + " events in your city " + response.name + "</h1>"); 
        console.log(SeatGeekqueryURL);
        console.log(response);
            //locationLat = response.events[i].venue.location.lat;
            //locationLon = response.events[i].venue.location.lon;

            //location = `${response.events[i].venue.location.lat}, ${response.events[i].venue.location.lon}`;

            var marker0 = L.marker([response.events[0].venue.location.lat, response.events[0].venue.location.lon]).addTo(mymap);
            marker0.bindPopup(`<b>${response.events[0].title}</b><br>${response.events[0].venue.name}`).openPopup();
         
            var marker1 = L.marker([response.events[1].venue.location.lat, response.events[1].venue.location.lon]).addTo(mymap);
            marker1.bindPopup(`<b>${response.events[1].title}</b><br>${response.events[1].venue.name}`).openPopup();

            var marker2 = L.marker([response.events[2].venue.location.lat, response.events[2].venue.location.lon]).addTo(mymap);
            marker2.bindPopup(`<b>${response.events[2].title}</b><br>${response.events[2].venue.name}`).openPopup();

            var marker3 = L.marker([response.events[3].venue.location.lat, response.events[3].venue.location.lon]).addTo(mymap);
            marker3.bindPopup(`<b>${response.events[3].title}</b><br>${response.events[3].venue.name}`).openPopup();

            var marker4 = L.marker([response.events[4].venue.location.lat, response.events[4].venue.location.lon]).addTo(mymap);
            marker4.bindPopup(`<b>${response.events[4].title}</b><br>${response.events[4].venue.name}`).openPopup();

            var marker5 = L.marker([response.events[5].venue.location.lat, response.events[5].venue.location.lon]).addTo(mymap);
            marker5.bindPopup(`<b>${response.events[5].title}</b><br>${response.events[5].venue.name}`).openPopup();

            var marker6 = L.marker([response.events[6].venue.location.lat, response.events[6].venue.location.lon]).addTo(mymap);
            marker6.bindPopup(`<b>${response.events[6].title}</b><br>${response.events[6].venue.name}`).openPopup();

            var marker7 = L.marker([response.events[7].venue.location.lat, response.events[7].venue.location.lon]).addTo(mymap);
            marker7.bindPopup(`<b>${response.events[7].title}</b><br>${response.events[7].venue.name}`).openPopup();

            var marker8 = L.marker([response.events[8].venue.location.lat, response.events[8].venue.location.lon]).addTo(mymap);
            marker8.bindPopup(`<b>${response.events[8].title}</b><br>${response.events[8].venue.name}`).openPopup();

            var marker9 = L.marker([response.events[9].venue.location.lat, response.events[9].venue.location.lon]).addTo(mymap);
            marker9.bindPopup(`<b>${response.events[9].title}</b><br>${response.events[9].venue.name}`).openPopup();

            var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap);
            marker.bindPopup("<b>Hello!</b><br>You are here").openPopup();

    })
}



}


// Open Weather Map API key = 739b19c2f23e5d1f4b6dc5cd5bbed8a3;
// Map Box API key = pk.eyJ1IjoiYXNtaXNocmE5MyIsImEiOiJjamNta3NpOHUweGEwMzBzM3ZsN2N1Nmd4In0.Lafwt0paj0QE9tIjd31bCg;
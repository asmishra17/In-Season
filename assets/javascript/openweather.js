var APIKey = "739b19c2f23e5d1f4b6dc5cd5bbed8a3";
var zipCode = 60616;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "zip=" + zipCode + ",us&units=imperial&appid=" + APIKey; 

$.ajax({
    url: queryURL,
    method: "GET"
})

.done(function(response) {
    console.log(queryURL);
    console.log(response);

    $("#weatherHere").html("<h3>" + response.main.temp + " fahrenheit" + "</h3>");
})


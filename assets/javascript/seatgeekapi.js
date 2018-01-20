// function getEvent() {
//     var object = $(this).attr('data-name');

//     //var zipcode = $("#zipsubmit").val().trim();//
//     var zipcode = 60646;
//     console.log(zipcode);
//     var client_id = 'MTAyNzcyNTl8MTUxNjMyNTU2Ni44Ng';
//     var client_secret = '79ca89a731467d450c77440a9935a1d70598fb17021b4a3101d6aa43da268231';
//     var SeatGeekqueryURL = 'https://api.seatgeek.com/2/events?postal_code=' + zipcode + '&client_id=' + client_id + '&client_secret=' + client_secret;
//     // var queryURL= 'https://api.seatgeek.com/2/events?postal_code=60646&client_id=MTAyNzcyNTl8MTUxNjMyNTU2Ni44Ng&client_secret=79ca89a731467d450c77440a9935a1d70598fb17021b4a3101d6aa43da268231';


//     $.ajax({ 
//         url: SeatGeekqueryURL, 
//         method: 'GET' 
//     })
//     .done(function(response) {
//         // $("#eventHere").html("<h1>" + response.main.zipcode + " events in your city " + response.name + "</h1>"); 
//         console.log(SeatGeekqueryURL);
//         console.log(response);
        
//         for (var i=0; i < response.events.length;i++ ) {
//             var newDiv = $("<div>");
//             newDiv.html(response.events[i].short_title);
//             $("#event-info").append(newDiv);
//         }
//     })
// }

// getEvent();
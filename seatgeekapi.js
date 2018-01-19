function getEvent() {
    var object = $(this).attr('data-name');

    //var zipcode = $("#zipsubmit").val().trim();//
    var zipcode = 60646;
    console.log(zipcode);
    var client_id = 'MTAyNzcyNTl8MTUxNjMyNTU2Ni44Ng';
    var client_secret = '79ca89a731467d450c77440a9935a1d70598fb17021b4a3101d6aa43da268231';
    var queryURL = 'https://api.seatgeek.com/2/events?postal_code=' + zipcode + '&client_id=' + client_id + '&client_secret' + client_secret;


    $.ajax({ url: queryUTL, method: 'GET' }).done(function(response) {})
}
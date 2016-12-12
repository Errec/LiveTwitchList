$(document).ready(function() {
  var channel = ["ESL_SC2", "OgamingSC2", "freecodecamp", "captainsparklez", "Nightblue3", "riotgames", "syndicate", "garenatw"];

// var channel = ["ESL_SC2"];

  console.log('https://wind-bow.gomix.me/twitch-api/streams/ESL_SC2'); // REMOVE
  console.log('https://wind-bow.gomix.me/twitch-api/channels/ESL_SC2'); // REMOVE


  var liID;
  $("li").click(function() {
    if (this.id !== liID) {
      $('#' + liID).css("background-color", "#6441A5");
      $(this).css("background-color", "#3B2064");
      liID = this.id;
    }
  });


  for (var i = 0; i < channel.length; i++) {
    Request('streams', channel[i], i);
    Request('channels', channel[i], i);
  }
});

function Request(APItype, channel, i) {
  var URL = 'https://wind-bow.gomix.me/twitch-api/' + APItype + '/';
  $.ajax({
    url: URL + channel,
    type: 'GET',
    dataType: 'jsonp',
    success: function(data) {
      AppendChannelInfo(data, APItype, channel, i);
    }
  });
}

function AppendChannelInfo(data, APItype, channel, i) {
  if (APItype === "streams") {
    if (data.stream !== null) {

    }
  } else {
      $("#item-" + i + " img").attr('src', data.logo);
      $("#item-" + i + " h4").text(data.display_name);
  }
}

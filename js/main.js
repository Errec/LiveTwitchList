$(document).ready(function() {
  var channel = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

console.log('https://wind-bow.hyperdev.space/twitch-api/streams/ESL_SC2'); // REMOVE
console.log('https://wind-bow.hyperdev.space/twitch-api/channels/ESL_SC2'); // REMOVE

  for (var i = 0; i < channel.length; i++) {
    Request('streams', channel[i], i);
    Request('channels', channel[i], i);
  }
});

function Request(APItype, channel, i) {
  var URL = 'https://wind-bow.hyperdev.space/twitch-api/' + APItype + '/';
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
      $(".item-" + i + " h3").text(data.stream.game);
      $(".item-" + i + " p").text(data.stream.channel.status);
    } else {
      $(".item-" + i + " h3").text('offline');
    }
  } else {
      $(".item-" + i + " a").attr('href', data.url);
      $(".item-" + i + " img").attr('src', data.logo);
  }
}

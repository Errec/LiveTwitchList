$(document).ready(function(){
  var channel = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  for (var i = 0; i < channel.length; i++) {
    Request(channel[i]);
  }
});

function Request(channel){
  var URL = 'https://wind-bow.hyperdev.space/twitch-api/streams/';
  $.ajax({
    url: URL + channel,
    type: 'GET',
    dataType: 'jsonp',
    success: function(data){
      AppendChannelInfo(data, channel);
    }
  });
}

function AppendChannelInfo(data, channel) {
  if (data.stream !== null) {
    $(".container").append('<h3>' + data.stream.game + '<p>' + data.stream.channel.status+ '</p></h3>');
  } else {
    $(".container").append('<h3>' + channel + ' not streaming</h3>');
  }
}

$(document).ready(function(){
  var channel = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var URL = 'https://wind-bow.hyperdev.space/twitch-api/streams/';

  for (var i = 0; i < channel.length; i++) {
    console.log(URL + channel[i] + '?callback=?');
  }
});

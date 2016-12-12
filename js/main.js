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
      $(".content").css('background-image', 'none');
      Request('setOnlineContent', 'streams', channel[liID.slice(-1)], liID.slice(-1));
      Request('setChannelInfo', 'channels', channel[liID.slice(-1)], liID.slice(-1));
    }
  });


  for (var i = 0; i < channel.length; i++) {
    Request('setSideBar', 'channels', channel[i], i);
    Request('checkStatus', 'streams', channel[i], i);
  }
});

function Request(type, APItype, channelName, i) {
  var URL = 'https://wind-bow.gomix.me/twitch-api/' + APItype + '/';
  $.ajax({
    url: URL + channelName,
    type: 'GET',
    dataType: 'jsonp',
    success: function(data) {
      switch (type) {
        case 'setSideBar':
          SetSideBar(data, i);
          break;
        case 'setOnlineContent':
          if (data.stream !== null) {
            SetStreamStatus(data);
          } else{
            $(".game").text("Channel Off line");
          }
          break;
        case 'setChannelInfo':
          SetChannelInfo(data);
          break;
        case 'checkStatus':
          if (data.stream !== null) {
            $("#item-" + i + " .status-bar").css("background-color", "#4CAF52");
          }
          break;
      }
    }
  });
}

function SetSideBar(data, i) {
  $("#item-" + i + " img").attr('src', data.logo);
  $("#item-" + i + " h4").text(data.display_name);
}

function SetStreamStatus(data) {
  $(".game").text("Streaming: " + data.stream.game);
}

function SetChannelInfo(data) {
    $(".followers").text("Channel Followers: " + data.followers);
    $(".views").text("Channel Views: " + data.views);
    $(".content-header").css('background-image', 'url(' + data.profile_banner + ')');
    $(".content-body").css('background-image', 'url(' + data.video_banner + ')');
}

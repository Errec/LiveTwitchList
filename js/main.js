$('button').hide();
$('.game').hide();
$(document).ready(function() {
  var channel = ["ESL_SC2", "OgamingSC2", "freecodecamp", "captainsparklez", "Nightblue3", "riotgames", "syndicate", "garenatw"];

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
            SetOnlineContent(data);
          } else{
            Request('setOfflineContent', 'channels', channelName, i);
          }
          break;
        case 'setOfflineContent':
          SetOfflineContent(data);
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

function SetOfflineContent(data) {
  $('.btn-off').show();
  $('.btn-watch').hide();
  $(".game").hide();
  $(".content-header").css('background-image', 'url(' + data.profile_banner + ')');
  $(".content-body").css('background-image', 'url(' + data.video_banner + ')');
}

function SetOnlineContent(data) {
  $(".content-header").css('background-image', 'url(' + data.stream.channel.profile_banner + ')');
  $(".content-body").css('background-image', 'url(' + data.stream.preview.large + ')');
  $('.btn-watch').attr('onclick', 'window.open("' + data.stream.channel.url + '");');
  $('.btn-watch').show();
  $('.btn-off').hide();
  $(".game").text("Streaming : " + data.stream.game);
  $(".game").show();
}

$(document).ready(function() {
  var liID;
  var channel = ["ESL_SC2", "OgamingSC2", "freecodecamp", "captainsparklez", "Nightblue3", "riotgames", "syndicate"];

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
          CheckStatus(data, i);
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
  $('.online-content').css('display', 'none');
  $('.offline-content').css('display', 'block');
  $(".game").hide();
  $(".content-header").css('background-image', 'url(' + data.profile_banner + ')');
  $(".content-body").css('background-image', 'url(' + data.video_banner + ')');
}

function SetOnlineContent(data) {
  $(".content-header").css('background-image', 'url(' + data.stream.channel.profile_banner + ')');
  $(".content-body").css('background-image', 'url(' + data.stream.preview.large + ')');
  $('.btn-watch').attr('onclick', 'window.open("' + data.stream.channel.url + '");');
  $('.online-content').css('display', 'block');
  $('.offline-content').css('display', 'none');
  $(".game").text("Streaming : " + data.stream.game);
  $(".game").show();
}

function CheckStatus(data, i){
  if (data.stream !== null) {
    $("#item-" + i + " .status-bar").css("background-color", "#4CAF52");
    $("#item-" + i + " .status-bar").attr("data-status", "online");
  } else {
      $("#item-" + i + " .status-bar").css("background-color", "#F42206");
      $("#item-" + i + " .status-bar").attr("data-status", "offline");
    }
}

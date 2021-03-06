$(document).ready(function() {
  var liID;
  var channel = ["ESL_SC2", "pokemontcg", "freecodecamp", "adobe", "Nightblue3", "somuchmonsters", "williamchyr", "triplegzgaming"];

  $('form input').on('change', function() {
    $(".content").css('background-image', 'url("/img/my-logo2.png")');
    $(".online-content").hide();
    $(".offline-content").hide();
    $('li').css('background-color', '#CCD0D4');
    $(".content-body").css('background-image', 'none');
    $(".content-header").css('background-image', 'none');
    console.log(liID);
    liID = null;
    console.log(liID);
    FilterListItem($('input:checked').val());
  });

  $("li").click(function() {
    if (this.id !== liID || liID !== null) {
      liID = SelectCurrentContent(this, liID, channel);
    }
  });

  for(var i = 0; i < channel.length; i++) {
    Request('setSideBar', 'channels', channel[i], i);
    Request('checkStatus', 'streams', channel[i], i);
  }
});

function FilterListItem(status) {
  switch (status) {
    case 'online':
      $( "li" ).each(function() {
        if ($(this).children(".status-bar").attr('data-status') === 'offline') {
          $(this).css('display','none');
        } else {
            $(this).css('display','flex');
          }
      });
      break;
    case 'offline':
      $( "li" ).each(function() {
        if ($(this).children(".status-bar").attr('data-status') === 'online') {
          $(this).css('display','none');
        } else {
            $(this).css('display','flex');
          }
      });
      break;
    case 'all':
      $( "li" ).each(function() {
          $(this).css('display','flex');
      });
      break;
  }
}

function SelectCurrentContent(currentLi, liID, channel) {
  $('#' + liID).css("background-color", "#CCD0D4");
  $(currentLi).css("background-color", "#A6A9AB");
  liID = currentLi.id;
  $(".content").css('background-image', 'none');
  Request('setOnlineContent', 'streams', channel[liID.slice(-1)], liID.slice(-1));

  return liID;
}

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
  if (data.error) {
    $("#item-" + i).remove();
  } else {
    $("#item-" + i + " img").attr('src', data.logo);
    $("#item-" + i + " h4").text(data.display_name);
  }
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

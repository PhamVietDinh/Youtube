$(document).ready(function(){

  var myPlaylist = new jPlayerPlaylist({
    jPlayer: "#jplayer_N",
    cssSelectorAncestor: "#jp_container_N"
  }, [
    {
      title:"Busted Chump",
      artist:"ADG3",
      mp3:"http://flatfull.com/themes/assets/musics/adg3com_bustedchump.mp3",
      poster: "../static/images/m0.jpg"
    },
    {
      title:"Chucked Knuckles",
      artist:"3studios",
      mp3:"http://flatfull.com/themes/assets/musics/adg3com_chuckedknuckles.mp3",
      poster: "../static/images/m0.jpg"
    },
    {
      title:"Cloudless Days",
      artist:"ADG3 Studios",
      mp3:"http://flatfull.com/themes/assets/musics/adg3com_cloudlessdays.mp3",
      poster: "../static/images/m0.jpg"
    },
    {
      title:"Core Issues",
      artist:"Studios",
      mp3:"http://flatfull.com/themes/assets/musics/adg3com_coreissues.mp3",
      poster: "../static/images/m0.jpg"
    },
    {
      title:"Cryptic Psyche",
      artist:"ADG3",
      mp3:"http://flatfull.com/themes/assets/musics/adg3com_crypticpsyche.mp3",
      poster: "../static/images/m0.jpg"
    },
    {
      title:"Electro Freak",
      artist:"Studios",
      mp3:"http://flatfull.com/themes/assets/musics/adg3com_electrofreak.mp3",
      poster: "../static/images/m0.jpg"
    },
    {
      title:"Freeform",
      artist:"ADG",
      mp3:"http://flatfull.com/themes/assets/musics/adg3com_freeform.mp3",
      poster: "../static/images/m0.jpg"
    }
  ], {
    playlistOptions: {
      enableRemoveControls: true,
      autoPlay: true
    },
    swfPath: "js/jPlayer",
    supplied: "webmv, ogv, m4v, oga, mp3",
    smoothPlayBar: true,
    keyEnabled: true,
    audioFullScreen: false
  });
  
  $(document).on($.jPlayer.event.pause, myPlaylist.cssSelector.jPlayer,  function(){
    $('.musicbar').removeClass('animate');
    $('.jp-play-me').removeClass('active');
    $('.jp-play-me').parent('li').removeClass('active');
  });

  $(document).on($.jPlayer.event.play, myPlaylist.cssSelector.jPlayer,  function(){
    $('.musicbar').addClass('animate');
  });

  $(document).on('click', '.jp-play-me', function(e){
    e && e.preventDefault();
    var $this = $(e.target);
    if (!$this.is('a')) $this = $this.closest('a');

    $('.jp-play-me').not($this).removeClass('active');
    $('.jp-play-me').parent('li').not($this.parent('li')).removeClass('active');

    $this.toggleClass('active');
    $this.parent('li').toggleClass('active');
    if( !$this.hasClass('active') ){
      myPlaylist.pause();
    }else{
      var i = Math.floor(Math.random() * (1 + 7 - 1));
      myPlaylist.play(i);
    }
    
  });



  // video
/*
  $("#jplayer_12").jPlayer({
    ready: function () {
      $(this).jPlayer("setMedia", {
        title: "Big Buck Bunny",
        m4v: "https://lh3.googleusercontent.com/Ht6yZHOH1HBq4CaMWt0KVM1xAe-GhD0iXWRsTvv-b-lYj8ndpVRPsiAWpo9op0kMXvCVz3y_lG4=m18",
        ogv: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.ogv",
        webmv: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.webm",
        poster: "../static/images/m41.jpg"
      });
    },
    swfPath: "js",
    supplied: "m4v, webmv, ogv",
    size: {
      width: "100%",
      height: "auto",
      cssClass: "jp-video-360p"
    },
    globalVolume: true,
    smoothPlayBar: true,
    keyEnabled: true
  });
*/
//video youtube
$(function() {
  /* Load jPlayer */
   new jPlayerPlaylist({
			jPlayer: "#jplayer_1",
			cssSelectorAncestor: "#jp_video_container"
		}, [
			{
				type: "youtube", /* <- Remember to add this */
				title: "Finding Dory - Youtube",
				m4v:"https://www.youtube.com/watch?v=WTAt_YVfo3U",
			}
		], {
			playlistOptions: {
		    	autoPlay: true
       		},
			supplied: "m4v",
			smoothPlayBar: true,
			keyEnabled: false,
		});

	/* Youtube Integration Setup */
	var setupYoutube = function(whereDivTo, width, height) {
		$("<div>").attr("id", "ytplayer").appendTo(whereDivTo);

		onYouTubeIframeAPIReady = function() {
	 		youtubeApi = new YT.Player("ytplayer", {
				width: "100%",
				height: "100%",
        videoId: "cfLob5IYMp8",
				playerVars: {
					"autoplay": 1,
					"color": "white",
					"modestbranding": 1,
					"rel": 0,
					"showinfo": 0,
					"theme": "light"
				},
				events: {
					"onReady": function() {
						$(document).trigger("ready.Youtube");
					},
					"onStateChange": "youtubeStateChange"
				}
			});
	 	}

 		$.getScript("//www.youtube.com/player_api");
	},
	loadYoutubeListeners = function(player, jplayer, id) {
		var container = $(player.options.cssSelector.gui, player.options.cssSelectorAncestor);

		youtubeStateChange = function(ytEvent) {
 			switch(ytEvent.data) {
 				case -1:
 					$(ytEvent.target.getIframe()).show();
 					$(jplayer).find('video').hide();
				 	container.css({ 'opacity' : 0, 'z-index': -1, 'position' : 'relative' });
				 	container.find('.jp-interface').slideUp("slow");
 				break;

 				case YT.PlayerState.ENDED:
 					$(jplayer).trigger($.jPlayer.event.ended);
 				break;

 				case YT.PlayerState.CUED:
 					$(jplayer).find('video').show();
 					$(ytEvent.target.getIframe()).hide();
 					container.css({ 'opacity' : 1, 'z-index': 0 });
 					container.find('.jp-interface').slideDown("slow");

 			}
		};

 		youtubeApi.loadVideoById(id);
	}

	$(document).on($.jPlayer.event.setmedia, function(jpEvent) {
		var player = jpEvent.jPlayer,
			url = player.status.src;

		if(!player.html.video.available) return;
	 	if(typeof player.status.media.type === "undefined" || player.status.media.type != 'youtube') {
	 		if(window['youtubeApi'])
	 			if(youtubeApi.getPlayerState() != YT.PlayerState.CUED && youtubeApi.getPlayerState() != YT.PlayerState.ENDED)
					return youtubeApi.stopVideo();

	 		return;
	 	}

	 	var youtubeId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1]

		if(window['youtubeApi'])
			loadYoutubeListeners(player, jpEvent.target, youtubeId);
		else {
			setupYoutube(jpEvent.target, player.status.width, player.status.height);

		 	$(document).on("ready.Youtube", function() {
		 		loadYoutubeListeners(player, jpEvent.target, youtubeId);
		 	});
		}
	});
	  $('#jplayer_1').attr('style','height: 388px; width:100%;');
});

});
	(function (youtube, $, undefined) {
	var player;
	var iframe;

	var playerReady = false;
	var currentVideoId;

	var playerHeight = "100%";

	youtube.getMediaHandler = function (media) {

		if (!media.youtubeVideoId)
			return null;

		media.play = function () {
			youtube.play(media.youtubeVideoId);
		};

		media.pause = function () {
			youtube.pause();
		};

		media.resume = function () {
			youtube.resume();
		};

		return media;
	},

	youtube.start = function () {
		var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/player_api';
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		iframe = document.createElement('iframe');
		iframe.id = 'youtube';
		//iframe.frameBorder = '0';
		//iframe.style.position = 'fixed';
		////iframe.style.marginTop = '32%';
		////iframe.style.zIndex = '1000';
		//iframe.style.marginLeft = '31%';
		//iframe.style.visibility = 'hidden';
		//iframe.width = '38%';
		iframe.height = playerHeight;
		iframe.src = 'https://www.youtube.com/embed?controls=0&amp;enablejsapi=1&amp;showinfo=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;disablekb=1';
		document.body.appendChild(iframe);
	};

	youtube.play = function (videoId) {
		currentVideoId = videoId;

		if (playerReady) {
			player.loadVideoById(videoId);
			$("#youtube").height(playerHeight);
			$("#youtube").css('visibility', 'visible');
		}
	};

	youtube.pause = function () {
		$("#youtube").css('visibility', 'hidden');
		$("#youtube").height(0);
		player.pauseVideo();
	};

	youtube.resume = function () {
		player.playVideo();
		$("#youtube").height(playerHeight);
		$("#youtube").css('visibility', 'visible');
	};

	youtube.onFinished = function () { };

	window.onYouTubePlayerAPIReady = function () {
		player = new YT.Player('youtube',
		{
			events:
			{
				onReady: function (event) {
					event.target.setVolume(100);
					playerReady = true;
					if (currentVideoId) {
					    player.cueVideoById(currentVideoId);
					    $("#youtube").css('visibility', 'visible');
                    } else {
						$("#youtube").css('visibility', 'hidden');
						$("#youtube").height(0);
					}
				},
				onStateChange: function (e) {
					if (e.data == YT.PlayerState.ENDED) {
						$("#youtube").css('visibility', 'hidden');
						$("#youtube").height(0);
						youtube.onFinished();
					}
				},
				onError: function (e) {
					console.log('YouTube onError: ' + e.data);
					youtube.onFinished();
				}
			}
		});
	}
} (window.partyMachineYoutube = window.partyMachineYoutube || {}, jQuery));

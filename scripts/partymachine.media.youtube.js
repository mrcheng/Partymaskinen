	(function (youtube, $, undefined) {
	var player;
	var iframe;

	var playerReady = false;
	var currentVideoId;

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
		tag.src = 'http://www.youtube.com/player_api';
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		iframe = document.createElement('iframe');
		iframe.id = 'youtube';
		iframe.frameBorder = '0';
		iframe.style.position = 'absolute';
		iframe.style.marginTop = '38%';
		//iframe.style.zIndex = '-1000';
		iframe.style.marginLeft = '20%';
		iframe.style.visibility = 'hidden';
		iframe.width = '60%';
		iframe.height = '30%';
		iframe.src = 'http://www.youtube.com/embed?controls=0&amp;enablejsapi=1&amp;showinfo=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;disablekb=1';
		document.body.appendChild(iframe);
	};

	youtube.play = function (videoId) {
		currentVideoId = videoId;

		if (playerReady) {
			player.loadVideoById(videoId);
			iframe.style.visibility = 'visible';
		}
	};

	youtube.pause = function () {
		iframe.style.visibility = 'hidden';
		player.pauseVideo();
	};

	youtube.resume = function () {
		player.playVideo();
		iframe.style.visibility = 'visible';
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
					if (currentVideoId)
						youtube.play(currentVideoId);
				},
				onStateChange: function (e) {
					console.log('onStateChange: ' + e.data);
					if (e.data == YT.PlayerState.ENDED) {
						iframe.style.visibility = 'hidden';
						youtube.onFinished();
					}
				},
				onError: function (e) {
					console.log('onError: ' + e.data);
					youtube.onFinished();
				}
			}
		});
	}
} (window.partyMachineYoutube = window.partyMachineYoutube || {}, jQuery));

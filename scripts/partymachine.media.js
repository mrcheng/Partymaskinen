(function (mediaManager, youtubePlayer, soundPlayer, $, undefined) {
	var _media = [];
	var _players = [];

	var _currentMedia;
	
	function getCurrentSongHtml(currentMedia, nextMedia) {
		var nextMediaHtml = '';

		if (nextMedia) {
			nextMediaHtml = '<p class="next-song">Nästa låt: ' + nextMedia.title + '</p>';
		}

		$('.current-media-title').html('<h2>' + currentMedia.title + '</h2>');

		var html = '<li><a id="' + currentMedia.id + '" href="' + currentMedia.url + '">'
			+ currentMedia.title + '<span class="created-by"> by ' + currentMedia.createdBy.name + '</span>'
			+ nextMediaHtml
			+ '</a></li>';

		return html;
	};

	function getPlayer(media) {

		for (var p = 0; p < _players.length; p++) {
			var player = _players[p];

			var mediaHandler = player.getMediaHandler(media);

			if (mediaHandler !== null) {
				console.log("found player for media: " + media.title + ", id: " + media.id + ", url: " + media.url);

				return mediaHandler;
			}
		}

		console.log("no player found for media: " + media.title + ", id: " + media.id + ", url: " + media.url);

		return null;
	}

	mediaManager.pause = function () {

		var mediaPlayer = getPlayer(currentMedia);

		mediaPlayer.pause();
	};

	mediaManager.resume = function () {

		var mediaPlayer = getPlayer(currentMedia);

		mediaPlayer.resume();
	};

	function getPlayableMedia() {

		if (_media.length <= 0) {
			return null;
		}

		var currentMediaIndex = 0;

		if (_currentMedia) {
			
			for (var m = 0; m < _media.length; m++) {
			
				var media = _media[m];

				if (media.id === _currentMedia.id) {
					currentMediaIndex = m;
					break;
				}

			}
			
		}

		if (currentMediaIndex >= _media.length) {
			currentMediaIndex = 0;
		}

		var playableMedia = {
			'currentMedia': null,
			'nextMedia': null
		};

		var startMediaIndex = currentMediaIndex;

		while (playableMedia.nextMedia === null) {

			if (_media.length - 1 >= currentMediaIndex + 1) {
				nextMedia = _media[currentMediaIndex + 1];
				currentMediaIndex++;
			}
			else {
				currentMediaIndex = 0;
				nextMedia = _media[0];
			}

			var mediaPlayer = getPlayer(nextMedia);

			if (mediaPlayer !== null) {

				if (!playableMedia.currentMedia) {
					playableMedia.currentMedia = mediaPlayer;
				}
				else if (!playableMedia.nextMedia) {
					playableMedia.nextMedia = mediaPlayer;
					return playableMedia;
				}

			}

			if (startMediaIndex == currentMediaIndex) {
				return playableMedia;
			}
		}

		return playableMedia;
	}

	function setMedia() {

		var playableMedia = getPlayableMedia();

		if (!playableMedia.currentMedia) {
			return;
		}

		var mediaHtml = getCurrentSongHtml(playableMedia.currentMedia, playableMedia.nextMedia);

		_currentMedia = playableMedia.currentMedia;

		$("#playlist").html(mediaHtml);

		playableMedia.currentMedia.play();

	}

	mediaManager.stub = function () {

	};

	mediaManager.start = function (medias) {

		if (medias && medias.length > 0) {
			$.each(medias, function (key, m) {
				_media.push(m);
			});
		}

		_players.push(youtubePlayer);
		_players.push(soundPlayer);
		
		for(var p = 0; p < _players.length; p++) {
			var player = _players[p];
			player.onFinished = setMedia;
			player.start();
		}

		if (_media && _media.length > 0) {
			setMedia();
		}

	};

	mediaManager.playEvent = function (eventName) {
		soundPlayer.playEvent(eventName);
	};

} (
	window.partyMachineMedia = window.partyMachineMedia || {},
	window.partyMachineYoutube,
	window.partyMachineSound,
	jQuery
));

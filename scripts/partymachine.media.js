(function (mediaManager, youtubePlayer, soundPlayer, $, undefined) {
	
	var _media = [];
	var _players = [];

	var _currentMedia;
	var _nextMedia;
	var _partyId;

	function getCurrentSongHtml(currentMedia, nextMedia) {
		var nextMediaHtml;
		if (nextMedia)
			nextMediaHtml = '<p>Nästa låt: ' + nextMedia.title + '</p>';
		else
			nextMediaHtml = '<p>Nästa låt: Låtlista tom!</p>';

		var currentMediaHtml;
		if (currentMedia)
			currentMediaHtml = '<p>' + currentMedia.createdBy.name + ' spelar <span>' + currentMedia.title + '</span></p>';
		else
			currentMediaHtml = '<p>Låtlista</p>: <h2>tom!</h2>';

		return currentMediaHtml + nextMediaHtml;
	}

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

		if (_currentMedia)
			_currentMedia.pause();
	};

	mediaManager.resume = function () {

		if (_currentMedia)
			_currentMedia.resume();
	};

	function updateMedia(medias, callback)
	{
		
		var playedMedias = [];
		
		if (localStorage["playedMedia-" + _partyId]) {
			playedMedias = JSON.parse(localStorage["playedMedia-" + _partyId]);
		}
		
		var mediaIndex = 0;
		var playedMediaIndex = 0;
		var media;
		
		for (playedMediaIndex = 0; playedMediaIndex < playedMedias.length; playedMediaIndex++) {
			
			var playedMediaId = playedMedias[playedMediaIndex];
			
			for (mediaIndex = 0; mediaIndex < medias.length; mediaIndex++) {
				media = medias[mediaIndex];
				if (media && media.id === playedMediaId) {
					medias[mediaIndex] = null;
				}
			}
			
		}

		var filteredMedia = [];
		
		for (mediaIndex = 0; mediaIndex < medias.length; mediaIndex++) {
			media = medias[mediaIndex];
			if (media) {
				filteredMedia.push(media);
			}
		}
		
		_media = filteredMedia;

		if (callback) {
			callback();
		}

	}

	function getNextMedia()
	{
		return _media[0];
	}

	function playNext()
	{
		if (_nextMedia)
			_currentMedia = _nextMedia;
		else if (_media.length > 0)
			_currentMedia = getPlayer(getNextMedia());
		else
			_currentMedia = null;

		if (_media.length > 1)
			for (;;)
			{
				_nextMedia = getNextMedia();
				if (_nextMedia.id != _currentMedia.id)
				{
					_nextMedia = getPlayer(_nextMedia);
					break;
				}
				console.log('randomly selected same song, retrying');
			}
		else
			_nextMedia = null;

		var mediaHtml = getCurrentSongHtml(_currentMedia, _nextMedia);
		$('.current-media-title').html(mediaHtml);

		if (_currentMedia)
			_currentMedia.play();
	}

	function playerFinished() {

		if (_currentMedia)
		{
			var playedMedias = [];
			
			if (localStorage["playedMedia-" + _partyId]) {
				playedMedias = JSON.parse(localStorage["playedMedia-" + _partyId]);
			}

			playedMedias.push(_currentMedia.id);
			
			localStorage["playedMedia-" + _partyId] = JSON.stringify(playedMedias);

		}

		var filteredMedia = [];

		for (var mediaIndex = 0; mediaIndex < _media.length; mediaIndex++) {
			var media = _media[mediaIndex];
			if (media.id != _currentMedia.id) {
				filteredMedia.push(_media[mediaIndex]);
			}
		}
		
		_media = filteredMedia;

		playNext();
	}

	function init(medias, partyId) {
		_partyId = partyId;
		
		_players.push(youtubePlayer);
		_players.push(soundPlayer);

		for (var p = 0; p < _players.length; p++) {
			var player = _players[p];
			player.onFinished = playerFinished;
			player.start();
		}

		updateMedia(medias, playNext);
		
	}
	
	mediaManager.stub = function () {

		var medias = [];

		var createdBy = {
			id: "3cef56f0-28fc-48c5-8f97-04f10d4ef26e",
			imageUrl: "http://i.imgur.com/0ul5i.png",
			name: "Jonas Olsson"
		};
		
		var m1 = {
			id: "1",
			url: 'http://www.youtube.com/watch?v=UaSqFv1SKSA',
			youtubeVideoId: 'UaSqFv1SKSA',
			albumArtist: 'Paul Kalkbrenner',
			artist: 'Paul Kalkbrenner',
			album: 'Berlin Calling',
			title: 'Paul Kalkbrenner - Plätscher',
			createdBy: createdBy,
		};

		medias.push(m1);
		
		var m2 = {
			id: "2",
			url: 'http://www.youtube.com/watch?v=o7EE6xcMUBM',
			youtubeVideoId: 'o7EE6xcMUBM',
			albumArtist: 'Paul Kalkbrenner',
			artist: 'Paul Kalkbrenner',
			album: 'Berlin Calling',
			title: 'Paul Kalkbrenner - Aaron',
			createdBy: createdBy,
		};

		medias.push(m2);
		
		var m3 = {
			id: "3",
			url: 'http://www.youtube.com/watch?v=VF5-W4P4qwg',
			youtubeVideoId: 'VF5-W4P4qwg',
			albumArtist: 'Esem',
			artist: 'Esem',
			album: 'Serial Human',
			title: 'Esem - Bleece',
			createdBy: createdBy,
		};

		medias.push(m3);
		
		init(medias, "stub");
	};

	mediaManager.start = function (medias, partyId) {
		init(medias, partyId);
	};

	mediaManager.playEvent = function (eventName) {
		soundPlayer.playEvent(eventName);
	};

	mediaManager.update = function (medias) {
		if (_currentMedia) {
			updateMedia(medias);
		} else {
			updateMedia(medias, playNext);
		}
	};
} (
	window.partyMachineMedia = window.partyMachineMedia || {},
	window.partyMachineYoutube,
	window.partyMachineSound,
	jQuery
));

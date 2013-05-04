(function (mediaManager, youtubePlayer, soundPlayer, $, undefined) {
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
	var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;
	var dbVersion = 1.0;

	var _db;
	var _media = [];
	var _players = [];

	var _currentMedia;
	var _nextMedia;

	function getCurrentSongHtml(currentMedia, nextMedia) {
		var nextMediaHtml;
		if (nextMedia)
			nextMediaHtml = '<p class="next-song">Nästa: ' + nextMedia.title + '</p>';
		else
			nextMediaHtml = '<p class="next-song">Nästa: Låtlista tom!</p>';

		var currentMediaHtml;
		if (currentMedia)
			currentMediaHtml = '<p>' + currentMedia.createdBy.name + ' spelar:</p><h2>' + currentMedia.title + '</h2>';
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
		var trans = _db.transaction(['playedMedia'], "readonly");
		var store = trans.objectStore('playedMedia');
		var i = 0;
		
		store.openCursor().onsuccess = function(e)
		{
			var cursor = e.target.result;
			if (cursor)
			{
				for (i = 0; i < medias.length; i++)
					if (medias[i] && medias[i].id == cursor.key)
					{
						medias[i] = null;
						break;
					}

				cursor.continue();
			}
			else
			{
				var filteredMedia = [];
				for (i = 0; i < medias.length; i++)
					if (medias[i])
						filteredMedia.push(medias[i]);
				_media = filteredMedia;

				if (callback)
					callback();
			}
		};
	}

	function getRandom()
	{
		return _media[parseInt(Math.random() * _media.length)];
	}

	function playNext()
	{
		if (_nextMedia)
			_currentMedia = _nextMedia;
		else if (_media.length > 0)
			_currentMedia = getPlayer(getRandom());
		else
			_currentMedia = null;

		if (_media.length > 1)
			for (;;)
			{
				_nextMedia = getRandom();
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
			var trans = _db.transaction(['playedMedia'], "readwrite");
			var store = trans.objectStore('playedMedia');
			var request = store.put(
			{
				'id': _currentMedia.id
			});
		}

		var filteredMedia = [];
		for (var i = 0; i < _media.length; i++)
			if (_media[i].id != _currentMedia.id)
				filteredMedia.push(_media[i]);
		_media = filteredMedia;

		playNext();
	}

	function init(medias, partyId) {
		_players.push(youtubePlayer);
		_players.push(soundPlayer);

		for (var p = 0; p < _players.length; p++) {
			var player = _players[p];
			player.onFinished = playerFinished;
			player.start();
		}

		var request = indexedDB.open(partyId, dbVersion);
		
		var createObjectStore = function(db) {
			console.log("Creating objectStore");
			db.createObjectStore('playedMedia', { keyPath: 'id' });
		};

		request.onerror = function (event) {
			console.log("Error creating/accessing IndexedDB database");
		};

		request.onsuccess = function(event) {
			console.log("Success creating/accessing IndexedDB database");
			_db = request.result;

			_db.onerror = function (event) {
				console.log("Error creating/accessing IndexedDB database");
			};

			if (_db.setVersion) {
				if (_db.version != dbVersion) {
					var setVersion = _db.setVersion(dbVersion);
					setVersion.onsuccess = function() {
						createObjectStore(_db);
						setTimeout(function () { updateMedia(medias, playNext); }, 1000);
					};
				} else {
					setTimeout(function() { updateMedia(medias, playNext); }, 1000);
				}
			} else {
				setTimeout(function () { updateMedia(medias, playNext); }, 1000);
			}
		};

		// For future use. Currently only in latest Firefox versions
		request.onupgradeneeded = function (event) {
			createObjectStore(event.target.result);
		};
		
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
		if (_currentMedia)
			updateMedia(medias);
		else
			updateMedia(medias, playNext);
	};
} (
	window.partyMachineMedia = window.partyMachineMedia || {},
	window.partyMachineYoutube,
	window.partyMachineSound,
	jQuery
));

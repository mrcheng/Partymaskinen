(function (snd, $, undefined) {

	var media = [];

	var pagePlayer;

	var currentMediaIndex = 0;

	var playlistUrl = 'http://partymaskinen.se/party.json.aspx';

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

	snd.resume = function() {
		pagePlayer.playLink();
	};

	function setMedia() {

		if (media.length <= 0) {
			return;
		}

		if (currentMediaIndex >= media.length) {
			currentMediaIndex = 0;
		}

		var currentMedia = media[currentMediaIndex];
		var nextMedia;

		if (media.length - 1 >= currentMediaIndex + 1) {
			nextMedia = media[currentMediaIndex + 1];
			currentMediaIndex++;
		}
		else {
			currentMediaIndex = 0;
			nextMedia = media[0];
		}

		var mediaHtml = getCurrentSongHtml(currentMedia, nextMedia);

		$("#playlist").html(mediaHtml);

		pagePlayer.playLink();

	}

	snd.stub = function () {

	};

	snd.start = function (medias) {


		var PP_CONFIG = {
			autoStart: false,      // begin playing first sound when page loads
			playNext: false,        // stop after one sound, or play through list until end
			useThrottling: false,  // try to rate-limit potentially-expensive calls (eg. dragging position around)</span>
			usePeakData: true,     // [Flash 9 only] whether or not to show peak data (left/right channel values) - nor noticable on CPU
			useWaveformData: false, // [Flash 9 only] show raw waveform data - WARNING: LIKELY VERY CPU-HEAVY
			useEQData: false,      // [Flash 9 only] show EQ (frequency spectrum) data
			useFavIcon: false,     // try to apply peakData to address bar (Firefox + Opera) - performance note: appears to make Firefox 3 do some temporary, heavy disk access/swapping/garbage collection at first(?) - may be too heavy on CPU
			useMovieStar: true,     // Flash 9.0r115+ only: Support for a subset of MPEG4 formats.
			repeatPlaylist: false,
			onfinish: setMedia
		};


		// <li><a href="http://dl.dropbox.com/u/10854052/Music/01_Lfobia_%28Subsider_Remix%29-pMn_INT.mp3">Lfobia <span class="created-by">by Daniel Medin</span><span class="next-song">Nästa låt: Blinka lilla stjärna</span></a></li>

		// Optional: ontimeout() callback for handling start-up failure
		soundManager.ontimeout(function () {
			alert('probably a flash security error');
		});


		soundManager.onready(function () {

			pagePlayer = new PagePlayer();

			pagePlayer.init(typeof PP_CONFIG !== 'undefined' ? PP_CONFIG : null);

			if (medias && medias.length > 0) {

				$.each(medias, function (key, m) {
					media.push(m);
				});

				setMedia();

			}

		});



	};

	snd.playEvent = function (eventName) {

		if (eventName === "pluginHighlight") {

			soundManager.onready(function () {

				var pluginSelectSnd = soundManager.createSound({
					id: 'pluginSound',
					url: 'sounds/lobbySfx-pluginselect.mp3', //temporary URL
					autoStart: false,
					multiShot: true
				});

				pluginSelectSnd.play();

			});

		}
		else if (eventName === "newParticipantDueToTimeout") {
			soundManager.onready(function () {

				var newContenderSnd = soundManager.createSound({
					id: 'newContenderSound',
					url: 'sounds/lobbySfx-newcontender.mp3', //temporary URL
					autoLoad: true,
					autoPlay: false
					//stream: true,
				});

				newContenderSnd.play();

			});
		}

	};

} (window.partyMachineSound = window.partyMachineSound || {}, jQuery));


soundManager.flashVersion = 9;
soundManager.debugMode = false;
soundManager.preferFlash = true; // for visualization effects
soundManager.useHighPerformance = true; // keep flash on screen, boost performance
soundManager.wmode = 'transparent'; // transparent SWF, if possible
soundManager.useFastPolling = true; // increased JS callback frequency
soundManager.url = 'swf/soundmanager2_flash_xdomain/'; //SWF URL

(function (player, $, undefined) {
	var _sounds = [];

	player.onFinished = function () { };

	player.getMediaHandler = function (media) {

		if (!soundManager.canPlayURL(media.url))
			return null;

		media.play = function () {
			player.play(media);
		};

		media.pause = function () {
			player.pause(media);
		};

		media.resume = function () {
			player.resume(media);
		};

		return media;
	},

	player.createSong = function(sound) {
		var s = soundManager.createSound({
			id: sound.id,
			url: sound.url,
			autoPlay: true,
			volume: 100,
			onfinish: function () {
				soundManager._writeDebug(this.sID + ' finished playing');

				_sounds = $.grep(_sounds, function (value) {
					return value.sID !== sound.id;
				});

				this.destruct();

				player.onFinished();
			}
		});

		_sounds.push(s);

		return s;
	},

	player.playEvent = function (eventName) {
		soundManager.onready(function () {

			if (eventName === "pluginHighlight") {


					var pluginSelectSnd = soundManager.createSound({
						id: 'pluginSound',
						url: 'sounds/lobbySfx-pluginselect.mp3', //temporary URL
						autoStart: false,
						multiShot: true,
						onfinish: function () {
							soundManager._writeDebug(this.sID + ' finished playing');

							_sounds = $.grep(_sounds, function (value) {
								return value.sID !== 'pluginSound';
							});

							this.destruct();

						}
					});

					_sounds.push(pluginSelectSnd);
					
					pluginSelectSnd.play();


			}
			else if (eventName === "newParticipantDueToTimeout") {

					var newContenderSnd = soundManager.createSound({
						id: 'newContenderSound',
						url: 'sounds/lobbySfx-newcontender.mp3', //temporary URL
						autoLoad: true,
						autoPlay: false,
						volume: 100,
						multiShot: true,
						onfinish: function () {
							soundManager._writeDebug(this.sID + ' finished playing');

							_sounds = $.grep(_sounds, function (value) {
								return value.sID !== 'newContenderSound';
							});

							this.destruct();

						}
					});

					_sounds.push(newContenderSnd);
					
					newContenderSnd.play();
			}

		});
	},

	player.start = function () {

		
	};

	player.play = function (sound) {
		soundManager.onready(function () {

			var s = player.createSong(sound);

			s.play();

		});
	};

	player.pause = function (sound) {
		soundManager.onready(function () {

			for (var s = 0; s < _sounds.length; s++) {
				var snd = _sounds[s];

				if (typeof sound === 'undefined' || snd.id === sound.id) {
					snd.pause();

					if (typeof sound !== 'undefined') {
						break;
					}

				}

			}

		});
	};

	player.resume = function (sound) {
		soundManager.onready(function () {

			for (var s = 0; s < _sounds.length; s++) {
				var snd = _sounds[s];

				if (typeof sound === 'undefined' || snd.id === sound.id) {
					snd.resume();

					if (typeof sound !== 'undefined') {
						break;
					}
				}

			}

		});
	};

} (window.partyMachineSound = window.partyMachineSound || {}, jQuery));

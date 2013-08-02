
(function (partyMachine, controllers, pluginRunner, participants, mediaPlayer, coverflow, $, undefined) {

	var _contexts = {
		atPluginSelection: 0,
		runningPlugin: 1
	};

	var _state = {
		context: _contexts.atPluginSelection,
		currentParticipant: null,
		currentlySelectedPlugin: 0,
        firstLoad: true
	};

	var _participantTimeoutTimer;
	var _participantTimeoutDateTime = null;

	var _mediaTimeoutTimer;
	var _mediaTimeoutTimerDelay = 1000 * 60 * 5;

	partyMachine.getUrlParams = function () {
		var urlParams = {};
		(function () {
			var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

			while (e = r.exec(q))
				urlParams[d(e[1])] = d(e[2]);
		})();

		return urlParams;
	};

	function resetParticipantTimeout() {

		if (_participantTimeoutTimer !== null)
			window.clearTimeout(_participantTimeoutTimer);

		_participantTimeoutDateTime = new Date();
		_participantTimeoutDateTime.setTime(_participantTimeoutDateTime.getTime() + (10 * 60 * 1000));

		_participantTimeoutTimer = window.setTimeout("window.partyMachine.updateParticipantTimeout()", 1000);
	};

	function resetMediaTimeout() {

		if (_mediaTimeoutTimer !== null)
			window.clearTimeout(_mediaTimeoutTimer);

		_mediaTimeoutTimer = window.setTimeout("window.partyMachine.updateMediaTimeout()", _mediaTimeoutTimerDelay);

	}

	function atPluginSelect(freshParticipants) {

		var currentParticipant = participants.getNextParticipant();
		_state.currentParticipant = currentParticipant;
		var participantDescription = currentParticipant.description;

		if (participantDescription == null) {
			participantDescription = "Jag orkade inte skriva description =(";
		}

		$("#participant-image").html('<img src="' + currentParticipant.imageUrl + '"></img>');
		$("#participant-name").html('<p>' + currentParticipant.name + '</p>' + '<i>' + '"' + participantDescription + '"' + '</i>');

		$(".fittext1").fitText();

		partyMachine.bindKeys(freshParticipants);
	}

    partyMachine.bindKeys = function (freshParticipants) {
		
		var buttonsPressed = function(buttonA, buttonB, buttonC, buttonD) {

			var anyButton = buttonA || buttonB || buttonC || buttonD;

			if (!anyButton) {
				return false;
			}

			if (_state.context !== _contexts.atPluginSelection) {
				return false;
			}

			pluginRunner.startPlugin(_state.currentParticipant, freshParticipants, coverflow.getSelectedPlugin());

		};

		var moved = function(left, up, right, down) {

			var anyButton = left || up || right || down;

			if (!anyButton) {
				return false;
			}

			if (_state.context !== _contexts.atPluginSelection) {
				return false;
			}


			if (right) {
				//if (_state.currentlySelectedPlugin + 1 >= plugins.length) {
				//    _state.currentlySelectedPlugin = coverflow.moveTo(0);
				//} else {
				//	_state.currentlySelectedPlugin = coverflow.right(_state.currentlySelectedPlugin + 1);
				//}
				_state.currentlySelectedPlugin = coverflow.right();

			} else if (left) {
				_state.currentlySelectedPlugin = coverflow.left();
				//if (_state.currentlySelectedPlugin <= 0) {
				//    _state.currentlySelectedPlugin = coverflow.moveTo(plugins.length - 1);
				//} else {
				//	_state.currentlySelectedPlugin = coverflow.moveTo(_state.currentlySelectedPlugin - 1);
				//    _state.currentlySelectedPlugin -= 1;
				//    coverflow.left();
				//}
			} else if (up) {
				//_state.currentlySelectedPlugin = ((_state.currentlySelectedPlugin + 4) % 8);
			} else if (down) {
				//_state.currentlySelectedPlugin = ((_state.currentlySelectedPlugin + 4) % 8);
			}

		};

		var gamepadPressed = function(left, up, right, down) {
			moved(left, up, right, down);
		};
		
		setTimeout(function() {
			controllers.mapControllers(
				gamepadPressed,
				function() {
				},
				buttonsPressed,
				function() {
				},
				function () {
				}
			);
		}, 1000);


	},
	partyMachine.updateParticipantTimeout = function() {

		var dateNow = new Date();
		var nTimeDiff = _participantTimeoutDateTime.getTime() - dateNow.getTime();
		var oDiff = new Object();

		oDiff.days = Math.floor(nTimeDiff / 1000 / 60 / 60 / 24);
		nTimeDiff -= oDiff.days * 1000 * 60 * 60 * 24;

		oDiff.hours = Math.floor(nTimeDiff / 1000 / 60 / 60);
		nTimeDiff -= oDiff.hours * 1000 * 60 * 60;

		oDiff.minutes = Math.floor(nTimeDiff / 1000 / 60);
		nTimeDiff -= oDiff.minutes * 1000 * 60;

		oDiff.seconds = Math.floor(nTimeDiff / 1000);

		$("#participant-timer").html("<i>Nästa deltagare om:</i><br />" + '<p>' + (oDiff.minutes < 10 ? '0' : '') + oDiff.minutes + ':' + (oDiff.seconds < 10 ? '0' : '') + oDiff.seconds + '</p>');

		if (oDiff.minutes == 0 && oDiff.seconds == 0) {
			//TODO: switch participant when time runs out, not on plugin select (no method getParticipants)
			atPluginSelect(participants.getNextParticipant());
			//TODO: Play sound?
			resetParticipantTimeout();
		} else {
			_participantTimeoutTimer = window.setTimeout("window.partyMachine.updateParticipantTimeout()", 1000);
		}
	},
	partyMachine.updateMediaTimeout = function() {

		var partyParams = partyMachine.getUrlParams();
		var feedUrl = partyMachineConfig.partyFeedUrl + "?jsoncallback=?" + '&id=' + partyParams["id"];

		$.ajax({
			url: feedUrl,
			jsonp: true,
			dataType: 'json',
			success: function(data) {

				mediaPlayer.update(data.media);
			}
		});

		_mediaTimeoutTimer = window.setTimeout("window.partyMachine.updateMediaTimeout()", _mediaTimeoutTimerDelay);
	},
	partyMachine.start = function(pluginDevelopment) {

		var partyParams = partyMachine.getUrlParams();

		if (typeof pluginDevelopment !== "undefined" || pluginDevelopment != null) {
			pluginRunner.stub();
			controllers.stub();
			participants.stub();

			var stubbedParticipants = participants.getAllParticipants();

			pluginRunner.startPlugin(stubbedParticipants, _state.currentlySelectedPlugin);

			resetParticipantTimeout();
			resetMediaTimeout();

		} else if (typeof partyParams["id"] === "undefined" || partyParams["id"] == null) {

			var latestPartiesUrl = partyMachineConfig.latestPartiesFeedUrl + "?jsoncallback=?";
			$.ajax({
				url: latestPartiesUrl,
				jsonp: true,
				dataType: 'json',
				success: function(data) {

					var freshParties = [];

					freshParties.push('<li><a href="?id=stub">A stubbed party (only for development purposes)</a></li>');
					
					if (data.parties && data.parties.length > 0) {
						$.each(data.parties, function(i, item) {
							freshParties.push('<li><a href="?id=' + item.id + '">' + item.name + '</a></li>');
						});
					}
					
					var docHeight = $(document).height();

					$("body").append("<div id='freshPartiesOverlay'>Choose a party:</div>");

					$("#freshPartiesOverlay")
						.height(docHeight)
						.css({
							'opacity': 0.4,
							'position': 'absolute',
							'top': 0,
							'left': 0,
							'background-color': 'black',
							'width': '100%',
							'z-index': 9001
						});

					console.log("displaying freshPartiesOverlay");

					$('#freshPartiesOverlay').append("<ul>").append(freshParties.join(''));


				}
			});
			
		}
		else if (typeof partyParams["id"] !== "undefined" && partyParams["id"] == "stub") {
			
			participants.stub();

			var activeParticipants = participants.getActiveParticipants();
			
			pluginRunner.stub();
			
			controllers.start(activeParticipants);
			
			atPluginSelect(activeParticipants);
			
			mediaPlayer.stub();
			
			if (_state.firstLoad) {
				
				coverflow.stub(mediaPlayer);

				_state.currentlySelectedPlugin = coverflow.getSelectedPlugin();

				_state.firstLoad = false;
			}


			resetParticipantTimeout();
			resetMediaTimeout();
		} else {

			var feedUrl = partyMachineConfig.partyFeedUrl + "?jsoncallback=?" + '&id=' + partyParams["id"];
			$.ajax({
				url: feedUrl,
				jsonp: true,
				dataType: 'json',
				success: function (data) {

					var freshParticipants = [];

					$('#partyname').html('<p>' + data.name + '</p>');
					$('html').css('background-image', 'url(' + data.imageUrl + ')');


					if (data.participants && data.participants.length > 0) {
						$.each(data.participants, function (key, m) {
							m.status = "active";
							freshParticipants.push(m);
						});
					}

					$.shuffle(freshParticipants);

					participants.start(feedUrl, freshParticipants);
					
					pluginRunner.start(mediaPlayer, data.plugins);

					controllers.start(freshParticipants);

					atPluginSelect(freshParticipants);

					mediaPlayer.start(data.media, partyParams["id"]);


					if (_state.firstLoad) {
						coverflow.start(data.plugins, mediaPlayer);

						_state.currentlySelectedPlugin = coverflow.getSelectedPlugin();

						_state.firstLoad = false;
					}

					resetParticipantTimeout();
					resetMediaTimeout();
				}
			});
		}

		// Setup a callback to handle the dispatched MessageEvent event. In cases where
		// window.postMessage is supported, the passed event will have .data, .origin and
		// .source properties. Otherwise, this will only have the .data property.
		$.receiveMessage(function(e) {

			var data = JSON.parse(e.data);

			if (data.event === "iframe_resize") {
				pluginRunner.adjustPlugin(data);
			} else if (data.event === "getParticipants") {
				pluginRunner.sendParticipants(_state.currentParticipant, participants.getActiveParticipants());
			} else if (data.event === "pluginExit") {

				pluginRunner.exitPlugin();

				_state.context = _contexts.atPluginSelection;

				mediaPlayer.resume();

				atPluginSelect(participants.getActiveParticipants());
				resetParticipantTimeout();
				resetMediaTimeout();
			} else {
				//console.log("unknown message recieved: " + data);
			}
		});

	};

} (
	window.partyMachine = window.partyMachine || {},
	window.partyMachineControllers,
	window.partyMachinePluginRunner,
	window.partyMachineParticipants,
	window.partyMachineMedia,
    window.partyMachineCoverflow,
	jQuery
	)
);


(function (partyMachine, controllers, pluginRunner, participants, soundplayer, $, undefined) {

	var partyFeedUrl = 'http://partymaskinen.se/Party/JsonP';

	var _contexts = {
		atPluginSelection: 0,
		runningPlugin: 1
	};

	var _state = {
		context: _contexts.atPluginSelection,
		currentlySelectedPlugin: 0
	};


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
	}

	function atPluginSelect(freshParticipants) {

		var currentParticipant = participants.getNextParticipant();
		$("#participant-info").html('<p>' + currentParticipant.description + '</p>');
		$("#participant-image").html('<img src="' + currentParticipant.imageUrl + '"></img>');
		$("#participant-name").html('<p>' + currentParticipant.name + '</p>');
		
		//var participantHtmlTemplate = '<p>' + currentParticipant.name + '</p>';
		//$("#partyMachine-participant").html(participantHtmlTemplate);

		for (var participant = 0; participant < freshParticipants.length; participant++) {

			var p = freshParticipants[participant];

			if (typeof p === "undefined" || p == null) {
				continue;
			}

			p.gameController.buttonsPressed = function (buttonA, buttonB, buttonC, buttonD) {

				var plugins = pluginRunner.getPlugins();

				if (_state.context !== _contexts.atPluginSelection) {
					return false;
				}

				if (plugins.length === 0) {
					return false;
				}

				pluginRunner.startPlugin(freshParticipants, _state.currentlySelectedPlugin);
			};

			p.gameController.gamepadPressed = function (left, up, right, down) {

				var plugins = pluginRunner.getPlugins();

				if (_state.context !== _contexts.atPluginSelection) {
					return false;
				}

				if (plugins.length === 0) {
					return false;
				}

				if (right) {
					if (_state.currentlySelectedPlugin + 1 >= plugins.length) {
						_state.currentlySelectedPlugin = 0;
					}
					else {
						_state.currentlySelectedPlugin += 1;
					}
				}
				else if (left) {
					if (_state.currentlySelectedPlugin <= 0) {
						_state.currentlySelectedPlugin = plugins.length - 1;
					}
					else {
						_state.currentlySelectedPlugin -= 1;
					}
				}
				else if (up) {
					_state.currentlySelectedPlugin = ((_state.currentlySelectedPlugin + 4) % 8);
				}
				else if (down) {
					_state.currentlySelectedPlugin = ((_state.currentlySelectedPlugin + 4) % 8);
				}
				else {
					pluginRunner.startPlugin(freshParticipants, _state.currentlySelectedPlugin);
					return true;
				}

				pluginRunner.highlightPlugin(_state.currentlySelectedPlugin);

			}

		}

	}

	partyMachine.start = function (pluginDevelopment) {

		var partyParams = partyMachine.getUrlParams();

		if (typeof pluginDevelopment !== "undefined" || pluginDevelopment != null) {
			pluginRunner.stub();
			controllers.stub();
			participants.stub();

			var stubbedParticipants = participants.getParticipants();

			pluginRunner.startPlugin(stubbedParticipants, _state.currentlySelectedPlugin);

		}
		else if (typeof partyParams["id"] === "undefined" || partyParams["id"] == null) {
			pluginRunner.stub();
			controllers.stub();
			participants.stub();

		}
		else {
			// We dont have a fully working controller solution
			controllers.stub();

			// We dont have a fully working runner yet..
			// pluginRunner.stub();

			$.ajax({
				url: partyFeedUrl + "?jsoncallback=?" + '&id=' + partyParams["id"],
				jsonp: true,
				dataType: 'json',
				success: function (data) {

					var freshParticipants = [];

					if (data.participants && data.participants.length > 0) {
						$.each(data.participants, function (key, m) {
							freshParticipants.push(m);
						});
					}

					participants.start(partyFeedUrl, freshParticipants);

					pluginRunner.start(soundplayer, data.plugins);

					controllers.start(freshParticipants);

					var atPluginSelectWithParticipants = function () {
						atPluginSelect(freshParticipants);
					};

					partyMachine.assignGameControllers(
						atPluginSelectWithParticipants,
						freshParticipants
					);

					soundplayer.start(data.media);

				}
			});
		}

		// Setup a callback to handle the dispatched MessageEvent event. In cases where
		// window.postMessage is supported, the passed event will have .data, .origin and
		// .source properties. Otherwise, this will only have the .data property.
		$.receiveMessage(function (e) {

			var data = JSON.parse(e.data);

			if (data.event === "iframe_resize") {
				pluginRunner.adjustPlugin(data);
			}
			else if (data.event === "pluginExit") {

				pluginRunner.exitPlugin();

				_state.context = _contexts.atPluginSelection;

				soundplayer.resume();
				
				atPluginSelect(participants.getParticipants());

			}
			else {
				console.log("unknown message recieved: " + data);
			}
		});

	},

	partyMachine.assignGameControllers = function (
		gameControllersAssigned,
		participantz
	) {

		controllers.assignGameControllers(
			gameControllersAssigned,
			participantz
		);

	}

} (
	window.partyMachine = window.partyMachine || {},
	window.partyMachineControllers,
	window.partyMachinePluginRunner,
	window.partyMachineParticipants,
	window.partyMachineSound,
	jQuery
	)
);

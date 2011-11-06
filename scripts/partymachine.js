
(function (partyMachine, controllers, pluginRunner, participants, soundplayer, $, undefined) {

	var partyFeedUrl = 'http://partymaskinen.se/party.json.aspx';

	var _contexts = {
		atPluginSelection: 0,
		runningPlugin: 1
	};

	var _state = {
		context: _contexts.atPluginSelection,
		currentlySelectedPlugin: 0
	};

	function isHostAvailable() {
		return false;
	}

	function atPluginSelect(freshParticipants) {

		var currentParticipant = participants.getNextParticipant();

		var participantHtmlTemplate = '<img src="' + currentParticipant.imageUrl + '"></img><strong>' + currentParticipant.name + '</strong>'
							+ '<h2>' + currentParticipant.description + '</h2>';

		$("#partyMachine-participant").html(participantHtmlTemplate);

		//		partyMachine.assignGameControllers(
		//						function () {

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

				pluginRunner.startPlugin(_state.currentlySelectedPlugin);
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
					pluginRunner.startPlugin(_state.currentlySelectedPlugin);
					return true;
				}

				pluginRunner.highlightPlugin(_state.currentlySelectedPlugin);

			}

		}

		//						},
		//						freshParticipants[0],
		//						freshParticipants[1],
		//						freshParticipants[2],
		//						freshParticipants[3],
		//						freshParticipants[4],
		//						freshParticipants[5],
		//						freshParticipants[6]
		//					);



	}

	partyMachine.start = function () {

		if (/*!isHostAvailable() ||*/!partyFeedUrl) {
			pluginRunner.stub();
			controllers.stub();
			participants.stub();
		}
		else {
			// We dont have a fully working controller solution
			controllers.stub();

			// We dont have a fully working runner yet..
			pluginRunner.stub();

			$.ajax({
				url: partyFeedUrl + "?callback=?",
				jsonp: true,
				dataType: 'jsonp',
				success: function (data) {

					var freshParticipants = [];

					if (data.participants && data.participants.length > 0) {
						$.each(data.participants, function (key, m) {
							freshParticipants.push(m);
						});
					}

					participants.start(partyFeedUrl, freshParticipants);

					pluginRunner.start(soundplayer);

					controllers.start(freshParticipants);

					var atPluginSelectWithParticipants = function () {
						atPluginSelect(freshParticipants);
					};

					partyMachine.assignGameControllers(
						atPluginSelectWithParticipants,
						freshParticipants[0],
						freshParticipants[1],
						freshParticipants[2],
						freshParticipants[3],
						freshParticipants[4],
						freshParticipants[5],
						freshParticipants[6]
					);

					soundplayer.start();

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
			else if (data.event === "getParticipants") {

				var msg = { event: "participants", "participants": _participants };
				var currentPlugin = pluginRunner.getPlugin();

				// $.postMessage(JSON.stringify(msg), currentPlugin.src, currentPlugin.contentWindow);

				$.postMessage(JSON.stringify(msg), '*', currentPlugin.contentWindow);
			}
			else {
				alert("daaa" + data.event);
			}
		});
	},

	partyMachine.assignGameControllers = function (
		gameControllersAssigned,
		participant1,
		participant2,
		participant3,
		participant4,
		participant5,
		participant6,
		participant7
	) {

		controllers.assignGameControllers(
			gameControllersAssigned,
			participant1,
			participant2,
			participant3,
			participant4,
			participant5,
			participant6,
			participant7
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

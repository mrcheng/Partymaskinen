
(function (partyMachine, controllers, pluginRunner, participants, $, undefined) {

	var _contexts = {
		atPluginSelection: 0,
		runningPlugin: 1
	};

	var _state = {
		context: _contexts.atPluginSelection,
		currentlySelectedPlugin: 0
	};

	var _participants = [];

	function isHostAvailable() {
		return false;
	}

	function atPluginSelect() {

		for (var participant = 0; participant < _participants.length; participant++) {

			var p = _participants[participant];

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
				else {
					return false;
				}

				pluginRunner.highlightPlugin(_state.currentlySelectedPlugin);

			};

		}

	}

	partyMachine.start = function () {

		if (!isHostAvailable()) {
			pluginRunner.stub();
			controllers.stub();
			participants.stub();
		}

		participants.start();
		_participants = participants.getParticipants();
		
		pluginRunner.start();

		controllers.start(_participants);
		
		partyMachine.assignGameControllers(
			atPluginSelect,
			_participants[0],
			_participants[1],
			_participants[2],
			_participants[3],
			_participants[4],
			_participants[5],
			_participants[6]
		);

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
	jQuery
	)
);

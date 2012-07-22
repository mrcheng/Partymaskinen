(function (controllers, $, undefined) {

	var _controllers = [];

	controllers.stub = function () {


	};

	controllers.start = function () {

	};

	controllers.registerInput = function (controllerId) {

		var controller = {
			id: controllerId,
			joystick: function (x, y) { },
			gamepadPressed: function (left, up, right, down, cId) { },
			gamepadReleased: function (left, up, right, down, cId) { },
			buttonsPressed: function (buttonA, buttonB, buttonC, buttonD, cId) { },
			buttonsReleased: function (buttonA, buttonB, buttonC, buttonD, cId) { }
		};

		_controllers[controllerId] = controller;

	};

	controllers.joystick = function (x, y, controllerId) {
		var controller = _controllers[controllerId];

		if (controller && controller.joystick) {
			controller.joystick(x, y, controllerId);
		}
	};

	controllers.gamepadPressed = function (left, up, right, down, controllerId) {

		var controller = _controllers[controllerId];

		if (controller && controller.gamepadPressed) {
			controller.gamepadPressed(left, up, right, down, controllerId);
		}

	};

	controllers.gamepadReleased = function (left, up, right, down, controllerId) {

		var controller = _controllers[controllerId];

		if (controller && controller.gamepadReleased) {
			controller.gamepadReleased(left, up, right, down, controllerId);
		}

	};

	controllers.buttonsPressed = function (buttonA, buttonB, buttonC, buttonD, controllerId) {

		var controller = _controllers[controllerId];

		if (controller && controller.buttonsPressed) {
			controller.buttonsPressed(buttonA, buttonB, buttonC, buttonD, controllerId);
		}

	};

	controllers.buttonsReleased = function (buttonA, buttonB, buttonC, buttonD, controllerId) {

		var controller = _controllers[controllerId];

		if (controller && controller.buttonsReleased) {
			controller.buttonsReleased(buttonA, buttonB, buttonC, buttonD, controllerId);
		}

	};

	controllers.unmapControllersExcept = function (mappedControllers) {

		for (var controllerId in _controllers) {

			var unmapController = true;

			for (var c = 0; c < mappedControllers.length; c++) {

				var mappedControllerId = mappedControllers[c];

				if (mappedControllerId === controllerId) {
					unmapController = false;
					break;
				}
			}

			if (!unmapController) {
				continue;
			}

			var controller = _controllers[controllerId];

			controller.joystick = function (x, y, cId) { };
			controller.gamepadPressed = function (left, up, right, down, cId) { };
			controller.gamepadReleased = function (left, up, right, down, cId) { };
			controller.buttonsPressed = function (buttonA, buttonB, buttonC, buttonD, cId) { };
			controller.buttonsReleased = function (buttonA, buttonB, buttonC, buttonD, cId) { };
		}

	};

	controllers.mapController = function (gamepadPressed, gamepadReleased, buttonsPressed, buttonsReleased, joystick, controllerId) {

		var controller = _controllers[controllerId];

		controller.joystick = joystick || function (x, y, cId) { };
		controller.gamepadPressed = gamepadPressed || function (left, up, right, down, cId) { };
		controller.gamepadReleased = gamepadReleased || function (left, up, right, down, cId) { };
		controller.buttonsPressed = buttonsPressed || function (buttonA, buttonB, buttonC, buttonD, cId) { };
		controller.buttonsReleased = buttonsReleased || function (buttonA, buttonB, buttonC, buttonD, cId) { };

	};

	controllers.mapControllers = function (gamepadPressed, gamepadReleased, buttonsPressed, buttonsReleased, joystick) {
		for (var controllerId in _controllers) {

			var controller = _controllers[controllerId];

			controller.joystick = joystick || function (x, y, cId) { };
			controller.gamepadPressed = gamepadPressed || function (left, up, right, down, cId) { };
			controller.gamepadReleased = gamepadReleased || function (left, up, right, down, cId) { };
			controller.buttonsPressed = buttonsPressed || function (buttonA, buttonB, buttonC, buttonD, cId) { };
			controller.buttonsReleased = buttonsReleased || function (buttonA, buttonB, buttonC, buttonD, cId) { };

		}
	};

} (window.partyMachineControllers = window.partyMachineControllers || {}, jQuery));


	
(function (controllerSelector, controllers, $, undefined) {

	var _highlightedParticipantIndex;

	var _assignedParticipantsToControllers = { };

	function constructOverlay (participant) {

		var overlay = $('#assignGameControllersOverlay');
		if (overlay.length == 0)
		{
			overlay = $('<div id="assignGameControllersOverlay" style="position: fixed; top: 50%; left: 50%; margin-top: -200px; margin-left: -128px; z-index: 999999; background-color: black; color: white; font-family: sans-serif; padding: 32px; text-align: center;"></div>');
			$('body').append(overlay);
		}

		overlay.html(
			'<div class="participant-image">' +
				'<img src="' + participant.imageUrl + '" width="256" height="256"></img>' +
			'</div>' +
			'<div class="name-container">' +
				'<div class="fittext1 participant-name" style="font-weight: bold;">' + participant.name + '</div>' +
				'press a button on your controller!' +
			'</div>');
	};

	controllerSelector.assignGameControllers = function(
		gameControllersAssigned,
		participants,
		participantController
	) {

		_assignedParticipantsToControllers = { };
		_highlightedParticipantIndex = 0;

		constructOverlay(participants[_highlightedParticipantIndex]);

		var buttonsPressed = function(buttonA, buttonB, buttonC, buttonD, controllerId)
		{
			_assignedParticipantsToControllers[_highlightedParticipantIndex] = controllerId;

			var highlightedParticipant = participants[_highlightedParticipantIndex];
            controllers.mapController(
				highlightedParticipant.gameController.gamepadPressed,
				highlightedParticipant.gameController.gamepadReleased,
				highlightedParticipant.gameController.buttonsPressed,
				highlightedParticipant.gameController.buttonsReleased,
				highlightedParticipant.gameController.joystick,
				controllerId);

			_highlightedParticipantIndex++;

			if (_highlightedParticipantIndex == participants.length)
			{
                $("#assignGameControllersOverlay").remove();

				var mappedControllers = [];

				for (var mappedParticipant in _assignedParticipantsToControllers)
					mappedControllers.push(_assignedParticipantsToControllers[mappedParticipant]);

				controllers.unmapControllersExcept(mappedControllers);

			    if (typeof gameControllersAssigned !== "undefined")
    				gameControllersAssigned();
			}
			else
				constructOverlay(participants[_highlightedParticipantIndex]);
		};

		var gamepadPressed = function() {};
		var gamepadReleased = function() {};
		var buttonsReleased = function() {};
		var joystick = function() {};

		controllers.mapControllers(gamepadPressed, gamepadReleased, buttonsPressed, buttonsReleased, joystick);

	};

} (window.partyMachineParticipantControllerSelectors = window.partyMachineParticipantControllerSelectors || {}, partyMachineControllers, jQuery));



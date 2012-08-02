
	
(function(controllerSelector, controllers, $, undefined) {

	var _highlightedParticipantIndex;

	var _assignedParticipantsToControllers = { };

	function constructOverlay(participant) {

		var overlay = $('#assignGameControllersOverlay');
		if (overlay.length == 0) {
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
	}

	;

	controllerSelector.assignParticipants = function(participants) {
		
		var controllerz = controllers.getControllers();
		
		var px = 0;
		
		for (var ctrlr in controllerz) {

			var controller = controllerz[ctrlr];
			
			for (px = 0; px < participants.length; px++) {

				var part = participants[px];

				controllers.mapController(
					part.gameController.gamepadPressed,
					part.gameController.gamepadReleased,
					part.gameController.buttonsPressed,
					part.gameController.buttonsReleased,
					part.gameController.joystick,
					controller.id
				);

				break;
			}
		}

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



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

	controllers.clearInputMappings = function () {
		for (var c = 0; c < _controllers.length; c++) {
			var controller = _controllers[c];

			controller.gamepadPressed = gamepadPressed;
			controller.gamepadReleased = gamepadReleased;
			controller.buttonsPressed = buttonsPressed;
			controller.buttonsReleased = buttonsReleased;
			controller.joystick = joystick;
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

	var _participants = [];

	var _highlightedControllersToParticipants = { };
	var _assignedParticipantsToControllers = { };

	var _colors	 = [
		'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'];

	var _controllerColors = [];

	function createCSSClass(selector, style) 
	{
		
		if (!document.styleSheets) {
			return;
		}

		if (document.getElementsByTagName("head").length == 0) {
			return;
		}

		var stylesheet;
		var mediaType;
		if (document.styleSheets.length > 0) {
			for (i = 0; i < document.styleSheets.length; i++) {
				if (document.styleSheets[i].disabled) {
					continue;
				}
				var media = document.styleSheets[i].media;
				mediaType = typeof media;

				if (mediaType == "string") {
					if (media == "" || (media.indexOf("screen") != -1)) {
						styleSheet = document.styleSheets[i];
					}
				} else if (mediaType == "object") {
					if (media.mediaText == "" || (media.mediaText.indexOf("screen") != -1)) {
						styleSheet = document.styleSheets[i];
					}
				}

				if (typeof styleSheet != "undefined") {
					break;
				}
			}
		}

		if (typeof styleSheet == "undefined") {
			var styleSheetElement = document.createElement("style");
			styleSheetElement.type = "text/css";

			document.getElementsByTagName("head")[0].appendChild(styleSheetElement);

			for (i = 0; i < document.styleSheets.length; i++) {
				if (document.styleSheets[i].disabled) {
					continue;
				}
				styleSheet = document.styleSheets[i];
			}

			var media = styleSheet.media;
			mediaType = typeof media;
		}

		if (mediaType == "string") {
			for (i = 0; i < styleSheet.rules.length; i++) {
				if (styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
					styleSheet.rules[i].style.cssText = style;
					return;
				}
			}

			styleSheet.addRule(selector, style);
		} else if (mediaType == "object") {
			for (i = 0; i < styleSheet.cssRules.length; i++) {
				if (styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
					styleSheet.cssRules[i].style.cssText = style;
					return;
				}
			}

			styleSheet.insertRule(selector + "{" + style + "}", 0);
		}
	}
	
	function removeParticipantHighlight(controllerId, participant) {
		
		var cssClass = 'pm-js-participant-controller-selection-' + controllerId;
		
		var pContainer = $('#pm-js-participant-controller-selection-' + participant);

		pContainer.removeClass(cssClass);

	}
	
	function addParticipantHighlight(controllerId, participant) {
		
		var borderColor;
		
		var cssClass = 'pm-js-participant-controller-selection-' + controllerId;
		
		if (!_controllerColors[controllerId]) {
			_controllerColors[controllerId] = borderColor = _colors.pop();
			createCSSClass('.' + cssClass, 'border: 5px solid ' + borderColor + '; -moz-border-radius: 15px; -webkit-border-radius: 15px');
		}
		
		var pContainer = $('#pm-js-participant-controller-selection-' + participant);
		
		pContainer.addClass(cssClass);
		
	}
	
	function constructOverlay (participants) {

		if (participants.length === 0) {
			return;
		}
	 	
	   var overlay = $('<div id="assignGameControllersOverlay" class="assignGameControllersOverlay"></div>');

	   for (var i = 0; i < participants.length; i++) {
	   	var currentParticipant = participants[i];
	   	// TODO: Varför har jag inte ID här?
	   	var participant = $('<div id="pm-js-participant-controller-selection-'+ i +'"><div class="participant-image"><img src="' + currentParticipant.imageUrl + '" width="128" height="128"></img></div><div class="name-container"><div class="fittext1 participant-name">' + currentParticipant.name +'</div></div></div>');
	   	
		participant.data("participantId", currentParticipant.id);
	   	
	   	overlay.append(participant);
	   }
	  
	 	$('body').append(overlay);
	};

	controllerSelector.assignGameControllers = function(
		gameControllersAssigned,
		participants,
		participantController
	) {

		_highlightedControllersToParticipants = { };
		_assignedParticipantsToControllers = { };
		
		var navigateParticipant = function(controllerId, mod) {

			var participantCount = participants.length;
			
			var oldparticipant = (_highlightedControllersToParticipants[controllerId] > -1 ) ? _highlightedControllersToParticipants[controllerId] : -1;

			var participant = oldparticipant + mod;
			
			if (participant > participantCount - 1) {
				participant = 0;
			}
			else if (participant < 0) {
				participant = participantCount - 1;
			}
			
			while(_assignedParticipantsToControllers[participant]) {
				participant += mod;
				if (participant > participantCount - 1) {
				participant = 0;
				}
				else if (participant < 0) {
					participant = participantCount - 1;
				}
			}
			
			_highlightedControllersToParticipants[controllerId] = participant;

			if (oldparticipant != -1)
				removeParticipantHighlight(controllerId, oldparticipant);
				
			addParticipantHighlight(controllerId, participant);
			
		};
	
		var gamepadPressed = function (left, up, right, down, controllerId) {
			if (left) {
				navigateParticipant(controllerId, -1);
			} else if (right) {
				navigateParticipant(controllerId, 1);
			}
		};

		var buttonsPressed = function (buttonA, buttonB, buttonC, buttonD, controllerId) {
		    var participant = _highlightedControllersToParticipants[controllerId];
		   
		    if (typeof participant === "undefined") {
		        return;
		    }
		   
		    if (typeof _assignedParticipantsToControllers[controllerId] !== "undefined") {
				return;
			}

			_assignedParticipantsToControllers[participant] = controllerId;

            var p = participants[participant];

            controllers.mapController(p.gameController.gamepadPressed, p.gameController.gamepadReleased, p.gameController.buttonsPressed, p.gameController.buttonsReleased, p.gameController.joystick, controllerId); 
                      
			if (Object.keys(_assignedParticipantsToControllers).length === participants.length)
			{
			    if (typeof gameControllersAssigned === "undefined") {
    			    return;
    		    }

                $("#assignGameControllersOverlay").remove();
                
    		    gameControllersAssigned();

			}
            

            		    
		};

		var buttonsReleased = function() {};
		var gamepadReleased = function() {};
		var joystick = function() {};

		controllers.mapControllers(gamepadPressed, gamepadReleased, buttonsPressed, buttonsReleased, joystick);

		constructOverlay(participants);

//		for (var i = 0; i < participants.length; i++) {

//			_gameControllerMap[i] = participants[i];

//			if (typeof participants[i] === "undefined") {
//				continue;
//			}

//			if (typeof participants[i].gameController === "undefined") {
//				participants[i].gameController =
//					{
//						joystick: function(x, y) { },
//						gamepadPressed: function(left, up, right, down) { },
//						gamepadReleased: function(left, up, right, down) { },
//						buttonsPressed: function(buttonA, buttonB, buttonC, buttonD) { },
//						buttonsReleased: function(buttonA, buttonB, buttonC, buttonD) { }
//					};
//			}

//		}


	};

} (window.partyMachineParticipantControllerSelectors = window.partyMachineParticipantControllerSelectors || {}, partyMachineControllers, jQuery));



(function (controllers, $, undefined) {

	var _controllers = [];

	var _loadedModules = [];
	var _modulesWaitingForCompletion = [];
	var _modulesTimedout = [];
	var _moduleTimeout = 15000;
	var _modulePollInterval = 50;
	var _whenControllersReady;

	controllers.start = function () {

	};

	controllers.whenControllersReady = function (callback) {

		var poller = function (cback) {
			var noModulesWaitingForCompletion = _modulesWaitingForCompletion.length === 0;
			
			if (noModulesWaitingForCompletion) {
				console.log("partymachine.controllers.js, no modules waiting for completion, fire callback!");
				cback();
			}
			else {
				console.log("partymachine.controllers.js, there are modules waiting for completion");
				_whenControllersReady = setTimeout(function () { poller(cback); }, _modulePollInterval);
			}
		};

		_whenControllersReady = setTimeout(function () { poller(callback); }, _modulePollInterval);
	};

	controllers.registerModuleTimeout = function (moduleId) {

		var registeredModuleForTimeout = false, m = 0;

		for (m = 0; m < _modulesWaitingForCompletion.length; m++) {

			var module = _modulesWaitingForCompletion[m];

			if (module.id === moduleId) {
				_modulesTimedout.push(module);
				registeredModuleForTimeout = true;
				break;
			}

		}

		if (registeredModuleForTimeout) {

			console.log("partymachine.controllers.js, module " + moduleId + " timed out after " + _moduleTimeout + " ms");
			
			_modulesWaitingForCompletion.splice(m, 1);
		}

	};

	controllers.registerModuleCompletion = function (moduleId) {

		var registeredModuleForCompletion = false, m = 0;

		for (m = 0; m < _modulesWaitingForCompletion.length; m++) {

			var module = _modulesWaitingForCompletion[m];

			if (module.id === moduleId) {
				clearTimeout(module.timeout);
				_loadedModules.push(module);
				registeredModuleForCompletion = true;
				break;
			}

		}

		if (registeredModuleForCompletion) {
			_modulesWaitingForCompletion.splice(m, 1);
		}

	};

	controllers.registerModule = function (moduleId) {

		var module = {};

		module.id = moduleId;
		module.timeout = setTimeout(function () {
			controllers.registerModuleTimeout(moduleId);
		},
			_moduleTimeout
		);

		_modulesWaitingForCompletion.push(module);
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

	controllers.getControllers = function () {
		return _controllers;
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

}(window.partyMachineControllers = window.partyMachineControllers || {}, jQuery));

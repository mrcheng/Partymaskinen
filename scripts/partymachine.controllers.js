(function (controllers, $, undefined) {

	var _gameControllerMap = [];

	// TODO: create virtual game controller class
	var _joy0Left = false,
    _joy0Up = false,
    _joy0Right = false,
    _joy0Down = false,
	_joy0ButtonADown = false,
    _joy0ButtonBDown = false;

	var _joy1Left = false,
    _joy1Up = false,
    _joy1Right = false,
    _joy1Down = false,
	_joy1ButtonADown = false,
    _joy1ButtonBDown = false;

	var _joy2Left = false,
    _joy2Up = false,
    _joy2Right = false,
    _joy2Down = false,
	_joy2ButtonADown = false,
    _joy2ButtonBDown = false;

	function virtualGameController(e, keyDown) {
		if (e.keyCode == 37
			|| e.keyCode == 38
				|| e.keyCode == 39
					|| e.keyCode == 40
						|| e.keyCode == 46
							|| e.keyCode == 34) {
			e.preventDefault();

			var p = _gameControllerMap[0];
			if (p) {
				if (e.keyCode == 37) {
					if (keyDown && !_joy0Left) {
						_joy0Left = true;
						p.gameController.gamepadPressed(true, false, false, false);
					}
					else if (!keyDown && _joy0Left) {
						_joy0Left = false;
						p.gameController.gamepadReleased(true, false, false, false);
					}
				}
				else if (e.keyCode == 38) {
					if (keyDown && !_joy0Up) {
						_joy0Up = true;
						p.gameController.gamepadPressed(false, true, false, false);
					}
					else if (!keyDown && _joy0Up) {
						_joy0Up = false;
						p.gameController.gamepadReleased(false, true, false, false);
					}
				}
				else if (e.keyCode == 39) {
					if (keyDown && !_joy0Right) {
						_joy0Right = true;
						p.gameController.gamepadPressed(false, false, true, false);
					}
					else if (!keyDown && _joy0Right) {
						_joy0Right = false;
						p.gameController.gamepadReleased(false, false, true, false);
					}
				}
				else if (e.keyCode == 40) {
					if (keyDown && !_joy0Down) {
						_joy0Down = true;
						p.gameController.gamepadPressed(false, false, false, true);
					}
					else if (!keyDown && _joy0Down) {
						_joy0Down = false;
						p.gameController.gamepadReleased(false, false, false, true);
					}
				}
				else if (e.keyCode == 46) {
					if (keyDown && !_joy0ButtonADown) {
						_joy0ButtonADown = true;
						p.gameController.buttonsPressed(true, false, false, false);
					}
					else if (!keyDown && _joy0ButtonADown) {
						_joy0ButtonADown = false;
						p.gameController.buttonsPressed(true, false, false, false);
					}
				}
				else if (e.keyCode == 34) {
					if (keyDown && !_joy0ButtonBDown) {
						_joy0ButtonBDown = true;
						p.gameController.buttonsPressed(false, true, false, false);
					}
					else if (!keyDown && _joy0ButtonBDown) {
						_joy0ButtonBDown = false;
						p.gameController.buttonsPressed(false, true, false, false);
					}
				}

				var x;
				if (_joy0Left && !_joy0Right)
					x = -1;
				else if (_joy0Right && !_joy0Left)
					x = 1;
				else
					x = 0;

				var y;
				if (_joy0Up && !_joy0Down)
					y = -1;
				else if (_joy0Down && !_joy0Up)
					y = 1;
				else
					y = 0;

				p.gameController.joystick(x, y);
			}
		}

		if (e.keyCode == 65
			|| e.keyCode == 87
				|| e.keyCode == 68
					|| e.keyCode == 83
						|| e.keyCode == 81
							|| e.keyCode == 69) {
			e.preventDefault();

			var p = _gameControllerMap[1];
			if (p) {
				if (e.keyCode == 65) {
					if (keyDown && !_joy1Left) {
						_joy1Left = true;
						p.gameController.gamepadPressed(true, false, false, false);
					}
					else if (!keyDown && _joy1Left) {
						_joy1Left = false;
						p.gameController.gamepadReleased(true, false, false, false);
					}
				}
				else if (e.keyCode == 87) {
					if (keyDown && !_joy1Up) {
						_joy1Up = true;
						p.gameController.gamepadPressed(false, true, false, false);
					}
					else if (!keyDown && _joy1Up) {
						_joy1Up = false;
						p.gameController.gamepadReleased(false, true, false, false);
					}
				}
				else if (e.keyCode == 68) {
					if (keyDown && !_joy1Right) {
						_joy1Right = true;
						p.gameController.gamepadPressed(false, false, true, false);
					}
					else if (!keyDown && _joy1Right) {
						_joy1Right = false;
						p.gameController.gamepadReleased(false, false, true, false);
					}
				}
				else if (e.keyCode == 83) {
					if (keyDown && !_joy1Down) {
						_joy1Down = true;
						p.gameController.gamepadPressed(false, false, false, true);
					}
					else if (!keyDown && _joy1Down) {
						_joy1Down = false;
						p.gameController.gamepadReleased(false, false, false, true);
					}
				}
				else if (e.keyCode == 81) {
					if (keyDown && !_joy1ButtonADown) {
						_joy1ButtonADown = true;
						p.gameController.buttonsPressed(true, false, false, false);
					}
					else if (!keyDown && _joy1ButtonADown) {
						_joy1ButtonADown = false;
						p.gameController.buttonsReleased(true, false, false, false);
					}
				}
				else if (e.keyCode == 69) {
					if (keyDown && !_joy1ButtonBDown) {
						_joy1ButtonBDown = true;
						p.gameController.buttonsPressed(false, true, false, false);
					}
					else if (!keyDown && _joy1ButtonBDown) {
						_joy1ButtonBDown = false;
						p.gameController.buttonsReleased(false, true, false, false);
					}
				}

				var x;
				if (_joy1Left && !_joy1Right)
					x = -1;
				else if (_joy1Right && !_joy1Left)
					x = 1;
				else
					x = 0;

				var y;
				if (_joy1Up && !_joy1Down)
					y = -1;
				else if (_joy1Down && !_joy1Up)
					y = 1;
				else
					y = 0;

				p.gameController.joystick(x, y);
			}
		}

		if (e.keyCode == 74
			|| e.keyCode == 73
				|| e.keyCode == 76
					|| e.keyCode == 75
						|| e.keyCode == 85
							|| e.keyCode == 79) {
			e.preventDefault();

			var p = _gameControllerMap[2];
			if (p) {
				if (e.keyCode == 74) {
					if (keyDown && !_joy2Left) {
						_joy2Left = true;
						p.gameController.gamepadPressed(true, false, false, false);
					}
					else if (!keyDown && _joy2Left) {
						_joy2Left = false;
						p.gameController.gamepadReleased(true, false, false, false);
					}
				}
				else if (e.keyCode == 73) {
					if (keyDown && !_joy2Up) {
						_joy2Up = true;
						p.gameController.gamepadPressed(false, true, false, false);
					}
					else if (!keyDown && _joy2Up) {
						_joy2Up = false;
						p.gameController.gamepadReleased(false, true, false, false);
					}
				}
				else if (e.keyCode == 76) {
					if (keyDown && !_joy2Right) {
						_joy2Right = true;
						p.gameController.gamepadPressed(false, false, true, false);
					}
					else if (!keyDown && _joy2Right) {
						_joy2Right = false;
						p.gameController.gamepadReleased(false, false, true, false);
					}
				}
				else if (e.keyCode == 75) {
					if (keyDown && !_joy2Down) {
						_joy2Down = true;
						p.gameController.gamepadPressed(false, false, false, true);
					}
					else if (!keyDown && _joy2Down) {
						_joy2Down = false;
						p.gameController.gamepadReleased(false, false, false, true);
					}
				}
				else if (e.keyCode == 85) {
					if (keyDown && !_joy2ButtonADown) {
						_joy2ButtonADown = true;
						p.gameController.buttonsPressed(true, false, false, false);
					}
					else if (!keyDown && _joy2ButtonADown) {
						_joy2ButtonADown = false;
						p.gameController.buttonsReleased(true, false, false, false);
					}
				}
				else if (e.keyCode == 79) {
					if (keyDown && !_joy2ButtonBDown) {
						_joy2ButtonBDown = true;
						p.gameController.buttonsPressed(false, true, false, false);
					}
					else if (!keyDown && _joy2ButtonBDown) {
						_joy2ButtonBDown = false;
						p.gameController.buttonsReleased(false, true, false, false);
					}
				}

				var x;
				if (_joy2Left && !_joy2Right)
					x = -1;
				else if (_joy2Right && !_joy2Left)
					x = 1;
				else
					x = 0;

				var y;
				if (_joy2Up && !_joy2Down)
					y = -1;
				else if (_joy2Down && !_joy2Up)
					y = 1;
				else
					y = 0;

				p.gameController.joystick(x, y);
			}
		}
	}

	controllers.stub = function () {
		window.addEventListener('keydown', function (e) {
			virtualGameController(e, true);
		}, true);

		window.addEventListener('keyup', function (e) {
			virtualGameController(e, false);
		}, true);

	},

	controllers.start = function (participants) {

		this.assignGameControllers(
			undefined,
			participants
		);

	},

	function gameControllerJoystickChanged(controllerId, x, y) {
		var p = _gameControllerMap[controllerId];
		if (p)
			p.gameController.joystick(x, y);
	},

	function gameControllerGamepadPressed(controllerId, left, up, right, down) {
		var p = _gameControllerMap[controllerId];
		if (p)
			p.gameController.gamepadPressed(left, up, right, down);
	},

	function gameControllerGamepadReleased(controllerId, left, up, right, down) {
		var p = _gameControllerMap[controllerId];
		if (p)
			p.gameController.gamepadReleased(left, up, right, down);
	},

	function gameControllerButtonsPressed(controllerId, buttonA, buttonB, buttonC, buttonD) {
		var p = _gameControllerMap[controllerId];
		if (p)
			p.gameController.buttonsPressed(buttonA, buttonB, buttonC, buttonD);
	},

	function gameControllerButtonsReleased(controllerId, buttonA, buttonB, buttonC, buttonD) {
		var p = _gameControllerMap[controllerId];
		if (p)
			p.gameController.buttonsReleased(buttonA, buttonB, buttonC, buttonD);
	},

	controllers.assignGameControllers = function (
		gameControllersAssigned,
		participants
	) {

		for (var i = 0; i < participants.length; i++) {

			_gameControllerMap[i] = participants[i];

			if (typeof participants[i] === "undefined") {
				continue;
			}

			if (typeof participants[i].gameController === "undefined") {
				participants[i].gameController =
					{
						joystick: function(x, y) { },
						gamepadPressed: function(left, up, right, down) { },
						gamepadReleased: function(left, up, right, down) { },
						buttonsPressed: function(buttonA, buttonB, buttonC, buttonD) { },
						buttonsReleased: function(buttonA, buttonB, buttonC, buttonD) { }
					};
			}

		}

		if (typeof gameControllersAssigned === "undefined") {
			return;
		}

		gameControllersAssigned();

	}

} (window.partyMachineControllers = window.partyMachineControllers || {}, jQuery));

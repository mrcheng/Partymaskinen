if (typeof KeyEvent == "undefined") {
	var KeyEvent = {
		DOM_VK_CANCEL: 3,
		DOM_VK_HELP: 6,
		DOM_VK_BACK_SPACE: 8,
		DOM_VK_TAB: 9,
		DOM_VK_CLEAR: 12,
		DOM_VK_RETURN: 13,
		DOM_VK_ENTER: 14,
		DOM_VK_SHIFT: 16,
		DOM_VK_CONTROL: 17,
		DOM_VK_ALT: 18,
		DOM_VK_PAUSE: 19,
		DOM_VK_CAPS_LOCK: 20,
		DOM_VK_ESCAPE: 27,
		DOM_VK_SPACE: 32,
		DOM_VK_PAGE_UP: 33,
		DOM_VK_PAGE_DOWN: 34,
		DOM_VK_END: 35,
		DOM_VK_HOME: 36,
		DOM_VK_LEFT: 37,
		DOM_VK_UP: 38,
		DOM_VK_RIGHT: 39,
		DOM_VK_DOWN: 40,
		DOM_VK_PRINTSCREEN: 44,
		DOM_VK_INSERT: 45,
		DOM_VK_DELETE: 46,
		DOM_VK_0: 48,
		DOM_VK_1: 49,
		DOM_VK_2: 50,
		DOM_VK_3: 51,
		DOM_VK_4: 52,
		DOM_VK_5: 53,
		DOM_VK_6: 54,
		DOM_VK_7: 55,
		DOM_VK_8: 56,
		DOM_VK_9: 57,
		DOM_VK_SEMICOLON: 59,
		DOM_VK_EQUALS: 61,
		DOM_VK_A: 65,
		DOM_VK_B: 66,
		DOM_VK_C: 67,
		DOM_VK_D: 68,
		DOM_VK_E: 69,
		DOM_VK_F: 70,
		DOM_VK_G: 71,
		DOM_VK_H: 72,
		DOM_VK_I: 73,
		DOM_VK_J: 74,
		DOM_VK_K: 75,
		DOM_VK_L: 76,
		DOM_VK_M: 77,
		DOM_VK_N: 78,
		DOM_VK_O: 79,
		DOM_VK_P: 80,
		DOM_VK_Q: 81,
		DOM_VK_R: 82,
		DOM_VK_S: 83,
		DOM_VK_T: 84,
		DOM_VK_U: 85,
		DOM_VK_V: 86,
		DOM_VK_W: 87,
		DOM_VK_X: 88,
		DOM_VK_Y: 89,
		DOM_VK_Z: 90,
		DOM_VK_CONTEXT_MENU: 93,
		DOM_VK_NUMPAD0: 96,
		DOM_VK_NUMPAD1: 97,
		DOM_VK_NUMPAD2: 98,
		DOM_VK_NUMPAD3: 99,
		DOM_VK_NUMPAD4: 100,
		DOM_VK_NUMPAD5: 101,
		DOM_VK_NUMPAD6: 102,
		DOM_VK_NUMPAD7: 103,
		DOM_VK_NUMPAD8: 104,
		DOM_VK_NUMPAD9: 105,
		DOM_VK_MULTIPLY: 106,
		DOM_VK_ADD: 107,
		DOM_VK_SEPARATOR: 108,
		DOM_VK_SUBTRACT: 109,
		DOM_VK_DECIMAL: 110,
		DOM_VK_DIVIDE: 111,
		DOM_VK_F1: 112,
		DOM_VK_F2: 113,
		DOM_VK_F3: 114,
		DOM_VK_F4: 115,
		DOM_VK_F5: 116,
		DOM_VK_F6: 117,
		DOM_VK_F7: 118,
		DOM_VK_F8: 119,
		DOM_VK_F9: 120,
		DOM_VK_F10: 121,
		DOM_VK_F11: 122,
		DOM_VK_F12: 123,
		DOM_VK_F13: 124,
		DOM_VK_F14: 125,
		DOM_VK_F15: 126,
		DOM_VK_F16: 127,
		DOM_VK_F17: 128,
		DOM_VK_F18: 129,
		DOM_VK_F19: 130,
		DOM_VK_F20: 131,
		DOM_VK_F21: 132,
		DOM_VK_F22: 133,
		DOM_VK_F23: 134,
		DOM_VK_F24: 135,
		DOM_VK_NUM_LOCK: 144,
		DOM_VK_SCROLL_LOCK: 145,
		DOM_VK_COMMA: 188,
		DOM_VK_PERIOD: 190,
		DOM_VK_SLASH: 191,
		DOM_VK_BACK_QUOTE: 192,
		DOM_VK_OPEN_BRACKET: 219,
		DOM_VK_BACK_SLASH: 220,
		DOM_VK_CLOSE_BRACKET: 221,
		DOM_VK_QUOTE: 222,
		DOM_VK_META: 224
	};
}


(function (keyboard, partyMachineControllers, $, undefined) {
	
	_interpretor = partyMachineControllers;

	_interpretor.registerInput("keyboard_arrowkeys");
	_interpretor.registerInput("keyboard_WASDQE");
	_interpretor.registerInput("keyboard_JILKUO");
		
	window.addEventListener('keydown', function(e) {
		processKeyboard(e, true);
	}, true);

	window.addEventListener('keyup', function(e) {
		processKeyboard(e, false);
	}, true);
	
	var _interpretor;

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


	function handleArrowKeysController(e, keyDown) {
		
		var controllerId = "keyboard_arrowkeys";
		
		e.preventDefault();

		if (e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if (keyDown && !_joy0Left) {
				_joy0Left = true;
				_interpretor.gamepadPressed(true, false, false, false, controllerId);
			} else if (!keyDown && _joy0Left) {
				_joy0Left = false;
				_interpretor.gamepadReleased(true, false, false, false, controllerId);
			}
		} else if (e.keyCode == KeyEvent.DOM_VK_UP) {
			if (keyDown && !_joy0Up) {
				_joy0Up = true;
				_interpretor.gamepadPressed(false, true, false, false, controllerId);
			} else if (!keyDown && _joy0Up) {
				_joy0Up = false;
				_interpretor.gamepadReleased(false, true, false, false, controllerId);
			}
		} else if (e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if (keyDown && !_joy0Right) {
				_joy0Right = true;
				_interpretor.gamepadPressed(false, false, true, false, controllerId);
			} else if (!keyDown && _joy0Right) {
				_joy0Right = false;
				_interpretor.gamepadReleased(false, false, true, false, controllerId);
			}
		} else if (e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (keyDown && !_joy0Down) {
				_joy0Down = true;
				_interpretor.gamepadPressed(false, false, false, true, controllerId);
			} else if (!keyDown && _joy0Down) {
				_joy0Down = false;
				_interpretor.gamepadReleased(false, false, false, true, controllerId);
			}
		} else if (e.keyCode == KeyEvent.DOM_VK_DELETE) {
			if (keyDown && !_joy0ButtonADown) {
				_joy0ButtonADown = true;
				_interpretor.buttonsPressed(true, false, false, false, controllerId);
			} else if (!keyDown && _joy0ButtonADown) {
				_joy0ButtonADown = false;
				_interpretor.buttonsPressed(true, false, false, false, controllerId);
			}
		} else if (e.keyCode == KeyEvent.DOM_VK_PAGE_DOWN) {
			if (keyDown && !_joy0ButtonBDown) {
				_joy0ButtonBDown = true;
				_interpretor.buttonsPressed(false, true, false, false, controllerId);
			} else if (!keyDown && _joy0ButtonBDown) {
				_joy0ButtonBDown = false;
				_interpretor.buttonsPressed(false, true, false, false, controllerId);
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

		_interpretor.joystick(x, y, controllerId);
	};


	function handleWASDQEKeys(e, keyDown) {
		var controllerId = "keyboard_WASDQE";
		e.preventDefault();

		if (e.keyCode == KeyEvent.DOM_VK_A) {
			if (keyDown && !_joy1Left) {
				_joy1Left = true;
				_interpretor.gamepadPressed(true, false, false, false, controllerId);
			}
			else if (!keyDown && _joy1Left) {
				_joy1Left = false;
				_interpretor.gamepadReleased(true, false, false, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_W) {
			if (keyDown && !_joy1Up) {
				_joy1Up = true;
				_interpretor.gamepadPressed(false, true, false, false, controllerId);
			}
			else if (!keyDown && _joy1Up) {
				_joy1Up = false;
				_interpretor.gamepadReleased(false, true, false, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_D) {
			if (keyDown && !_joy1Right) {
				_joy1Right = true;
				_interpretor.gamepadPressed(false, false, true, false, controllerId);
			}
			else if (!keyDown && _joy1Right) {
				_joy1Right = false;
				_interpretor.gamepadReleased(false, false, true, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_S) {
			if (keyDown && !_joy1Down) {
				_joy1Down = true;
				_interpretor.gamepadPressed(false, false, false, true, controllerId);
			}
			else if (!keyDown && _joy1Down) {
				_joy1Down = false;
				_interpretor.gamepadReleased(false, false, false, true, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_Q) {
			if (keyDown && !_joy1ButtonADown) {
				_joy1ButtonADown = true;
				_interpretor.buttonsPressed(true, false, false, false, controllerId);
			}
			else if (!keyDown && _joy1ButtonADown) {
				_joy1ButtonADown = false;
				_interpretor.buttonsReleased(true, false, false, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_E) {
			if (keyDown && !_joy1ButtonBDown) {
				_joy1ButtonBDown = true;
				_interpretor.buttonsPressed(false, true, false, false, controllerId);
			}
			else if (!keyDown && _joy1ButtonBDown) {
				_joy1ButtonBDown = false;
				_interpretor.buttonsReleased(false, true, false, false, controllerId);
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

		_interpretor.joystick(x, y, controllerId);
	};


	function handleJILKUOKeys(e, keyDown) {
		var controllerId = "keyboard_JILKUO";
		
		e.preventDefault();

		if (e.keyCode == KeyEvent.DOM_VK_J) {
			if (keyDown && !_joy2Left) {
				_joy2Left = true;
				_interpretor.gamepadPressed(true, false, false, false, controllerId);
			}
			else if (!keyDown && _joy2Left) {
				_joy2Left = false;
				_interpretor.gamepadReleased(true, false, false, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_I) {
			if (keyDown && !_joy2Up) {
				_joy2Up = true;
				_interpretor.gamepadPressed(false, true, false, false, controllerId);
			}
			else if (!keyDown && _joy2Up) {
				_joy2Up = false;
				_interpretor.gamepadReleased(false, true, false, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_L) {
			if (keyDown && !_joy2Right) {
				_joy2Right = true;
				_interpretor.gamepadPressed(false, false, true, false, controllerId);
			}
			else if (!keyDown && _joy2Right) {
				_joy2Right = false;
				_interpretor.gamepadReleased(false, false, true, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_K) {
			if (keyDown && !_joy2Down) {
				_joy2Down = true;
				_interpretor.gamepadPressed(false, false, false, true, controllerId);
			}
			else if (!keyDown && _joy2Down) {
				_joy2Down = false;
				_interpretor.gamepadReleased(false, false, false, true, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_U) {
			if (keyDown && !_joy2ButtonADown) {
				_joy2ButtonADown = true;
				_interpretor.buttonsPressed(true, false, false, false, controllerId);
			}
			else if (!keyDown && _joy2ButtonADown) {
				_joy2ButtonADown = false;
				_interpretor.buttonsReleased(true, false, false, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_O) {
			if (keyDown && !_joy2ButtonBDown) {
				_joy2ButtonBDown = true;
				_interpretor.buttonsPressed(false, true, false, false, controllerId);
			}
			else if (!keyDown && _joy2ButtonBDown) {
				_joy2ButtonBDown = false;
				_interpretor.buttonsReleased(false, true, false, false, controllerId);
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
				

		_interpretor.joystick(x, y, controllerId);	
	
	};
	
	function processKeyboard(e, keyDown) {
		if (e.keyCode == KeyEvent.DOM_VK_LEFT
			|| e.keyCode == KeyEvent.DOM_VK_UP
				|| e.keyCode == KeyEvent.DOM_VK_RIGHT
					|| e.keyCode == KeyEvent.DOM_VK_DOWN
						|| e.keyCode == KeyEvent.DOM_VK_DELETE
							|| e.keyCode == KeyEvent.DOM_VK_PAGE_DOWN) {
			handleArrowKeysController(e, keyDown);
		}


		if (e.keyCode == KeyEvent.DOM_VK_A
			|| e.keyCode == KeyEvent.DOM_VK_W
				|| e.keyCode == KeyEvent.DOM_VK_D
					|| e.keyCode == KeyEvent.DOM_VK_S
						|| e.keyCode == KeyEvent.DOM_VK_Q
							|| e.keyCode == KeyEvent.DOM_VK_E) {
			handleWASDQEKeys(e, keyDown);
		}
		

		if (e.keyCode == KeyEvent.DOM_VK_J
			|| e.keyCode == KeyEvent.DOM_VK_I
				|| e.keyCode == KeyEvent.DOM_VK_L
					|| e.keyCode == KeyEvent.DOM_VK_K
						|| e.keyCode == KeyEvent.DOM_VK_U
							|| e.keyCode == KeyEvent.DOM_VK_O) {
			handleJILKUOKeys(e, keyDown);
		}
		
	};

	keyboard.start = function() {
		
		_interpretor = partyMachineControllers;

		_interpretor.registerInput("keyboard_arrowkeys");
		_interpretor.registerInput("keyboard_WASDQE");
		_interpretor.registerInput("keyboard_JILKUO");
		
		window.addEventListener('keydown', function(e) {
			processKeyboard(e, true);
		}, true);

		window.addEventListener('keyup', function(e) {
			processKeyboard(e, false);
		}, true);

	};
	
} (window.partyMachineKeyboardControllers = window.partyMachineKeyboardControllers || {}, partyMachineControllers, jQuery));
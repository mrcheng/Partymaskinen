
(function (boomstick, partyMachineControllers, $, undefined) {

	var UP = 1;
	var DOWN = 16;
	var RIGHT = 256;
	var LEFT = 4096;

	var BUTTON_0 = 1;
	var BUTTON_1 = 2;
	var BUTTON_2 = 4;
	var BUTTON_3 = 8;

	//	$('body').append('<object id="boomstickplugin" type="application/x-boomstickjavascriptjoysticksupport" width="0" height="0"></object>');

	if (typeof boomstickplugin === "undefined") {
		return;
	}

	var _interpretor = partyMachineControllers;


	(function () {

		var joysticks = JSON.parse(boomstickplugin.joysticksJSON());

		for (var j = 0; j < joysticks.length; j++) {
			_interpretor.registerInput("boomstick_" + j);
		}

		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame =
          window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function (callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function () { callback(currTime + timeToCall); },
              timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function (id) {
				clearTimeout(id);
			};
	} ());

	window.requestAnimationFrame(pollJoysticks);

	function pollJoysticks() {

		var joysticks = JSON.parse(boomstickplugin.joysticksJSON());

		for (var j = 0; j < joysticks.length; j++) {
			var joystick = joysticks[j];

			//console.log("0: " + joystick.axes[0] + "1: " + joystick.axes[1] + " 2: " + joystick.axes[2] + " 3: " + joystick.axes[3] + " 4: " + joystick.axes[4]);
			//console.log(joystick.buttons);
			//console.log(joystick.pov);

			var controllerId = "boomstick_" + j;

			var up = joystick.pov & UP;
			var left = joystick.pov & LEFT;
			var right = joystick.pov & RIGHT;
			var down = joystick.pov & DOWN;

			_interpretor.gamepadPressed(left, up, right, down, controllerId);

			var buttonA = joystick.buttons & BUTTON_0;
			var buttonB = joystick.buttons & BUTTON_1;
			var buttonC = joystick.buttons & BUTTON_2;
			var buttonD = joystick.buttons & BUTTON_3;

			_interpretor.buttonsPressed(buttonA, buttonB, buttonC, buttonD, controllerId);

			var x = (joystick.axes[2] === -256 || joystick.axes[2] === 0) ? 0 : joystick.axes[2];
			var y = (joystick.axes[3] === -256 || joystick.axes[3] === 0) ? 0 : joystick.axes[3];

			_interpretor.joystick(x, y, controllerId);


		}

		window.requestAnimationFrame(pollJoysticks);
	};

} (window.partyMachineBoomstickControllers = window.partyMachineBoomstickControllers || {}, partyMachineControllers, jQuery));
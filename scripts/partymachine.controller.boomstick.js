/**
Get the sign of this number as an integer (1, -1, or 0).

<code><pre>
(-5).sign()
# => -1

0.sign()
# => 0

5.sign()
# => 1
</pre></code>

@name sign
@methodOf Number#
@returns {Number} The sign of this number, 0 if the number is 0.
*/
Number.prototype.sign = function() {
  if (this > 0) {
    return 1;
  } else if (this < 0) {
    return -1;
  } else {
    return 0;
  }
};

setTimeout( function() {

window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
  return window.setTimeout(function() {
    return callback(+new Date());
  }, 1000 / 60);
});

(function (boomstick, partyMachineControllers, $, undefined) {

	var boomstickpluginType = "application/x-boomstickjavascriptjoysticksupport";
	var boomstickplugin = null;


	var previousJoysticks;
	var joysticks;
	var _interpretor;

	var buttonMappingDefault = {
		"A": 1,
		"B": 2,
		"C": 4,
		"D": 8,
		"X": 4,
		"Y": 8,
		"R": 32,
		"RB": 32,
		"R1": 32,
		"L": 16,
		"LB": 16,
		"L1": 16,
		"SELECT": 64,
		"BACK": 64,
		"START": 128,
		"HOME": 256,
		"GUIDE": 256,
		"TL": 512,
		"TR": 1024,
		"ANY": 0xFFFFFF
	};

	var buttonMappingOSX = {
		"A": 2048,
		"B": 4096,
		"C": 8192,
		"D": 16384,
		"X": 8192,
		"Y": 16384,
		"R": 512,
		"L": 256,
		"SELECT": 32,
		"BACK": 32,
		"START": 16,
		"HOME": 1024,
		"LT": 64,
		"TR": 128,
		"ANY": 0xFFFFFF0
	};
	
    var lastStepTime = -Infinity;
    
	var UP = 1;
	var DOWN = 16;
	var RIGHT = 256;
	var LEFT = 4096;

	var BUTTON_0 = 1;
	var BUTTON_1 = 2;
	var BUTTON_2 = 4;
	var BUTTON_3 = 8;
	
	var periodicCheck, promptElement;

	var displayInstallPrompt = function (text, msg, url) {

		var cnt = $("<div/>", {
			css: {
				backgroundColor: "yellow",
				boxSizing: "border-box",
				color: "#000",
				display: "block",
				fontWeight: "bold",
				left: 0,
				padding: "1em",
				position: "absolute",
				textDecoration: "none",
				top: 0,
				width: "100%",
				zIndex: 2000
			}
		});
		
		var link = $("<a />", {
			css: {
							},
			href: url,
			target: "_blank",
			text: text
		});

		var msgElem = ('<p>' + msg + '<p/>') ;

		cnt.append(link).append(msgElem);
		
		return cnt.appendTo("body");
	};


	if (!boomstickplugin) {
		boomstickplugin = document.createElement("object");
		
		boomstickplugin.onreadystatechange = function(x) {
			if (boomstickplugin.readyState === 4) {
				if (!boomstickplugin.joysticksJSON) {
				    displayInstallPrompt("Your browser does not yet handle joysticks, please click here to install the Boomstick plugin!", "How to run: chrome.exe --always-authorize-plugins --enable-plugins --allow-outdated-plugins", "https://github.com/STRd6/Boomstick/wiki");
				}
			}
		};

		boomstickplugin.type = boomstickpluginType;
		boomstickplugin.width = 0;
		boomstickplugin.height = 0;
		boomstickplugin.setAttribute("id", "boomstickplugin");

		$("body").append(boomstickplugin);
		//boomstickplugin.maxAxes = 6;
		if (!(boomstickplugin != null && boomstickplugin.joysticksJSON)) {
			promptElement = displayInstallPrompt("Your browser does not yet handle joysticks, please click here to install the Boomstick plugin!", "How to run: chrome.exe --always-authorize-plugins --enable-plugins --allow-outdated-plugins", "https://github.com/STRd6/Boomstick/wiki");
			periodicCheck = function () {
				if (boomstickplugin != null && boomstickplugin.joysticksJSON) {
					init();
					return promptElement.remove();
				} else {
					//init();
					//return false;
					return setTimeout(periodicCheck, 500);
				}
			};
			return periodicCheck();
		} else {
			init();
		}
	}


     function animLoop(timestamp) {
      var delta, msPerFrame, remainder;
      timestamp || (timestamp = +new Date());
      msPerFrame = 1000 / 30;
      delta = timestamp - lastStepTime;
      remainder = delta - msPerFrame;
      if (remainder > 0) {
        lastStepTime = timestamp - Math.min(remainder, msPerFrame);
        pollJoysticks();
      }
      
      return window.requestAnimationFrame(animLoop);
      
    };

	function init() {

		_interpretor = partyMachineControllers;

		joysticks = JSON.parse(boomstickplugin.joysticksJSON());

		for (var j = 0; j < joysticks.length; j++) {
			_interpretor.registerInput("boomstick_" + j);
		}

        window.requestAnimationFrame(animLoop);

//		var lastTime = 0;
//		var vendors = ['ms', 'moz', 'webkit', 'o'];
//		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
//			window.cancelAnimationFrame =
//          window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
//		}

//		if (!window.requestAnimationFrame)
//			window.requestAnimationFrame = function (cintallback, element) {
//				var currTime = new Date().getTime();
//				var timeToCall = Math.max(0, 1000 - (currTime - lastTime));
//				var id = window.setTimeout(function () { callback(currTime + timeToCall); },
//              timeToCall);
//				lastTime = currTime + timeToCall;
//				return id;
//			};

//		if (!window.cancelAnimationFrame)
//			window.cancelAnimationFrame = function (id) {
//				clearTimeout(id);
//			};

//		window.requestAnimationFrame(pollJoysticks);

	};


	function pollJoysticks() {

		previousJoysticks = joysticks;
		joysticks = JSON.parse(boomstickplugin.joysticksJSON());

		for (var j = 0; j < joysticks.length; j++) {
			var joystick = joysticks[j];
			var previousJoystickState = previousJoysticks[j];
			//console.log("0: " + joystick.axes[0] + "1: " + joystick.axes[1] + " 2: " + joystick.axes[2] + " 3: " + joystick.axes[3] + " 4: " + joystick.axes[4]);
			//console.log(joystick.buttons);
			//console.log(joystick.pov);

			var controllerId = "boomstick_" + j;

			var up = (joystick.pov & UP) && ((!previousJoystickState.pov & UP) === 0);
			var left = (joystick.pov & LEFT) && ((!previousJoystickState.pov & LEFT) === 0);
			var right = (joystick.pov & RIGHT) && ((!previousJoystickState.pov & RIGHT) === 0);
			var down = (joystick.pov & DOWN) && ((!previousJoystickState.pov & DOWN) === 0);

			if (left || up || right || down) {
				_interpretor.gamepadPressed(left, up, right, down, controllerId);
			}

			var buttonA = (joystick.buttons & BUTTON_0) && ((!previousJoystickState.buttons & BUTTON_0) === 0);
			var buttonB = (joystick.buttons & BUTTON_1) && ((!previousJoystickState.buttons & BUTTON_1) === 0);
			var buttonC = (joystick.buttons & BUTTON_2) && ((!previousJoystickState.buttons & BUTTON_2) === 0);
			var buttonD = (joystick.buttons & BUTTON_3) && ((!previousJoystickState.buttons & BUTTON_3) === 0);

			if (buttonA || buttonB || buttonC || buttonD) {
				_interpretor.buttonsPressed(buttonA, buttonB, buttonC, buttonD, controllerId);
			}

            var x, y;
            
			var xAxis = joystick.axes[2];
			var yAxis = joystick.axes[3];

            if (!joystick.xAxisTrips) {
                joystick.xAxisTrips = true;
                x = parseInt(xAxis, 10).sign();
            }
            else if (joystick.xAxisTrips) {
                joystick.xAxisTrips = false;
                x = 0;
            }
            else {
                x = 0;
            }

            joystick.x = x;
            
            if (!joystick.yAxisTrips) {
                joystick.yAxisTrips = true;
                y = parseInt(yAxis, 10).sign();
            }
            else if (joystick.yAxisTrips) {
                joystick.yAxisTrips = false;
                y = 0;
            }
            else {
                y = 0;
            }

            joystick.y = y;

            if ((x !== previousJoystickState.x) || (y !== previousJoystickState.y)) {
                // tap?
			    _interpretor.joystick(x, y, controllerId);
            }
            
            
            
		}

		//window.requestAnimationFrame(pollJoysticks);
	};
} (window.partyMachineBoomstickControllers = window.partyMachineBoomstickControllers || {}, partyMachineControllers, jQuery));

}, 1000);
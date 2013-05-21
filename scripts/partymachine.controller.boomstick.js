(function (boomstick, partyMachineControllers, $, undefined) {
	
	(function () {
		/**
		Create a new point with given x and y coordinates. If no arguments are given
		defaults to (0, 0).
	  
		<code><pre>
		point = Point()
	  
		p.x
		# => 0
	  
		p.y
		# => 0
	  
		point = Point(-2, 5)
	  
		p.x
		# => -2
	  
		p.y
		# => 5
		</pre></code>
	  
		@name Point
		@param {Number} [x]
		@param {Number} [y]
		@constructor
		*/
		var Point;
		Point = function (x, y) {
			return {
				__proto__: Point.prototype,
				/**
				The x coordinate of this point.
				@name x
				@fieldOf Point#
				*/
				x: x || 0,
				/**
				The y coordinate of this point.
				@name y
				@fieldOf Point#
				*/
				y: y || 0
			};
		};
		Point.prototype = {
			/**
			Creates a copy of this point.
		
			@name copy
			@methodOf Point#
			@returns {Point} A new point with the same x and y value as this point.
		
			<code><pre>
			point = Point(1, 1)
			pointCopy = point.copy()
		
			point.equal(pointCopy)
			# => true
		
			point == pointCopy
			# => false     
			</pre></code>
			*/
			copy: function () {
				return Point(this.x, this.y);
			},
			/**
			Adds a point to this one and returns the new point. You may
			also use a two argument call like <code>point.add(x, y)</code>
			to add x and y values without a second point object.
		
			<code><pre>
			point = Point(2, 3).add(Point(3, 4))
		
			point.x
			# => 5
		
			point.y
			# => 7
		
			anotherPoint = Point(2, 3).add(3, 4)
		
			anotherPoint.x
			# => 5
		
			anotherPoint.y
			# => 7
			</pre></code>
		
			@name add
			@methodOf Point#
			@param {Point} other The point to add this point to.
			@returns {Point} A new point, the sum of both.
			*/
			add: function (first, second) {
				return this.copy().add$(first, second);
			},
			/**
			Adds a point to this one, returning a modified point. You may
			also use a two argument call like <code>point.add(x, y)</code>
			to add x and y values without a second point object.
		
			<code><pre>
			point = Point(2, 3)
		
			point.x
			# => 2
		
			point.y
			# => 3
		
			point.add$(Point(3, 4))
		
			point.x
			# => 5
		
			point.y
			# => 7
		
			anotherPoint = Point(2, 3)
			anotherPoint.add$(3, 4)
		
			anotherPoint.x
			# => 5
		
			anotherPoint.y
			# => 7
			</pre></code>
		
			@name add$
			@methodOf Point#
			@param {Point} other The point to add this point to.
			@returns {Point} The sum of both points.
			*/
			add$: function (first, second) {
				if (second != null) {
					this.x += first;
					this.y += second;
				} else {
					this.x += first.x;
					this.y += first.y;
				}
				return this;
			},
			/**
			Subtracts a point to this one and returns the new point.
		
			<code><pre>
			point = Point(1, 2).subtract(Point(2, 0))
		
			point.x
			# => -1
		
			point.y
			# => 2
		
			anotherPoint = Point(1, 2).subtract(2, 0)
		
			anotherPoint.x
			# => -1
		
			anotherPoint.y
			# => 2
			</pre></code>
		
			@name subtract
			@methodOf Point#
			@param {Point} other The point to subtract from this point.
			@returns {Point} A new point, this - other.
			*/
			subtract: function (first, second) {
				return this.copy().subtract$(first, second);
			},
			/**
			Subtracts a point to this one and returns the new point.
		
			<code><pre>
			point = Point(1, 2)
		
			point.x
			# => 1
		
			point.y
			# => 2
		
			point.subtract$(Point(2, 0))
		
			point.x
			# => -1
		
			point.y
			# => 2
		
			anotherPoint = Point(1, 2)
			anotherPoint.subtract$(2, 0)
		
			anotherPoint.x
			# => -1
		
			anotherPoint.y
			# => 2
			</pre></code>
		
			@name subtract$
			@methodOf Point#
			@param {Point} other The point to subtract from this point.
			@returns {Point} The difference of the two points.
			*/
			subtract$: function (first, second) {
				if (second != null) {
					this.x -= first;
					this.y -= second;
				} else {
					this.x -= first.x;
					this.y -= first.y;
				}
				return this;
			},
			/**
			Scale this Point (Vector) by a constant amount.
		
			<code><pre>
			point = Point(5, 6).scale(2)
		
			point.x
			# => 10
		
			point.y
			# => 12
			</pre></code>
		
			@name scale
			@methodOf Point#
			@param {Number} scalar The amount to scale this point by.
			@returns {Point} A new point, this * scalar.
			*/
			scale: function (scalar) {
				return this.copy().scale$(scalar);
			},
			/**
			Scale this Point (Vector) by a constant amount. Modifies the point in place.
		
			<code><pre>
			point = Point(5, 6)
		
			point.x
			# => 5
		
			point.y
			# => 6
		
			point.scale$(2)
		
			point.x
			# => 10
		
			point.y
			# => 12
			</pre></code>
		
			@name scale$
			@methodOf Point#
			@param {Number} scalar The amount to scale this point by.
			@returns {Point} this * scalar.
			*/
			scale$: function (scalar) {
				this.x *= scalar;
				this.y *= scalar;
				return this;
			},
			/**
			The norm of a vector is the unit vector pointing in the same direction. This method
			treats the point as though it is a vector from the origin to (x, y).
		
			<code><pre>
			point = Point(2, 3).norm()
		
			point.x
			# => 0.5547001962252291
		
			point.y  
			# => 0.8320502943378437
		
			anotherPoint = Point(2, 3).norm(2)
		
			anotherPoint.x
			# => 1.1094003924504583
		
			anotherPoint.y   
			# => 1.6641005886756874    
			</pre></code>
		
			@name norm
			@methodOf Point#
			@returns {Point} The unit vector pointing in the same direction as this vector.
			*/
			norm: function (length) {
				if (length == null) length = 1.0;
				return this.copy().norm$(length);
			},
			/**
			The norm of a vector is the unit vector pointing in the same direction. This method
			treats the point as though it is a vector from the origin to (x, y). Modifies the point in place.
		
			<code><pre>
			point = Point(2, 3).norm$()
		
			point.x
			# => 0.5547001962252291
		
			point.y  
			# => 0.8320502943378437
		
			anotherPoint = Point(2, 3).norm$(2)
		
			anotherPoint.x
			# => 1.1094003924504583
		
			anotherPoint.y   
			# => 1.6641005886756874    
			</pre></code>
		
			@name norm$
			@methodOf Point#
			@returns {Point} The unit vector pointing in the same direction as this vector.
			*/
			norm$: function (length) {
				var m;
				if (length == null) length = 1.0;
				if (m = this.length()) {
					return this.scale$(length / m);
				} else {
					return this;
				}
			},
			/**
			Floor the x and y values, returning a new point.
		
			<code><pre>
			point = Point(3.4, 5.8).floor()
		
			point.x
			# => 3
		
			point.y
			# => 5
			</pre></code>
		
			@name floor
			@methodOf Point#
			@returns {Point} A new point, with x and y values each floored to the largest previous integer.
			*/
			floor: function () {
				return this.copy().floor$();
			},
			/**
			Floor the x and y values, returning a modified point.
		
			<code><pre>
			point = Point(3.4, 5.8)
			point.floor$()
		
			point.x
			# => 3
		
			point.y
			# => 5
			</pre></code>
		
			@name floor$
			@methodOf Point#
			@returns {Point} A modified point, with x and y values each floored to the largest previous integer.
			*/
			floor$: function () {
				this.x = this.x.floor();
				this.y = this.y.floor();
				return this;
			},
			/**
			Determine whether this point is equal to another point.
		
			<code><pre>
			pointA = Point(2, 3)
			pointB = Point(2, 3)
			pointC = Point(4, 5)
		
			pointA.equal(pointB)
			# => true
		
			pointA.equal(pointC)
			# => false
			</pre></code>
		
			@name equal
			@methodOf Point#
			@param {Point} other The point to check for equality.
			@returns {Boolean} true if the other point has the same x, y coordinates, false otherwise.
			*/
			equal: function (other) {
				return this.x === other.x && this.y === other.y;
			},
			/**
			Computed the length of this point as though it were a vector from (0,0) to (x,y).
		
			<code><pre>
			point = Point(5, 7)
		
			point.length()
			# => 8.602325267042627
			</pre></code>
		
			@name length
			@methodOf Point#
			@returns {Number} The length of the vector from the origin to this point.
			*/
			length: function () {
				return Math.sqrt(this.dot(this));
			},
			/**
			Calculate the magnitude of this Point (Vector).
		
			<code><pre>
			point = Point(5, 7)
		
			point.magnitude()
			# => 8.602325267042627
			</pre></code>
		
			@name magnitude
			@methodOf Point#
			@returns {Number} The magnitude of this point as if it were a vector from (0, 0) -> (x, y).
			*/
			magnitude: function () {
				return this.length();
			},
			/**
			Returns the direction in radians of this point from the origin.
		
			<code><pre>
			point = Point(0, 1)
		
			point.direction()
			# => 1.5707963267948966 # Math.PI / 2
			</pre></code>
		
			@name direction
			@methodOf Point#
			@returns {Number} The direction in radians of this point from the origin
			*/
			direction: function () {
				return Math.atan2(this.y, this.x);
			},
			/**
			Calculate the dot product of this point and another point (Vector).
			@name dot
			@methodOf Point#
			@param {Point} other The point to dot with this point.
			@returns {Number} The dot product of this point dot other as a scalar value.
			*/
			dot: function (other) {
				return this.x * other.x + this.y * other.y;
			},
			/**
			Calculate the cross product of this point and another point (Vector). 
			Usually cross products are thought of as only applying to three dimensional vectors,
			but z can be treated as zero. The result of this method is interpreted as the magnitude 
			of the vector result of the cross product between [x1, y1, 0] x [x2, y2, 0]
			perpendicular to the xy plane.
		
			@name cross
			@methodOf Point#
			@param {Point} other The point to cross with this point.
			@returns {Number} The cross product of this point with the other point as scalar value.
			*/
			cross: function (other) {
				return this.x * other.y - other.x * this.y;
			},
			/**
			Compute the Euclidean distance between this point and another point.
		
			<code><pre>
			pointA = Point(2, 3)
			pointB = Point(9, 2)
		
			pointA.distance(pointB)
			# => 7.0710678118654755 # Math.sqrt(50)
			</pre></code>
		
			@name distance
			@methodOf Point#
			@param {Point} other The point to compute the distance to.
			@returns {Number} The distance between this point and another point.
			*/
			distance: function (other) {
				return Point.distance(this, other);
			},
			/**
			@name toString
			@methodOf Point#
			@returns {String} A string representation of this point.
			*/
			toString: function () {
				return "Point(" + this.x + ", " + this.y + ")";
			}
		};
		/**
		Compute the Euclidean distance between two points.
	  
		<code><pre>
		pointA = Point(2, 3)
		pointB = Point(9, 2)
	  
		Point.distance(pointA, pointB)
		# => 7.0710678118654755 # Math.sqrt(50)
		</pre></code>
	  
		@name distance
		@fieldOf Point
		@param {Point} p1
		@param {Point} p2
		@returns {Number} The Euclidean distance between two points.
		*/
		Point.distance = function (p1, p2) {
			return Math.sqrt(Point.distanceSquared(p1, p2));
		};
		/**
		<code><pre>
		pointA = Point(2, 3)
		pointB = Point(9, 2)
	  
		Point.distanceSquared(pointA, pointB)
		# => 50
		</pre></code>
	  
		@name distanceSquared
		@fieldOf Point
		@param {Point} p1
		@param {Point} p2
		@returns {Number} The square of the Euclidean distance between two points.
		*/
		Point.distanceSquared = function (p1, p2) {
			return Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2);
		};
		/**
		@name interpolate
		@fieldOf Point
	  
		@param {Point} p1
		@param {Point} p2
		@param {Number} t
		@returns {Point} A point along the path from p1 to p2
		*/
		Point.interpolate = function (p1, p2, t) {
			return p2.subtract(p1).scale(t).add(p1);
		};
		/**
		Construct a point on the unit circle for the given angle.
	  
		<code><pre>
		point = Point.fromAngle(Math.PI / 2)
	  
		point.x
		# => 0
	  
		point.y
		# => 1
		</pre></code>
	  
		@name fromAngle
		@fieldOf Point
		@param {Number} angle The angle in radians
		@returns {Point} The point on the unit circle.
		*/
		Point.fromAngle = function (angle) {
			return Point(Math.cos(angle), Math.sin(angle));
		};
		/**
		If you have two dudes, one standing at point p1, and the other
		standing at point p2, then this method will return the direction
		that the dude standing at p1 will need to face to look at p2.
	  
		<code><pre>
		p1 = Point(0, 0)
		p2 = Point(7, 3)
	  
		Point.direction(p1, p2)
		# => 0.40489178628508343
		</pre></code>
	  
		@name direction
		@fieldOf Point
		@param {Point} p1 The starting point.
		@param {Point} p2 The ending point.
		@returns {Number} The direction from p1 to p2 in radians.
		*/
		Point.direction = function (p1, p2) {
			return Math.atan2(p2.y - p1.y, p2.x - p1.x);
		};
		/**
		The centroid of a set of points is their arithmetic mean.
	  
		@name centroid
		@methodOf Point
		@param points... The points to find the centroid of.
		*/
		Point.centroid = function () {
			var points;
			points = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
			return points.inject(Point(0, 0), function (sumPoint, point) {
				return sumPoint.add(point);
			}).scale(1 / points.length);
		};
		/**
		@name ZERO
		@fieldOf Point
		@returns {Point} The point (0, 0)
		*/
		Point.ZERO = Point(0, 0);
		/**
		@name LEFT
		@fieldOf Point
		@returns {Point} The point (-1, 0)
		*/
		Point.LEFT = Point(-1, 0);
		/**
		@name RIGHT
		@fieldOf Point
		@returns {Point} The point (1, 0)
		*/
		Point.RIGHT = Point(1, 0);
		/**
		@name UP
		@fieldOf Point
		@returns {Point} The point (0, -1)
		*/
		Point.UP = Point(0, -1);
		/**
		@name DOWN
		@fieldOf Point
		@returns {Point} The point (0, 1)
		*/
		Point.DOWN = Point(0, 1);
		if (Object.freeze) {
			Object.freeze(Point.ZERO);
			Object.freeze(Point.LEFT);
			Object.freeze(Point.RIGHT);
			Object.freeze(Point.UP);
			Object.freeze(Point.DOWN);
		}
		return (typeof exports !== "undefined" && exports !== null ? exports : this)["Point"] = Point;
	})();
	;

	window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
		return window.setTimeout(function () {
			return callback(+new Date());
		}, 1000 / 60);
	});
	
	var AXIS_MAX = 1;
	var DEAD_ZONE = AXIS_MAX * 0.2;
	
	var controllerModuleId = "boomstick";

	partyMachineControllers.registerModule(controllerModuleId);

	var boomstickpluginType = "application/x-boomstickjavascriptjoysticksupport";
	var boomstickplugin = null;

	var previousJoysticks;
	var joysticks;
	var _interpretor;

	var buttonMapping = {};
	
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

	var axisMapping = { };

	var axisMappingDefault = {
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5
	};
	
	var axisMappingOSX = {
		0: 2,
		1: 3,
		2: 4,
		3: 5,
		4: 0,
		5: 1
	};

	var lastStepTime = -Infinity;

	var UP = 1;
	var DOWN = 16;
	var RIGHT = 256;
	var LEFT = 4096;
	
	var periodicCheck, promptElement;

	var displayInstallPrompt = function (text, msg, url) {

		var cnt = $("<div id='boomstickInstallPrompt'>");

		var link = $("<a />", {
			css: {
			},
			href: url,
			target: "_blank",
			text: text
		});

		var close = $("<a id='closeBoomstickPrompt' href='#'>Who cares?! Close this box and let me party!</a>"); 
		
		// BEWARE!!! .live is depricated, switch to .on when updating jquery
		$("#closeBoomstickPrompt").live("click", function() {
			$("#boomstickInstallPrompt").fadeOut();
		});

		var msgElem = ('<p>' + msg + '<p/>');

		cnt.append(close);
		cnt.append(link).append(msgElem);
		return cnt.appendTo("body");

	};

	if (!boomstickplugin) {
		boomstickplugin = document.createElement("object");

		boomstickplugin.onreadystatechange = function (x) {
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
		
		if (!(boomstickplugin != null && boomstickplugin.joysticksJSON)) {
			promptElement = displayInstallPrompt("Your browser does not yet handle joysticks, please click here to install the Boomstick plugin!", "How to run: chrome.exe --always-authorize-plugins --enable-plugins --allow-outdated-plugins", "https://github.com/STRd6/Boomstick/wiki");
			periodicCheck = function () {
				if (boomstickplugin != null && boomstickplugin.joysticksJSON) {
					init();
					return promptElement.remove();
				} else {
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
		
		var remapOSX = navigator.platform.match(/^Mac/);
		
		if (remapOSX) {
			buttonMapping = buttonMappingOSX;
			axisMapping = axisMappingOSX;
		} else {
			buttonMapping = buttonMappingDefault;
			//axisMapping = axisMappingDefault; When does this actually work?
			axisMapping = axisMappingOSX;
		}

		_interpretor = partyMachineControllers;

		joysticks = JSON.parse(boomstickplugin.joysticksJSON());

		for (var j = 0; j < joysticks.length; j++) {
			_interpretor.registerInput("boomstick_" + j);
		}

		window.requestAnimationFrame(animLoop);

		partyMachineControllers.registerModuleCompletion(controllerModuleId);

	};
	
	function getAxis(joystick, n) {
		var nMapped = axisMapping[n];
		return getAxes(joystick)[nMapped] || 0;
	};
	
	function getAxes(joystick) {
		if (joystick) {
			return joystick.axes;
		} else {
			return [];
		}
	};
	
	function getPosition(joystick) {
		var magnitude, p, ratio;
		
		if (joystick) {
			p = Point(getAxis(joystick, 0), getAxis(joystick, 1));
			magnitude = p.magnitude();
			if (magnitude > AXIS_MAX) {
				return p.norm();
			} else if (magnitude < DEAD_ZONE) {
				return Point(0, 0);
			} else {
				ratio = magnitude / AXIS_MAX;
				return p.scale(ratio / AXIS_MAX);
			}
		} else {
			return Point(0, 0);
		}
	}

	function pollJoysticks() {

		previousJoysticks = joysticks;
		joysticks = JSON.parse(boomstickplugin.joysticksJSON());

		for (var j = 0; j < joysticks.length; j++) {
			var joystick = joysticks[j];

			joystick.axisTrips = joystick.axisTrips || [];
			
			var previousJoystickState = previousJoysticks[j];
			
			previousJoystickState.axisTrips = previousJoystickState.axisTrips || [];
			
			var controllerId = "boomstick_" + j;

			var pressedUp = (joystick.pov & UP) && ((!previousJoystickState.pov & UP) === 0);
			var pressedLeft = (joystick.pov & LEFT) && ((!previousJoystickState.pov & LEFT) === 0);
			var pressedRight = (joystick.pov & RIGHT) && ((!previousJoystickState.pov & RIGHT) === 0);
			var pressedDown = (joystick.pov & DOWN) && ((!previousJoystickState.pov & DOWN) === 0);

			var releasedUp = (previousJoystickState.pov & UP) && ((!joystick.pov & UP) === 0);
			var releasedLeft = (previousJoystickState.pov & LEFT) && ((!joystick.pov & LEFT) === 0);
			var releasedRight = (previousJoystickState.pov & RIGHT) && ((!joystick.pov & RIGHT) === 0);
			var releasedDown = (previousJoystickState.pov & DOWN) && ((!joystick.pov & DOWN) === 0);

			if (releasedUp || releasedLeft || releasedRight || releasedDown) {
				_interpretor.gamepadReleased(releasedLeft, releasedUp, releasedRight, releasedDown, controllerId);
			}

			if (pressedLeft || pressedUp || pressedRight || pressedDown) {
				_interpretor.gamepadPressed(pressedLeft, pressedUp, pressedRight, pressedDown, controllerId);
			}

			var buttonA = buttonMapping["A"];
			var buttonB = buttonMapping["B"];
			var buttonC = buttonMapping["C"];
			var buttonD = buttonMapping["D"];
			
			var pressedA = (joystick.buttons & buttonA) && ((!previousJoystickState.buttons & buttonA) === 0);
			var pressedB = (joystick.buttons & buttonB) && ((!previousJoystickState.buttons & buttonB) === 0);
			var pressedC = (joystick.buttons & buttonC) && ((!previousJoystickState.buttons & buttonC) === 0);
			var pressedD = (joystick.buttons & buttonD) && ((!previousJoystickState.buttons & buttonD) === 0);

			var releasedA = (previousJoystickState.buttons & buttonA) && ((!joystick.buttons & buttonA) === 0);
			var releasedB = (previousJoystickState.buttons & buttonB) && ((!joystick.buttons & buttonB) === 0);
			var releasedC = (previousJoystickState.buttons & buttonC) && ((!joystick.buttons & buttonC) === 0);
			var releasedD = (previousJoystickState.buttons & buttonD) && ((!joystick.buttons & buttonD) === 0);
			
			if (releasedA || releasedB || releasedC || releasedD) {
				_interpretor.buttonsReleased(releasedA, releasedB, releasedC, releasedD, controllerId);
			}
			
			if (pressedA || pressedB || pressedC || pressedD) {
				_interpretor.buttonsPressed(pressedA, pressedB, pressedC, pressedD, controllerId);
			}
			
			var joystickPositionXY = getPosition(joystick);

			joystick.x = joystickPositionXY.x;
			joystick.y = joystickPositionXY.y;
			
			_interpretor.joystick(joystick.x, joystick.y, controllerId);
			

		}

	};
	
} (window.partyMachineBoomstickControllers = window.partyMachineBoomstickControllers || {}, partyMachineControllers, jQuery));

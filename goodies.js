$(document).ready(function() {
	//Fades in the whole page on dom ready
	$('#logo, .participant, .music-info, .plugin-frame').animate({
    	opacity: 1,
		}, 500, function() {
			//Fires when fade in is done
	});

	shortcut.add("esc", showSettings);
	//Opens the settings panel using 'esc' key
	function showSettings(){
		$('#settings').toggle({
			}, 500, function() {
		});
	}
});

// PROGRESSBAR
 		var i = 0;
        var res = 0;
        var context = null;
        var total_width = 300;
        var total_height = 34;
        var initial_x = 20;
        var initial_y = 20;
        var radius = total_height/2;
        window.onload = function() {
            var elem = document.getElementById('progressbar');
            if (!elem || !elem.getContext) {
                return;
            }
            context = elem.getContext('2d');
            if (!context) {
                return;
            }
            // set font
            context.font = "16px Verdana";
            // Blue gradient for progress bar
            var progress_lingrad = context.createLinearGradient(0,initial_y+total_height,0,0);
            progress_lingrad.addColorStop(0, '#4DA4F3');
            progress_lingrad.addColorStop(0.4, '#ADD9FF');
            progress_lingrad.addColorStop(1, '#9ED1FF');
            context.fillStyle = progress_lingrad;
            //draw();
            res = setInterval(draw, 30);
        }
        function draw() {
            i+=1;
            // Clear everything before drawing
            context.clearRect(initial_x-5,initial_y-5,total_width+15,total_height+15);
            progressLayerRect(context, initial_x, initial_y, total_width, total_height, radius);
            progressBarRect(context, initial_x, initial_y, i, total_height, radius, total_width);
            progressText(context, initial_x, initial_y, i, total_height, radius, total_width );
            if (i>=total_width) {
                clearInterval(res);
            }
        }
        /**
         * Draws a rounded rectangle.
         * @param {CanvasContext} ctx
         * @param {Number} x The top left x coordinate
         * @param {Number} y The top left y coordinate
         * @param {Number} width The width of the rectangle
         * @param {Number} height The height of the rectangle
         * @param {Number} radius The corner radius;
         */
        function roundRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.arc(x+width-radius, y+radius, radius, -Math.PI/2, Math.PI/2, false);
            ctx.lineTo(x + radius, y + height);
            ctx.arc(x+radius, y+radius, radius, Math.PI/2, 3*Math.PI/2, false);
            ctx.closePath();
            ctx.fill();
        }
        /**
         * Draws a rounded rectangle.
         * @param {CanvasContext} ctx
         * @param {Number} x The top left x coordinate
         * @param {Number} y The top left y coordinate
         * @param {Number} width The width of the rectangle
         * @param {Number} height The height of the rectangle
         * @param {Number} radius The corner radius;
         */
        function roundInsetRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            // Draw huge anti-clockwise box
            ctx.moveTo(1000, 1000);
            ctx.lineTo(1000, -1000);
            ctx.lineTo(-1000, -1000);
            ctx.lineTo(-1000, 1000);
            ctx.lineTo(1000, 1000);
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.arc(x+width-radius, y+radius, radius, -Math.PI/2, Math.PI/2, false);
            ctx.lineTo(x + radius, y + height);
            ctx.arc(x+radius, y+radius, radius, Math.PI/2, 3*Math.PI/2, false);
            ctx.closePath();
            ctx.fill();
        }
        function progressLayerRect(ctx, x, y, width, height, radius) {
            ctx.save();
            // Set shadows to make some depth
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#666';
             // Create initial grey layer
            ctx.fillStyle = 'rgba(189,189,189,1)';
            roundRect(ctx, x, y, width, height, radius);
            // Overlay with gradient
            ctx.shadowColor = 'rgba(0,0,0,0)'
            var lingrad = ctx.createLinearGradient(0,y+height,0,0);
            lingrad.addColorStop(0, 'rgba(255,255,255, 0.1)');
            lingrad.addColorStop(0.4, 'rgba(255,255,255, 0.7)');
            lingrad.addColorStop(1, 'rgba(255,255,255,0.4)');
            ctx.fillStyle = lingrad;
            roundRect(ctx, x, y, width, height, radius);
            ctx.fillStyle = 'white';
            //roundInsetRect(ctx, x, y, width, height, radius);
            ctx.restore();
        }
        /**
         * Draws a half-rounded progress bar to properly fill rounded under-layer
         * @param {CanvasContext} ctx
         * @param {Number} x The top left x coordinate
         * @param {Number} y The top left y coordinate
         * @param {Number} width The width of the bar
         * @param {Number} height The height of the bar
         * @param {Number} radius The corner radius;
         * @param {Number} max The under-layer total width;
         */
        function progressBarRect(ctx, x, y, width, height, radius, max) {
            // var to store offset for proper filling when inside rounded area
            var offset = 0;
            ctx.beginPath();
            if (width<radius) {
                offset = radius - Math.sqrt(Math.pow(radius,2)-Math.pow((radius-width),2));
                ctx.moveTo(x + width, y+offset);
                ctx.lineTo(x + width, y+height-offset);
                ctx.arc(x + radius, y + radius, radius, Math.PI - Math.acos((radius - width) / radius), Math.PI + Math.acos((radius - width) / radius), false);
            }
            else if (width+radius>max) {
                offset = radius - Math.sqrt(Math.pow(radius,2)-Math.pow((radius - (max-width)),2));
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width, y);
                ctx.arc(x+max-radius, y + radius, radius, -Math.PI/2, -Math.acos((radius - (max-width)) / radius), false);
                ctx.lineTo(x + width, y+height-offset);
                ctx.arc(x+max-radius, y + radius, radius, Math.acos((radius - (max-width)) / radius), Math.PI/2, false);
                ctx.lineTo(x + radius, y + height);
                ctx.arc(x+radius, y+radius, radius, Math.PI/2, 3*Math.PI/2, false);
            }
            else {
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width, y);
                ctx.lineTo(x + width, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.arc(x+radius, y+radius, radius, Math.PI/2, 3*Math.PI/2, false);
            }
            ctx.closePath();
            ctx.fill();
            // draw progress bar right border shadow
            if (width<max-1) {
                ctx.save();
                ctx.shadowOffsetX = 1;
                ctx.shadowBlur = 1;
                ctx.shadowColor = '#666';
                if (width+radius>max)
                  offset = offset+1;
                ctx.fillRect(x+width,y+offset,1,total_height-offset*2);
                ctx.restore();
            }
        }
        /**
         * Draws properly-positioned progress bar percent text
         * @param {CanvasContext} ctx
         * @param {Number} x The top left x coordinate
         * @param {Number} y The top left y coordinate
         * @param {Number} width The width of the bar
         * @param {Number} height The height of the bar
         * @param {Number} radius The corner radius;
         * @param {Number} max The under-layer total width;
         */
        function progressText(ctx, x, y, width, height, radius, max) {
            ctx.save();
            ctx.fillStyle = 'rgba(255,255,255, 0)'; //transparent text, replace with 'white' or something to make visible
            var text = Math.floor(width/max*100)+"%";
            var text_width = ctx.measureText(text).width;
            var text_x = x+width-text_width-radius/2;
            if (width<=radius+text_width) {
                text_x = x+radius/2;
            }
            ctx.fillText(text, text_x, y+22);
            ctx.restore();
        }

/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}
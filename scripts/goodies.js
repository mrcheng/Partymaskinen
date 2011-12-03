$(document).ready(function () {

    // Switch CSS
    //$("#style1").addClass("fat");
    //	
    //	$("#style1").click(function() {
    //		$("link[rel=stylesheet]").attr({href : "css/partymaskinen.css"});
    //		$("#style1").addClass("fat");
    //		$("#style2").removeClass("fat");
    //		$("#style3").removeClass("fat");
    //	});
    //	$("#style2").click(function() {
    //		$("link[rel=stylesheet]").attr({href : "themes/media_theme/media-theme.css"});
    //		$("#style2").addClass("fat");
    //		$("#style1").removeClass("fat");
    //		$("#style3").removeClass("fat");
    //	});	
    //	$("#style3").click(function() {
    //		$("link[rel=stylesheet]").attr({href : "themes/christmas_theme/christmas-theme.css"});
    //		$("#style3").addClass("fat");
    //		$("#style1").removeClass("fat");
    //		$("#style2").removeClass("fat");
    //	});

    //FITTEXT
    $(".fittext1").fitText();
    //$(".fittext2").fitText(1.2);
    //$("#fittext3").fitText(1.1, { minFontSize: 50, maxFontSize: '75px' });

    //Fades in the whole page on dom ready
    $('#partyMachine').animate({
        opacity: 1
    }, 3000, function () {
        //Fires when fade in is done
    });

    //Slide for the partyplayer
    shortcut.add("p", togglePlayer);
    var playerVisible = false;
    function togglePlayer() {
        if (playerVisible) {
            $(".party-player-container").animate({
                bottom: '-100%'
            }, 500, function () { playerVisible = false; });
        }
        if (!playerVisible) {
            $(".party-player-container").css({ visibility: "visible" }).animate({
                bottom: '3%'
            }, 500, function () { playerVisible = true; });
        }
    }

    shortcut.add("esc", showSettings);
    //Opens the settings panel using 'esc' key
    function showSettings() {
        $('#settings').toggle({
        }, 500, function () {
        });
    }


    shortcut.add("u", showParticipants);
    function showParticipants() {
        var partydudes = window.partyMachineParticipants.getAllParticipants();

        $("#participantWrapper").html('');
        for (var i = 0; i < partydudes.length; i++) {
            var newDiv = "<div id='" + partydudes.id + "' class='partyDude'><img src='" + partydudes[i].imageUrl + "'></img><p>Status: " + partydudes[i].status + " <br />" + partydudes[i].name + "</p></div>";

            $("#participantWrapper").append(newDiv);
        }

        $('#participantList').toggle(500, function () {
            if ($("#participantList").is(':visible')) {

                partyMachine.assignGameControllers(
						undefined,
						partydudes
					);
                
                //override partyMashine bindings
                for (var participant = 0; participant < partydudes.length; participant++) {

                    var p = partydudes[participant];

                    if (typeof p === "undefined" || p == null) {
                        continue;
                    }

                    p.gameController.buttonsPressed = function (buttonA, buttonB, buttonC, buttonD) {
                        //do nothing
                    };

                    p.gameController.gamepadPressed = function (left, up, right, down) {
                        //do nothing
                    };
                }
            }
            else {
                //restore
                partyMachine.bindKeys(window.partyMachineParticipants.getActiveParticipants());
            }
        });
    }
});

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
﻿(function (snd, $, undefined) {

	snd.stub = function () {

	};

	snd.start = function () {


	};

	snd.playEvent = function (eventName) {
		var audioElement;
		if (eventName === "pluginHighlight") {
			soundManager.onready(function(){
			var pluginSelectSnd = soundManager.createSound({
				id: 'pluginSound',
				url: 'sounds/lobbySfx-pluginselect.mp3',//temporary URL
				autoStart: false,
				multiShot: true,//High performance mode
   				//autoLoad: true
			});
			pluginSelectSnd.play();
			});
		}
		else if (eventName === "newParticipantDueToTimeout") {
			soundManager.onready(function(){
			var newContenderSnd = soundManager.createSound({
				id: 'newContenderSound',
				url: 'sounds/lobbySfx-newcontender.mp3',//temporary URL
				autoLoad: true,
				autoPlay: false,
				//stream: true,
			});
			newContenderSnd.play();
			});
		}
		
	};

} (window.partyMachineSound = window.partyMachineSound || {}, jQuery));

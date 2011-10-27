(function (snd, $, undefined) {

	snd.stub = function () {

	};

	snd.start = function () {


	};

	snd.playEvent = function (eventName) {
		var audioElement;
		
		if (eventName === "pluginHighlight") {
			audioElement = document.createElement('audio');
			audioElement.setAttribute('src', 'sounds/lobbySfx-pluginselect.mp3');
			audioElement.play();
		}
		else if (eventName === "newParticipantDueToTimeout") {
			audioElement = document.createElement('audio');
			audioElement.setAttribute('src', 'sounds/lobbySfx-newcontender.mp3');
			audioElement.play();
		}
		
	};

} (window.partyMachineSound = window.partyMachineSound || {}, jQuery));


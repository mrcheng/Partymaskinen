(function (pluginRunner, $, undefined) {
	
	 	
	function endsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}


	var _mediaPlayer;

	// Keep track of the iframe height.
	var if_height;

	
	function getSelectedPluginUrl(url) {
		
		if (!endsWith(url, "/index.html")) {
				return url + "/index.html";
			}
		else {
			return url;
		}
	};
	
	pluginRunner.stub = function (mediaPlayer) {

		_mediaPlayer = mediaPlayer;
		
	};

	pluginRunner.adjustPlugin = function (data) {
		// Get the height from the passsed data.
		var h = Number(data.height);

		if (!isNaN(h) && h > 0 && h !== if_height) {
			// Height has changed, update the iframe.
			$("#partyMachinePlugin").height(if_height = h);
		}
	};

	pluginRunner.startPlugin = function (currentParticipant, participants, plugin) {

		//pluginIndex = pluginIndex || 0;
		//_currentPluginIndex = pluginIndex;
		
		if (typeof _mediaPlayer !== "undefined") {
			_mediaPlayer.playEvent("pluginHighlight");
			_mediaPlayer.pause();
		}
		
		$("#partyMachinePluginContainer").empty();

		var milliseconds = new Date().getTime();

		var selectedPluginUrl = getSelectedPluginUrl(plugin.url);

		if (selectedPluginUrl.indexOf('?') === -1) {
			_currentPluginSrc = selectedPluginUrl
				+ '?baseUrl=' + encodeURIComponent(partyMachineConfig.baseUrl)
				+ '&loader=' + encodeURIComponent(partyMachineConfig.baseUrl) + 'partymachine.client.loader.js'
				+ '&' + milliseconds + '=' + milliseconds
				+ "#" + encodeURIComponent(document.location.href);
		}
		else {
			_currentPluginSrc = selectedPluginUrl
				+ '&baseUrl=' + encodeURIComponent(partyMachineConfig.baseUrl)
				+ '&loader=' + encodeURIComponent(partyMachineConfig.baseUrl) + 'partymachine.client.loader.js'
				+ '&' + milliseconds + '=' + milliseconds
				+ "#" + encodeURIComponent(document.location.href);
		}

		$("#partyMachine").hide();

		$('<iframe id="partyMachinePlugin" name="partyMachinePlugin" src="' + _currentPluginSrc + '" scrolling="no" frameborder="0" height="100%" width="100%" style="display:block;position:absolute;z-index:11000;">')
			.appendTo("#partyMachinePluginContainer");

		for (var p = 0; p < participants.length; p++) {
			var participant = participants[p];
			participant.gameController = {};
		}
		
		currentParticipant.gameController = {};

		partyMachineControllers.unmapControllersExcept([]);

		$("#partyMachinePlugin").load(function () {
			$("#partyMachinePlugin").focus();
		});


	};

	pluginRunner.exitPlugin = function () {
		$("#partyMachinePluginContainer").empty();
		$("#partyMachine").show();
		$("#partyMachine").focus();
	};

	pluginRunner.start = function (mediaPlayer) {

		_mediaPlayer = mediaPlayer;

	};
	
	pluginRunner.sendParticipants = function (currentParticipant, participants) {
		var startMsg = {
			'event': 'getParticipants',
			'participants': participants,
			'currentParticipant' : currentParticipant
		};

		$.postMessage(JSON.stringify(startMsg), '*', $("#partyMachinePlugin").get(0).contentWindow);
	};

} (window.partyMachinePluginRunner = window.partyMachinePluginRunner || {}, jQuery));


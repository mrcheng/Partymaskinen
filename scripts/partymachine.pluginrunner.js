(function (pluginRunner, $, undefined) {
	
	function endsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	
	var _plugins = [];
	var _mediaPlayer;
	var _currentPluginIndex;
	var _currentPluginSrc;

	// Keep track of the iframe height.
	var if_height;

	pluginRunner.stub = function (mediaPlayer) {

		_mediaPlayer = mediaPlayer;
		
		pluginRunner.getSelectedPluginUrl = function() {
			var selectedPlugin = _plugins[_currentPluginIndex];

			if (!endsWith(selectedPlugin.url, "/index.html")) {
				return selectedPlugin.url + "/index.html";
			}
			else {
				return selectedPlugin.url;
			}
		};
		
		pluginRunner.getPlugins = function () {

			var createdBy = {
				id: "3cef56f0-28fc-48c5-8f97-04f10d4ef26e",
				imageUrl: "http://i.imgur.com/0ul5i.png",
				name: "Jonas Olsson"
			};
			
			var freshPlugins = [];
				
			var unicornDeath = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Unicorn Death!",
				url: partyMachineConfig.pluginsBaseUrl + "Unicorn%20Death"
			};

			freshPlugins.push(unicornDeath);

			var kingPong = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "King Pong",
				url: partyMachineConfig.pluginsBaseUrl + "King%20Pong"
			};

			freshPlugins.push(kingPong);
			
			var beerBong = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Beer Bong",
				url: partyMachineConfig.pluginsBaseUrl + "Beer%20Bong"
			};

			freshPlugins.push(beerBong);
			
			var centurion = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Centurion",
				url: partyMachineConfig.pluginsBaseUrl + "Centurion"
			};

			freshPlugins.push(centurion);
			
			var centurionKamelasa = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Centurion Kamelasa",
				url: partyMachineConfig.pluginsBaseUrl + "CenturionKamelasa"
			};

			freshPlugins.push(centurionKamelasa);

			var theDuel = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Centurion Kamelasa",
				url: partyMachineConfig.pluginsBaseUrl + "The%20Duel"
			};

			freshPlugins.push(theDuel);
			
			var pushItToTheLimit = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Push It To The Limit",
				url: partyMachineConfig.pluginsBaseUrl + "Push%20it%20to%20the%20limit"
			};

			freshPlugins.push(pushItToTheLimit);
			
			var randomBeer = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Random Beer",
				url: partyMachineConfig.pluginsBaseUrl + "Random%20Beer"
			};

			freshPlugins.push(randomBeer);
			
			var simonSays = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Simon Says",
				url: partyMachineConfig.pluginsBaseUrl + "SimonSays"
			};

			freshPlugins.push(simonSays);
			
			var tangera = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Tangera",
				url: partyMachineConfig.pluginsBaseUrl + "Tangera"
			};

			freshPlugins.push(tangera);
			
			var vemVillBliFull = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Vem Vill Bli Full?",
				url: partyMachineConfig.pluginsBaseUrl + "Vem%20vill%20bli%20full"
			};

			freshPlugins.push(vemVillBliFull);
			
			var whiskeyWheel = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Whiskey Wheel",
				url: partyMachineConfig.pluginsBaseUrl + "Whiskey%20Wheel"
			};

			freshPlugins.push(whiskeyWheel);
			
			var youAreMyBitch = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "You are my bitch",
				url: partyMachineConfig.pluginsBaseUrl + "You%20are%20my%20bitch"
			};

			freshPlugins.push(youAreMyBitch);
			
			var gegginsLair = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Geggin's Lair",
				url: partyMachineConfig.pluginsBaseUrl + "Geggin's%20Lair"
			};

			freshPlugins.push(gegginsLair);


			var ausMitDerHose = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "Aus mit der hose",
				url: partyMachineConfig.pluginsBaseUrl + "Aus%20mit%20der%20hose"
			};

			freshPlugins.push(ausMitDerHose);

			var theHumanCentipede = {
				created: new Date(),
				createdBy: createdBy,
				id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
				title: "The Human Centipede",
				url: partyMachineConfig.pluginsBaseUrl + "The%20Human%20Centipede"
			};

			freshPlugins.push(theHumanCentipede);
			
			return freshPlugins;
		};

		_plugins = this.getPlugins();

		showPlugins();
	};

	pluginRunner.getPlugins = function () {
		return _plugins;
	};

	pluginRunner.adjustPlugin = function (data) {
		// Get the height from the passsed data.
		var h = Number(data.height);

		if (!isNaN(h) && h > 0 && h !== if_height) {
			// Height has changed, update the iframe.
			$("#partyMachinePlugin").height(if_height = h);
		}
	};

	pluginRunner.getPlugin = function () {

		var plugDesc = {
			"plugin": _plugins[_currentPluginIndex],
			"src": _currentPluginSrc,
			"contentWindow": $("#partyMachinePlugin")[0].contentWindow
		};

		return plugDesc;
	};

	pluginRunner.getSelectedPluginUrl = function() {
		var selectedPlugin = _plugins[_currentPluginIndex];

		return selectedPlugin.url;
	};

	pluginRunner.startPlugin = function (currentParticipant, participants, pluginIndex) {

		pluginIndex = pluginIndex || 0;
		_currentPluginIndex = pluginIndex;
		
		if (typeof _mediaPlayer !== "undefined") {
			_mediaPlayer.playEvent("pluginHighlight");
			_mediaPlayer.pause();
		}
		
		$("#partyMachinePluginContainer").empty();

		var milliseconds = new Date().getTime();

		var selectedPluginUrl = pluginRunner.getSelectedPluginUrl();

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

	pluginRunner.start = function (mediaPlayer, plugins) {

		_mediaPlayer = mediaPlayer;

		_plugins = plugins;

		showPlugins();

	};
	
	function showPlugins() {
		
		if (_plugins.length > 0) {

			for (var plugin = 0; plugin < _plugins.length; plugin++) {
				var displayPlugin = _plugins[plugin];
				var pluginHtmlTemplate = '<div class="plugin"><img src="' + displayPlugin.url + '/thumbnail.png"></img><!--<div class="plugin-glare"></div><br /><p>' + displayPlugin.title + '</p></div>-->';
				$("#partyMachine-plugins").append(pluginHtmlTemplate);
			}

			pluginRunner.highlightPlugin(0, true);
		}
	}

	pluginRunner.highlightPlugin = function (pluginIndex, dontPlaySound) {

		if (typeof _mediaPlayer !== "undefined" && !dontPlaySound) {
			_mediaPlayer.playEvent("pluginHighlight");
		}

		var highlightPlugin = _plugins[pluginIndex];

		$("#partyMachine .plugin").removeClass("plugin-selected");

		var pluginDomElem = $("#partyMachine .plugin").get(pluginIndex);

		if (pluginDomElem) {
			$(pluginDomElem).addClass("plugin-selected");
			console.log("highlighting plugin: " + highlightPlugin.title);
		}

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


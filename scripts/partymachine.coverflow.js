(function (coverflow, $, undefined) {

	var min = 0;
	var max = 14;

	var current = 0;
	var currPos = 0;
	var newPos = 0;
	var currAngle = 0;
	var newAngle = 0;
	var gap = 50;
	var clickedIndex = 0;
	var diff = 0;
	var _plugins = [];


	var translateZ = [];

	var rotateY = [];

	var translateX = [];

	var _mediaPlayer;
	
	var translateZTemplate = [0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0];

	var rotateYTemplate = [-60, -60, -60, -60, -60, -60, 0, 60, 60, 60, 60, 60, 60];

	var translateXTemplate = [-350, -300, -250, -200, -150, -100, 0, 100, 150, 200, 250, 300, 350];

	var selectablePlugins = 0;
	
	var _pluginsExists = false;
	
	function showPlugins() {

		if (_pluginsExists) {
			$("#partyMachine-plugins").show();
		} else {
		    $("#partyMachine-plugins").hide();
		}
	}


	function highlightCurrentPlugin(playSound) {
		if (typeof _mediaPlayer !== "undefined" && playSound) {
			_mediaPlayer.playEvent("pluginHighlight");
		}

		//var highlightPlugin = _plugins[pluginIndex];

		$("#partyMachine .plugin").removeClass("plugin-selected");

		var pluginDomElem = $("#partyMachine .plugin").get(current);

		if (pluginDomElem) {
			$(pluginDomElem).addClass("plugin-selected");
			//console.log("highlighting plugin: " + highlightPlugin.title);
		}
	}
	
	function setupPlugins(plugins) {

		if (plugins.length > 13) {
			_plugins = plugins.splice(1, 13);

		} else {
			_plugins = plugins;
		}

		for (var plugin = 0; plugin < _plugins.length; plugin++) {

			var displayPlugin = _plugins[plugin];

			var pluginHtmlTemplate = '<div class="plugin" id="plugin' + (plugin) + '">\
                    <img src="' + displayPlugin.url + '/thumbnail.png"></img>\
                    <!--<div class="plugin-glare"></div><br /><p>' + displayPlugin.title + '</p></div>-->';

			$("#partyMachine-plugins").append(pluginHtmlTemplate);

		}

		setSelectedPluginInitial(Math.floor((_plugins.length / 2)));

		_pluginsExists = _plugins.length > 0;
		
		showPlugins();
	};

	coverflow.getPlugins = function() {
		return _plugins;
	},

	coverflow.stub = function (mediaPlayer) {


		_mediaPlayer = mediaPlayer;
		
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

		coverflow.getPlugins = function () {
			return freshPlugins;
		};
		
		setupPlugins(freshPlugins);
	};


	function setSelectedPluginInitial(currentSelectedPlugin) {
		current = currentSelectedPlugin;

		var leftMostIndex = 0;

		var pluginIndex = 0;

		var foundLeftMostIndex = false;
		if (_plugins.length > 1) {

			for (var left = currentSelectedPlugin - 1; left >= 0; left--) {

				var leftIndex = currentSelectedPlugin - left - 1;
				var leftTranslateZ = translateZTemplate[leftIndex];
				var leftRotateY = rotateYTemplate[leftIndex];
				var leftTranslateX = translateXTemplate[leftIndex];

				var l = document.getElementById("plugin" + pluginIndex);
				l.style.webkitTransform = "translateZ(" + leftTranslateZ + "px) translateX(" + leftTranslateX + "px) rotateY(" + leftRotateY + "deg)";

				var plugin = $('#plugin' + pluginIndex);

				plugin.data('cp', leftTranslateX);
				plugin.data('a', leftRotateY);
				plugin.data('webkitTransformIndex', left);

				if (!foundLeftMostIndex) {
					foundLeftMostIndex = true;
					leftMostIndex = leftIndex;
				}

				pluginIndex++;
			}

		}

		var centerTranslateZ = translateZTemplate[currentSelectedPlugin];
		var centerRotateY = rotateYTemplate[currentSelectedPlugin];
		var centerTranslateX = translateXTemplate[currentSelectedPlugin];

		var center = document.getElementById("plugin" + pluginIndex);
		center.style.webkitTransform = "translateZ(" + centerTranslateZ + "px) translateX(" + centerTranslateX + "px) rotateY(" + centerRotateY + "deg)";

		var centerPlugin = $('#plugin' + pluginIndex);

		current = pluginIndex;
		
		centerPlugin.data('cp', centerTranslateX);
		centerPlugin.data('a', centerRotateY);
		centerPlugin.data('webkitTransformIndex', currentSelectedPlugin);

		pluginIndex++;

		var rightMostIndex = 0;

		if (_plugins.length > 1) {

			for (var right = currentSelectedPlugin + 1; right < _plugins.length; right++) {

				//var rightIndex = currentSelectedPlugin + right - 1;

				var rightIndex = right;

				var rightTranslateZ = translateZTemplate[rightIndex];
				var rightRotateY = rotateYTemplate[rightIndex];
				var rightTranslateX = translateXTemplate[rightIndex];

				var r = document.getElementById("plugin" + pluginIndex);
				r.style.webkitTransform = "translateZ(" + rightTranslateZ + "px) translateX(" + rightTranslateX + "px) rotateY(" + rightRotateY + "deg)";

				var rightPlugin = $('#plugin' + pluginIndex);

				rightPlugin.data('cp', rightTranslateX);
				rightPlugin.data('a', rightRotateY);
				rightPlugin.data('webkitTransformIndex', rightIndex);

				rightMostIndex = rightIndex;
				
				pluginIndex++;

			}

		}

		translateZ = translateZTemplate.splice(leftMostIndex, _plugins.length);
		translateX = translateXTemplate.splice(leftMostIndex, _plugins.length);
		rotateY = rotateYTemplate.splice(leftMostIndex, _plugins.length);

		selectablePlugins = rotateY.length;

		highlightCurrentPlugin(false);
	}

	function setSelectedPlugin(currentSelectedPlugin) {

		if (_plugins.length > 1) {
			for (var left = 0; left < currentSelectedPlugin; left++) {
				var leftWebkitTransformIndex = left;

				var leftPlugin = $('#plugin' + left);

				var leftrY = rotateY[leftWebkitTransformIndex];

				var lefttX = translateX[leftWebkitTransformIndex];

				leftPlugin.data('webkitTransformIndex', leftWebkitTransformIndex);

				leftPlugin.css('webkitTransform', "translateX(" + lefttX + "px) rotateY(" + leftrY + "deg)");

			}
		}

		var centerRotateY = rotateY[currentSelectedPlugin];
		var centerTranslateX = translateX[currentSelectedPlugin];

		var center = document.getElementById("plugin" + currentSelectedPlugin);
		center.style.webkitTransform = "translateZ(200px) translateX(" + centerTranslateX + "px) rotateY(" + centerRotateY + "deg)";

		var centerPlugin = $('#plugin' + currentSelectedPlugin);

		centerPlugin.data('cp', centerTranslateX);
		centerPlugin.data('a', centerRotateY);
		centerPlugin.data('webkitTransformIndex', currentSelectedPlugin);
		current = currentSelectedPlugin;

		if (_plugins.length > 1) {

			for (var right = currentSelectedPlugin + 1; right < _plugins.length; right++) {

				var rightPlugin = $('#plugin' + right);

				var rightWebkitTransformIndex = right;

				var rightrY = rotateY[rightWebkitTransformIndex];

				var righttX = translateX[rightWebkitTransformIndex];

				rightPlugin.data('webkitTransformIndex', rightWebkitTransformIndex);

				rightPlugin.css('webkitTransform', "translateX(" + righttX + "px) rotateY(" + rightrY + "deg)");

			}

		}

		highlightCurrentPlugin(true);
	}

	coverflow.left = function() {
		var tryLeft = current - 1;

		if (tryLeft >= _plugins.length) {
			tryLeft = 0;
		} else if (tryLeft < 0) {
			tryLeft = _plugins.length - 1;
		}

		setSelectedPlugin(tryLeft);

		return current;
	},
	coverflow.right = function() {
		var tryRight = current + 1;

		if (tryRight >= _plugins.length) {
			tryRight = 0;
		} else if (tryRight < 0) {
			tryRight = 0;
		}

		setSelectedPlugin(tryRight);

		return current;
	},

	coverflow.getSelectedPlugin = function () {
		return _plugins[current];
	},
	
	coverflow.start = function (plugins, mediaPlayer) {

		_mediaPlayer = mediaPlayer;
		setupPlugins(plugins);
	}
	

	




}(window.partyMachineCoverflow = window.partyMachineCoverflow || {}, jQuery));

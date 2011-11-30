(function (pluginRunner, $, undefined) {

	var _plugins = [];
	var _soundplayer;
	var _currentPluginIndex;
	var _currentPluginSrc;

	// Keep track of the iframe height.
	var if_height;

	pluginRunner.stub = function () {

		pluginRunner.getPlugins = function () {

			var freshPlugins = [];
			for (var i = 0; i <= 7; i++) {
				freshPlugins.push({ title: "Your plugin title", url: "index.html", imageUrl: "thumbnail.png" });
			}

			return freshPlugins;
		};

		_plugins = this.getPlugins();

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

	pluginRunner.startPlugin = function (participants, pluginIndex) {

		pluginIndex = pluginIndex || 0;
		_currentPluginIndex = pluginIndex;
		if (typeof _soundplayer !== "undefined") {
			_soundplayer.playEvent("pluginHighlight");
		}

		var selectedPlugin = _plugins[pluginIndex];

		$("#partyMachinePluginContainer").empty();

		_currentPluginSrc = selectedPlugin.url + "#" + encodeURIComponent(document.location.href);

		$("#partyMachine").hide();

		$('<iframe id="partyMachinePlugin" name="partyMachinePlugin" src="' + _currentPluginSrc + '" scrolling="no" frameborder="0" height="100%" width="100%" style="display:block;position:absolute;z-index:1001;">')
			.appendTo("#partyMachinePluginContainer");

		var startMsg = {
			'event': 'startPlugin',
			'participants': participants
		};

		$("#partyMachinePlugin").load(function () {
			$.postMessage(JSON.stringify(startMsg), '*', $("#partyMachinePlugin").get(0).contentWindow);
		});


	};

	pluginRunner.start = function (soundplayer, plugins) {

		_soundplayer = soundplayer;

		_plugins = plugins;

		if (_plugins.length > 0) {

			for (var plugin = 0; plugin < _plugins.length; plugin++) {
				var displayPlugin = _plugins[plugin];
				var pluginHtmlTemplate = '<div class="plugin"><img src="' + displayPlugin.imageUrl + '"></img><div class="plugin-glare"></div><br /><p>' + displayPlugin.title + '</p></div>';
				$("#partyMachine-plugins").append(pluginHtmlTemplate);
			}

			this.highlightPlugin(0, true);
		}

	};

	pluginRunner.highlightPlugin = function (pluginIndex, dontPlaySound) {

		if (typeof _soundplayer !== "undefined" && !dontPlaySound) {
			_soundplayer.playEvent("pluginHighlight");
		}

		var highlightPlugin = _plugins[pluginIndex];

		$("#partyMachine .plugin").removeClass("plugin-selected");

		var pluginDomElem = $("#partyMachine .plugin").get(pluginIndex);

		if (pluginDomElem) {
			$(pluginDomElem).addClass("plugin-selected");
			console.log("highlighting plugin: " + highlightPlugin.name);
		}

	};

} (window.partyMachinePluginRunner = window.partyMachinePluginRunner || {}, jQuery));


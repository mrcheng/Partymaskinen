(function (pluginRunner, $, undefined) {

	var _plugins = [];
	var _mediaPlayer;
	var _currentPluginIndex;
	var _currentPluginSrc;

	// Keep track of the iframe height.
	var if_height;

	pluginRunner.stub = function () {

		pluginRunner.getPlugins = function () {

			var freshPlugins = [];
			for (var i = 0; i <= 7; i++) {
				freshPlugins.push({ title: "Your plugin title", url: "index.html" });
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

	var addUrlParam = function (search, key, val) {
		var newParam = key + '=' + val,
      params = '?' + newParam;

		// If the "search" string exists, then build params from it
		if (search) {
			// Try to replace an existance instance
			params = search.replace(new RegExp('[\?&]' + key + '[^&]*'), '$1' + newParam);

			// If nothing was replaced, then add the new param to the end
			if (params === search) {
				params += '&' + newParam;
			}
		}

		return params;
	};

	pluginRunner.startPlugin = function (participants, pluginIndex) {

		pluginIndex = pluginIndex || 0;
		_currentPluginIndex = pluginIndex;
		if (typeof _mediaPlayer !== "undefined") {
			_mediaPlayer.playEvent("pluginHighlight");
			_mediaPlayer.pause();
		}

		var selectedPlugin = _plugins[pluginIndex];

		$("#partyMachinePluginContainer").empty();

		var milliseconds = new Date().getTime();

		if (selectedPlugin.url.indexOf('?') === -1) {
			_currentPluginSrc = selectedPlugin.url + '?' + milliseconds + '=' + milliseconds + "#" + encodeURIComponent(document.location.href);
		}
		else {
			_currentPluginSrc = selectedPlugin.url + '&' + milliseconds + '=' + milliseconds + "#" + encodeURIComponent(document.location.href);
		}
		
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

	pluginRunner.exitPlugin = function () {
		$("#partyMachinePluginContainer").empty();
		$("#partyMachine").show();
	};

	pluginRunner.start = function (mediaPlayer, plugins) {

		_mediaPlayer = mediaPlayer;

		_plugins = plugins;

		if (_plugins.length > 0) {

			for (var plugin = 0; plugin < _plugins.length; plugin++) {
				var displayPlugin = _plugins[plugin];
				var pluginHtmlTemplate = '<div class="plugin"><img src="' + displayPlugin.url + '/thumbnail.png"></img><div class="plugin-glare"></div><br /><p>' + displayPlugin.title + '</p></div>';
				$("#partyMachine-plugins").append(pluginHtmlTemplate);
			}

			this.highlightPlugin(0, true);
		}

	};

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

} (window.partyMachinePluginRunner = window.partyMachinePluginRunner || {}, jQuery));


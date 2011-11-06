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

			freshPlugins.push({ name: "plugin1", Url: "plugin-test.html", imageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ name: "plugin2", Url: "plugin-test.html", imageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ name: "plugin3", Url: "plugin-test.html", imageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ name: "plugin4", Url: "plugin-test.html", imageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ name: "plugin5", Url: "plugin-test.html", imageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ name: "plugin6", Url: "plugin-test.html", imageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ name: "plugin7", Url: "plugin-test.html", imageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ name: "plugin8", Url: "plugin-test.html", imageUrl: "img/plugin-icon-axample.png" });

			return freshPlugins;
		};
	};

	pluginRunner.getPlugins = function () {
		// TODO: Implement
		var freshPlugins = [];
		return freshPlugins;
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

	pluginRunner.startPlugin = function (pluginIndex) {

		_currentPluginIndex = pluginIndex;
		if (typeof _soundplayer !== "undefined") {
			_soundplayer.playEvent("pluginHighlight");
		}

		var selectedPlugin = _plugins[pluginIndex];
		alert(selectedPlugin.Name);

		$("#partyMachinePluginContainer").empty();

		alert("test");

		_currentPluginSrc = selectedPlugin.Url + "#" + encodeURIComponent(document.location.href);

		$("#partyMachine").hide();

		$('<iframe id="partyMachinePlugin" name="partyMachinePlugin" src="' + _currentPluginSrc + '" scrolling="no" frameborder="0" height="100%" width="100%" style="display:block;position:absolute;z-index:1001;">')
			.appendTo("#partyMachinePluginContainer");


		// $.postMessage('toggle_content', src, $("#partyMachinePlugin").contentWindow);
	};

	pluginRunner.start = function (soundplayer) {

		_soundplayer = soundplayer;

		_plugins = this.getPlugins();

		if (_plugins.length > 0) {

			for (var plugin = 0; plugin < _plugins.length; plugin++) {
				var displayPlugin = _plugins[plugin];
				var pluginHtmlTemplate = '<div class="plugin"><img src="' + displayPlugin.imageUrl + '"><span class="plugin-glare"></span></img><p>' + displayPlugin.name + '</p></div>';
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


(function (pluginRunner, $, undefined) {

	var _plugins = [];

	pluginRunner.stub = function() {
		pluginRunner.getPlugins = function() {

			var freshPlugins = [];

			freshPlugins.push({ Name: "plugin1", Url: "plugin1.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin2", Url: "plugin2.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin3", Url: "plugin3.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin4", Url: "plugin4.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin5", Url: "plugin5.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin6", Url: "plugin6.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin7", Url: "plugin7.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin8", Url: "plugin8.js", ImageUrl: "img/plugin-icon-axample.png" });

			return freshPlugins;
		};
	};

	pluginRunner.getPlugins = function () {
		// TODO: Implement
		var freshPlugins = [];
		return freshPlugins;
	};

	pluginRunner.startPlugin = function (pluginIndex) {

		var selectedPlugin = plugins[pluginIndex];
		alert(selectedPlugin.Name);
	};

	pluginRunner.start = function () {

		_plugins = this.getPlugins();

		if (_plugins.length > 0) {

			for (var plugin = 0; plugin < _plugins.length; plugin++) {
				var displayPlugin = _plugins[plugin];
				var pluginHtmlTemplate = '<div class="plugin"><img src="' + displayPlugin.ImageUrl + '"></img><p>' + displayPlugin.Name + '</p></div>';
				$("#partyMachine-plugins").append(pluginHtmlTemplate);
			}

			this.highlightPlugin(0);
		}

	};

	pluginRunner.highlightPlugin = function (pluginIndex) {
		var highlightPlugin = _plugins[pluginIndex];

		$("#partyMachine .plugin").removeClass("plugin-selected");

		var pluginDomElem = $("#partyMachine .plugin").get(pluginIndex);

		if (pluginDomElem) {
			$(pluginDomElem).addClass("plugin-selected");
			console.log("highlighting plugin: " + highlightPlugin.Name);
		}

	};

} (window.partyMachinePluginRunner = window.partyMachinePluginRunner || {}, jQuery));


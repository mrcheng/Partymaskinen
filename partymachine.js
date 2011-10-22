
(function (partyMachine, controllers, $, undefined) {

	var _contexts = {
		atPluginSelection: 0,
		runningPlugin: 1
	};

	var _state = {
		context : _contexts.atPluginSelection,
		currentlySelectedPlugin: 0
	};
	
	var _participants = [];
	var _plugins = [];
	var _previousParticipant = -1;
	
	function isHostAvailable() {
		return false;
	}

	function getPlugins() {


		var freshPlugins = [];

		if (!isHostAvailable()) {
			freshPlugins.push({ Name: "plugin1", Url: "plugin1.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin2", Url: "plugin2.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin3", Url: "plugin3.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin4", Url: "plugin4.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin5", Url: "plugin5.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin6", Url: "plugin6.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin7", Url: "plugin7.js", ImageUrl: "img/plugin-icon-axample.png" });
			freshPlugins.push({ Name: "plugin8", Url: "plugin8.js", ImageUrl: "img/plugin-icon-axample.png" });
		}

		return freshPlugins;
	}

	function getParticipants() {

		var freshParticipants = [];

		if (!isHostAvailable()) {

			freshParticipants.push({ Name: 'Pub', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Randy', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Magnecyl', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Geggin', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Mejje', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Joel', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Fold', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Blaizer', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Deamo', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Wipeout', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Vico', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Shahin', ImageUrl: 'img/participant_example.png' });
			freshParticipants.push({ Name: 'Jesse', ImageUrl: 'img/participant_example.png' });
			
		}

		return freshParticipants;
	}

	function getNextParticipant() {
		_previousParticipant++;

		var nextParticipant = _participants[_previousParticipant];

		return nextParticipant;
	}
	
	function choosePlugin(pluginIndex) {
		var selectedPlugin = _plugins[pluginIndex];

		alert(selectedPlugin.Name);
	}
	
	function highlightSelectedPlugin(pluginIndex) {
		var highlightPlugin = _plugins[pluginIndex];

		alert(highlightPlugin.Name);
	}

	function atPluginSelect() {
		
		for (var participant = 0; participant < _participants.length; participant++) 
		{

			var p = _participants[participant];
			
			if (typeof p === "undefined" || p == null) 
			{
				continue;
			}
			
			p.gameController.buttonsPressed = function (buttonA, buttonB, buttonC, buttonD) {
				
				if (_state.context !== _contexts.atPluginSelection) {
					return false;
				} 
				
				if (_plugins.length === 0) {
					return false;
				}

				choosePlugin(_state.currentlySelectedPlugin);
			};
			
			p.gameController.gamepadPressed = function (left, up, right, down) { 
			
				if (_state.context !== _contexts.atPluginSelection) {
					return false;
				} 
				
				if (_plugins.length === 0) {
					return false;
				}
				
				if (right) {
					if (_state.currentlySelectedPlugin + 1 >= _plugins.length) {
						_state.currentlySelectedPlugin = 0;
					}
					else {
						_state.currentlySelectedPlugin += 1; 
					}
				}
				else if (left) {
					if (_state.currentlySelectedPlugin <= 0) {
						_state.currentlySelectedPlugin = _plugins.length - 1;
					}
					else {
						_state.currentlySelectedPlugin -= 1;
					}
				}
				else {
					return false;
				}

				highlightSelectedPlugin(_state.currentlySelectedPlugin);
				
			};
			
		}

	}
	
	partyMachine.start = function () {

		_participants = getParticipants();
		_plugins = getPlugins();

		var nextParticipant = getNextParticipant();

		var participantHtmlTemplate = '<img src="' + nextParticipant.ImageUrl + '"></img><strong>' + nextParticipant.Name  + '</strong>';

		$("#partyMachine-participant").append(participantHtmlTemplate);

		for (var plugin = 0; plugin < _plugins.length; plugin++) {
			var displayPlugin = _plugins[plugin];
			var pluginHtmlTemplate = '<div class="plugin"><img src="' + displayPlugin.ImageUrl + '"></img><p>' + displayPlugin.Name + '</p></div>';
			$("#partyMachine-plugins").append(pluginHtmlTemplate);
		}

		if (_plugins.length > 0) {
			highlightSelectedPlugin(0);
		}
		
		controllers.start(isHostAvailable, _participants);

		partyMachine.assignGameControllers(
			atPluginSelect,
			_participants[0],
			_participants[1],
			_participants[2],
			_participants[3],
			_participants[4],
			_participants[5],
			_participants[6]
		);
		
	},
	
	partyMachine.assignGameControllers = function (
		gameControllersAssigned, 
		participant1, 
		participant2, 
		participant3, 
		participant4, 
		participant5, 
		participant6, 
		participant7
	) {
		
		controllers.assignGameControllers(
			gameControllersAssigned, 
			participant1, 
			participant2, 
			participant3, 
			participant4, 
			participant5, 
			participant6, 
			participant7
		);
		
	}

} (window.partyMachine = window.partyMachine || {}, window.partyMachineControllers, jQuery));

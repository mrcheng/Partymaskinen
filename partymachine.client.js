
(function (partyMachine, msg, $, undefined) {

	var parent_url = decodeURIComponent(document.location.hash.replace(/^#/, ''));

	partyMachine.start = function () {


	};

	partyMachine.exit = function () {
		alert("pluginExit");
		
		var pluginExitMsg = { event: 'pluginExit' };
		
		$.postMessage(JSON.stringify(pluginExitMsg), parent_url, parent);
	};

} (
	window.partyMachine = window.partyMachineClient || {},
	window.partyMachine,
	jQuery
	)
);

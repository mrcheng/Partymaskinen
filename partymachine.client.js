
(function (partyMachineClient, msg, $, undefined) {



	function isHostAvailable() {
		return false;
	}

	partyMachineClient.start = function () {

		msg.start();

	};

	partyMachineClient.getParticipants = function () {
		var msg = { 'event': 'getParticipants' };

		$.postMessage(JSON.stringify(msg), '*', parent);
	}

} (
	window.partyMachineClient = window.partyMachineClient || {},
	window.partyMachineClientMessaging,
	jQuery
	)
);

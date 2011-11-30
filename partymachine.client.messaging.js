
(function (partyMachineClientMessaging, $, undefined) {

	partyMachineClientMessaging.start = function () {

//		// Get the parent page URL as it was passed in, for browsers that don't support
//		// window.postMessage (this URL could be hard-coded).
//		var parent_url = decodeURIComponent(document.location.hash.replace(/^#/, ''));

//		// The first param is serialized using $.param (if not a string) and passed to the
//		// parent window. If window.postMessage exists, the param is passed using that,
//		// otherwise it is passed in the location hash (that's why parent_url is required).
//		// The second param is the targetOrigin.
//		function setHeight() {
//			var msg = {
//				'event': 'iframe_resize',
//				'height': $('body').outerHeight(true)
//			};

//			// $.postMessage(msg, parent_url, parent);
//			$.postMessage(JSON.stringify(msg), '*', parent);
//		};

//		setHeight();

//		$.receiveMessage(function (e) {
//			
//			var data = JSON.parse(e.data);

//			if (data.event === 'participants') {
//				alert("participants: " + data.participants.length);
//			}
//		}
//		);

//		var msg = { 'event': 'getParticipants' };

//		// $.postMessage(msg, parent_url, parent);

//		$.postMessage(JSON.stringify(msg), '*', parent);

	};

} (
	window.partyMachineClientMessaging = window.partyMachineClientMessaging || {},
	jQuery
	)
);

(function (participants, $, undefined) {

	var _participants = [];

	var _previousParticipant = -1;


	var participantsUrl = 'http://partymaskinen.se/party.json';

	participants.stub = function () {
		participants.getParticipants = function () {

			var freshParticipants = [];

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

			return freshParticipants;
		};
	};


	participants.getNextParticipant = function () {
		_previousParticipant++;

		var nextParticipant = _participants[_previousParticipant];

		return nextParticipant;
	};


	participants.getParticipants = function () {
		
		$.ajax({
			url: participantsUrl,
			jsonp: true,
			dataType: 'jsonp',
			jsonpCallback: "jsonpCallback",
			success: function (data) {

				if (data.participants) {

					if (data.participants.length > 0) {

						$.each(data.participants, function (key, m) {
							_participants.push(m);
						});


						var nextParticipant = partyMachineParticipants.getNextParticipant();

						var participantHtmlTemplate = '<img src="' + nextParticipant.imageUrl + '"></img><strong>' + nextParticipant.name + '</strong>'
							+ '<h2>' + nextParticipant.description + '</h2>';

						$("#partyMachine-participant").append(participantHtmlTemplate);

					}

				}
			}
		});

		return _participants;
	};

	participants.start = function () {


	};

} (window.partyMachineParticipants = window.partyMachineParticipants || {}, jQuery));


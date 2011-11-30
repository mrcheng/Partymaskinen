(function (participants, $, undefined) {

	var _participants = [];

	var _previousParticipant = -1;

	var _participantsUrl;

	participants.stub = function () {

		_participants.length = 0;

		_participants.push({ name: 'Pub', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Randy', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Magnecyl', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Geggin', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Mejje', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Joel', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Fold', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Blaizer', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Deamo', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Wipeout', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Vico', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Shahin', imageUrl: 'img/participant_example.png' });
		_participants.push({ name: 'Jesse', imageUrl: 'img/participant_example.png' });

		participants.getParticipants = function () {
			return _participants;
		};

	};


	participants.getNextParticipant = function () {
		var nextParticipant;

		_previousParticipant++;

		if (_previousParticipant >= _participants.length - 1) {
			nextParticipant = _participants[0];
		}
		else {
			nextParticipant = _participants[_previousParticipant];
		}

		return nextParticipant;
	};


	participants.getParticipants = function () {

		$.ajax({
			url: _participantsUrl + "?callback=?",
			jsonp: true,
			dataType: 'jsonp',
			success: function (data) {

				if (data.participants) {

					if (data.participants.length > 0) {

						_participants.length = 0;

						$.each(data.participants, function (key, m) {
							_participants.push(m);
						});

						var nextParticipant = partyMachineParticipants.getNextParticipant();

						var participantHtmlTemplate = '<p class="participant-info"> + nextParticipant.description + </p><img src="' + nextParticipant.imageUrl + '"></img><p>' + nextParticipant.name + '</p>'
							+ '<p>' + nextParticipant.description + '</p>';

						$("#partyMachine-participant").append(participantHtmlTemplate);

					}

				}
			}
		});

		return _participants;
	};

	participants.start = function (feedUrl, initialParticipants) {

		_participantsUrl = feedUrl;

		_participants = initialParticipants || [];

	};

} (window.partyMachineParticipants = window.partyMachineParticipants || {}, jQuery));


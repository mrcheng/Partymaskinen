(function (participants, $, undefined) {

	var _participants = [];

	var _previousParticipant = -1;

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
		// TODO: Implement
		var freshParticipants = [];
		return freshParticipants;
	};

	participants.start = function () {


		_participants = this.getParticipants();

		var nextParticipant = this.getNextParticipant();

		var participantHtmlTemplate = '<img src="' + nextParticipant.ImageUrl + '"></img><strong>' + nextParticipant.Name + '</strong>';

		$("#partyMachine-participant").append(participantHtmlTemplate);
		

	};

} (window.partyMachineParticipants = window.partyMachineParticipants || {}, jQuery));


(function (participants, $, undefined) {

    var _participants = [];

    var _previousParticipant = -1;

    var _participantsUrl;

    participants.stub = function () {

        _participants.length = 0;
        var currentParticipant = { name: 'Pub', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} };
	    
	    _participants.push(currentParticipant);
	    _participants.push({ name: 'Randy', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Magnecyl', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Geggin', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Deadguy', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Mejje', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Joel', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Fold', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Blaizer', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Deamo', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Wipeout', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Vico', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Shahin', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
	    _participants.push({ name: 'Jesse', imageUrl: partyMachineConfig.baseUrl + 'img/participant_example.png', status: "active", gameController: {} });

        $.shuffle(_participants);
	    
        participants.getAllParticipants = function () {
            return _participants;
        };
	    
    };

    participants.getNextParticipant = function () {
        var nextParticipant;

        _previousParticipant++;

		if (_previousParticipant >= _participants.length - 1) {
			nextParticipant = _participants[0];
			_previousParticipant = 0;
		}
		else {
			nextParticipant = _participants[_previousParticipant];
		}

        return nextParticipant;
    };

    participants.updateStatus = function (participantId, newStatus) {
        for (var i = 0; i < _participants.length; i++) {
            if (_participants[i] == participantId) {
                _participants[i].status = newStatus;
            }
        }
    };
	
    participants.getActiveParticipants = function () {
        var activeParticipants = [];

        for (var i = 0; i < _participants.length; i++) {
            if (_participants[i].status === "active") {
                activeParticipants.push(_participants[i]);
            }
        }

        return activeParticipants;
    };

    participants.getAllParticipants = function () {

        $.ajax({
            url: _participantsUrl,
            jsonp: true,
            dataType: 'jsonp',
            success: function (data) {

                if (data.participants && data.participants.length > 0) {

                    $.each(data.participants, function (key, freshParticipant) {

                        $.each(_participants, function (key2, participant) {

                            if (participant.id === freshParticipant.id) {
                                freshParticipant.status = participant.status;
                                return false;
                            }
                            else {
                                freshParticipant.status = "active";
                            }

                        });

                    });

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
        });

        return _participants;
    };

    participants.start = function (feedUrl, initialParticipants) {

        _participantsUrl = feedUrl;

        _participants = initialParticipants || [];

    };

} (window.partyMachineParticipants = window.partyMachineParticipants || {}, jQuery));


// Partyplayer

// directory where SM2 .SWFs live... This is a temporary url
soundManager.url = 'http://dl.dropbox.com/u/10854052/';

soundManager.onready(function(){
	var mySound = soundManager.createSound({
		
		id: 'Partymusic',
		url: 'http://dl.dropbox.com/u/10854052/Music/01_Lfobia_%28Subsider_Remix%29-pMn_INT.mp3',
		//http://dl.dropbox.com/u/10854052/Music/02%20morgan%20geist%20-%20the%20shore.mp3
		//http://dl.dropbox.com/u/10854052/Music/Colony.mp3
		autoLoad: true,
  		autoPlay: false,
		stream: true,
		
		onid3: function() {	
			soundManager._writeDebug('sound '+this.sID+' ID3 data received');
			var prop = null;
			var data = '';
			for (prop in this.id3) {
				data += prop+': '+this.id3[prop]+',';
				$('.track-title').html(data + prop);
			}
  		},
  		
		onload: function() {
    		//
  		},
  		//volume: 50
	});
	mySound.play();
});
// Optional: ontimeout() callback for handling start-up failure
soundManager.ontimeout(function(){
	alert('wtf!?');
});
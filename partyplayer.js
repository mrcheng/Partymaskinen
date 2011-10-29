// Partyplayer

soundManager.flashVersion = 9;
soundManager.debugMode = true;
soundManager.preferFlash = true; // for visualization effects
soundManager.useHighPerformance = true; // keep flash on screen, boost performance
soundManager.wmode = 'transparent'; // transparent SWF, if possible
soundManager.useFastPolling = true; // increased JS callback frequency
soundManager.url = 'http://dl.dropbox.com/u/10854052/';//SWF URL

// custom page player configuration

var PP_CONFIG = {
  autoStart: true,      // begin playing first sound when page loads
  playNext: true,        // stop after one sound, or play through list until end
  useThrottling: false,  // try to rate-limit potentially-expensive calls (eg. dragging position around)</span>
  usePeakData: true,     // [Flash 9 only] whether or not to show peak data (left/right channel values) - nor noticable on CPU
  useWaveformData: false,// [Flash 9 only] show raw waveform data - WARNING: LIKELY VERY CPU-HEAVY
  useEQData: false,      // [Flash 9 only] show EQ (frequency spectrum) data
  useFavIcon: false,     // try to apply peakData to address bar (Firefox + Opera) - performance note: appears to make Firefox 3 do some temporary, heavy disk access/swapping/garbage collection at first(?) - may be too heavy on CPU
  useMovieStar: true     // Flash 9.0r115+ only: Support for a subset of MPEG4 formats.
}

soundManager.onready(function(){
	var pluginSelectSnd = soundManager.createSound({
		id: 'pluginSound',
		url: 'http://dl.dropbox.com/u/10854052/lobbySfx-pluginselect.mp3',
		autoLoad: true,
  		autoPlay: false,
		stream: true,
	});
	pluginSelectSnd.play();
});
// Optional: ontimeout() callback for handling start-up failure
soundManager.ontimeout(function(){
	alert('wtf!?');
});
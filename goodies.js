$(document).ready(function() {
	//Fades in the whole page on dom ready
	$('#logo, .participant, .music-info, .plugin-frame').animate({
    	opacity: 1,
		}, 500, function() {
			//Fires when fade in is done
	});

	shortcut.add("esc", showSettings);
	//Opens the settings panel using 'esc' key
	function showSettings(){
		$('#settings').toggle({
			}, 500, function() {
		});
	}
});
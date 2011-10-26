$(document).ready(function() {
	//Fade in
	$('#logo, .participant, .music-info, .plugin-frame').animate({
    	opacity: 1,
		}, 500, function() {
			//fade in done
	});
	//Settings
	document.getElementById('open-settings').addEventListener('click', showSettings);
	function showSettings(){
		$('#settings').toggle({
			}, 500, function() {
		});
	}
});
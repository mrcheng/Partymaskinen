(function(youtube, $, undefined)
{
	youtube.start = function()
	{
		var tag = document.createElement('script');
		tag.src = 'http://www.youtube.com/player_api';
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		var iframe = document.createElement('iframe');
		iframe.id = 'youtube';
		iframe.style.position = 'fixed';
		iframe.style.left = 0;
		iframe.style.top = 0;
		iframe.style.zIndex = '-100';
		iframe.style.visibility = 'hidden';
		iframe.width = '100%';
		iframe.height = '100%';
		iframe.src = 'http://www.youtube.com/embed?controls=0&amp;enablejsapi=1&amp;showinfo=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;wmode=opaque';
		document.body.appendChild(iframe);
	};

	window.onYouTubePlayerAPIReady = function()
	{
		new YT.Player('youtube',
		{
			events:
			{
				onReady: function(event)
				{
					event.target.setVolume(100);
					//event.target.loadVideoById('hNZE2zo7cpQ');
				},
				onStateChange: function(e)
				{
					console.log('onPlayerStateChange: ' + e.data);
					if (event.data == YT.PlayerState.PLAYING)
					{
					}
				},
				onError: function(e)
				{
					console.log('onError: ' + e.data);
				}
			}
		});
	}
}(window.partyMachineYoutube = window.partyMachineYoutube || {}, jQuery));

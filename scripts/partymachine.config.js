
(function (partyMachineConfig, $, undefined) {
	partyMachineConfig.partyFeedUrl = 'http://partymaskinen.se/Party/JsonP';
	
	// LIVE
	
	partyMachineConfig.baseUrl = 'http://mrcheng.github.com/Partymaskinen/';
	partyMachineConfig.pluginsBaseUrl = 'http://mrcheng.github.com/PartymaskinenPlugins/';

	// DEV
	
//	partyMachineConfig.baseUrl = 'http://localhost:10397/Partymaskinen/';
//	partyMachineConfig.pluginsBaseUrl = 'http://localhost:10358/PartymaskinenPlugins/';
	
} (
	window.partyMachineConfig = window.partyMachineConfig || {}
	)
);
